# Google Calendar Webhook Listener

This project sets up a webhook listener for Google Calendar events. It allows you to receive real-time notifications when events are created, updated, or deleted in a specific Google Calendar.

## Prerequisites

- Node.js installed on your machine
- A Google Cloud Platform (GCP) account
- Basic familiarity with Google Calendar and GCP

## Setup Guide

### 1. Enable Google Calendar API

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Navigate to [Google Calendar API](https://console.cloud.google.com/marketplace/product/google/calendar-json.googleapis.com) in the API Library.
4. Click "Enable" to activate the API for your project.

### 2. Create a Service Account

1. In the Google Cloud Console, go to [IAM & Admin > Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts).
2. Click "Create Service Account".
3. Fill in the details and grant necessary permissions (at least "Cloud Functions Invoker" and "Pub/Sub Subscriber").
4. Create a new key for this service account in JSON format.
5. Download the JSON file - this is your credential file.

### 3. Set Up Credentials

1. Rename the downloaded JSON file to `credentials.json`.
2. Move `credentials.json` to the root directory of this project.
3. Ensure this file is listed in your `.gitignore` to keep it secure.
4. Paste the `credentials.json` to `credentials.js`

### 4. Configure Google Calendar

1. Open [Google Calendar](https://calendar.google.com/).
2. Find the calendar you want to monitor in the left sidebar.
3. Click the three dots next to the calendar name and select "Settings and sharing".
4. Scroll down to "Share with specific people".
5. Click "Add people" and paste the `client_email` from your `credentials.json` file.
6. Set the permission to "Make changes to events" and click "Send".

### 5. Install Dependencies

Run the following command in your project directory:

```bash
yarn
```

### 6. Start the Server

Run the server using:

```bash
yarn start
```

You should see a message indicating that the server is running and a sync request has been made.

### 7. Test the Webhook

Create, edit, or delete an event in the configured Google Calendar. You should see log messages in your console indicating that the webhook has received and processed the event.

## Troubleshooting

- If you're not receiving notifications, check that the service account email has the correct permissions on the calendar.
- Ensure your server is publicly accessible if you're testing with a real Google Calendar notification.
- Verify that the Google Calendar API is properly enabled and the credentials are correct.

## Security Considerations

- Keep your `credentials.json` file secure and never commit it to version control.
- Use environment variables for sensitive information in a production setting.
- Implement proper authentication for your webhook endpoint in a production environment.
