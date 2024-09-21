const express = require("express")
const { credentials } = require("./credentials_real")
const { google } = require("googleapis")
const fs = require("fs")

// Set up Google Auth using the service account
const auth = new google.auth.GoogleAuth({
	credentials: credentials,
	scopes: ["https://www.googleapis.com/auth/calendar"],
})

// Create the Google Calendar instance
const calendar = google.calendar({ version: "v3", auth })

const calendar_id = "codeemash@gmail.com"
const ngrok_tunnel_url = "run npm run ngrok to ge the tunnel url"

// IT SHOULD COME FROM THE REDIS OR DB OR SOMEWHERE ELSE IN PRODUCTION, BUT JUST PUTTING HERE ONLY FOR TESTING
let nextSyncToken = null

async function main() {
	const app = express()
	const port = 8000
	app.use(express.json())
	app.use(express.urlencoded({ extended: false }))

	const watch_res = await calendar.events.watch({
		calendarId: calendar_id,
		requestBody: {
			// GENERATING IT NEW EVERYTIME FOR LOCAL RESTART PURPOSES, BECAUSE THIS HAS TO BE UNIQUE.
			id: new Date().getTime().toString(),
			type: "web_hook",
			address: `${ngrok_tunnel_url}/calendar/events`,
		},
	})
	console.log("Watch Response:", watch_res.data)

	app.use(express.json())

	app.get("/", (req, res) => {
		res.send("Hello World!")
	})

	app.post("/calendar/events", async (req, res) => {
		// NOTE: THIS IMPLEMENTATION IS ONLY FOR ONE CALENDAR. IF YOU ARE WATCHING MULTIPLE CALENDARS THEN YOU SHOULD MATCH THE RESOURCE ID(req.headers["x-google-resource-id"]) OR CHANNEL IF (req.headers["x-goog-channel-id"])

		if (req.headers["x-goog-resource-state"] === "sync") {
			console.log("sync")
			return res.status(200).send() // Send 200 OK to confirm the webhook
		}

		try {
			const event = await calendar.events.list({
				calendarId: calendar_id,
				singleEvents: false,
				...(nextSyncToken ? { syncToken: nextSyncToken } : {}),
			})
			if (event.data.nextSyncToken) nextSyncToken = event.data.nextSyncToken

			fs.writeFileSync("events.json", JSON.stringify(event.data.items, null, 2))
		} catch (error) {
			console.log(error)
		}

		res.status(200).send()
	})

	app.listen(port, () => {
		console.log(`Server running at http://localhost:${port}`)
	})
}

main()
