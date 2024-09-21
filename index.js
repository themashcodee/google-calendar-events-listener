const express = require("express")
const { credentials } = require("./credentials_real")

// Set up Google Auth using the service account
const auth = new google.auth.GoogleAuth({
	credentials: data_json,
	scopes: ["https://www.googleapis.com/auth/calendar"],
})

// Create the Google Calendar instance
const calendar = google.calendar({ version: "v3", auth })

async function main() {
	const app = express()
	const port = 3000
	app.use(express.json())
	app.use(cookieParser())
	app.use(express.urlencoded({ extended: false }))

	const watch_res = await calendar.events.watch({
		calendarId: "codeemash@gmail.com",
		requestBody: {
			id: "4d9ac5f708b5cbb6d9447a9de3931be270ceaa4086f61ce1415b4234512235122",
			type: "web_hook",
			address:
				"https://dbdf-2401-4900-1c74-1fc9-5855-9f54-5548-b450.ngrok-free.app/google",
		},
	})
	console.log("Watch Response:", watch_res.data)

	app.use(express.json())

	app.get("/", (req, res) => {
		res.send("Hello World!")
	})

	app.post("/google", async (req, res) => {
		if (req.headers["x-goog-resource-state"] === "sync") {
			console.log("sync")

			res.status(200).send() // Send 200 OK to confirm the webhook
		} else {
			const resourceId = req.headers["x-goog-resource-id"]
			console.log({ resourceId })

			try {
				const event = await calendar.events.list({
					calendarId: "codeemash@gmail.com", // or the calendar you are watching
				})
				console.log(event.data.items)
			} catch (error) {
				console.log(error)
			}
			// try {
			// 	const event = await calendar.events.get({
			// 		calendarId: "codeemash@gmail.com", // or the calendar you are watching

			// 		// eventId: resourceId as string, // fetched from headers
			// 	});
			// 	console.log(event);
			// } catch (error) {
			// 	console.log(error);
			// }

			res.status(200).send()
		}
	})

	app.listen(port, () => {
		console.log(`Server running at http://localhost:${port}`)
	})
}
