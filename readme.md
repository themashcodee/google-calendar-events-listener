## Guide

1. Enable Google Calendar API on GCP
2. Create Service Account, you will get a json from there.
3. Paste that json in credentials.js
4. Open your calendar and click on three dots of the calendar you want to listen to.
5. Paste the client_email of credentials in the sharing section in calendar.
6. Run the server, you should see a sync request.
7. Create, delete, or edit an event on calendar to see it here logged.
