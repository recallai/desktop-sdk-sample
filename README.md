# Recall.ai Desktop SDK Sample Application

This is a small sample application that shows a very simple usage of the Desktop SDK to create recordings. The sample application simply records any Zoom meetings that occur and uploads a recording to the Recall.ai API.

## Running

1. `npm install`
2. Edit `.env` to set your `RECALLAI_API_KEY` (and optionally your `RECALLAI_API_URL`).
  * In a production application, instead of baking the API key into your application, you'd make a request to your server to create the SDK upload.
3. `npm start`
