import 'dotenv/config';
import RecallAiSdk from '@recallai/desktop-sdk';
import axios from 'axios';

const API_URL = process.env.RECALLAI_API_URL;
const API_KEY = process.env.RECALLAI_API_KEY;

if (!API_KEY) {
  console.log("RECALLAI_API_KEY is missing! Set it in .env");
  process.exit();
}

if (!API_URL) {
  console.log("RECALLAI_API_URL is missing! Set it in .env");
  process.exit();
}

console.log(`Starting application with ${API_KEY} -- ${API_URL}`);

// In a typical application, this function would reside on your backend and be
// called via an HTTP request, so as to not store your API key client-side.

async function createDesktopSdkUpload() {
  const url = `${API_URL}/api/v1/sdk-upload/`;

  const response = await axios.post(url, {}, {
    headers: { 'Authorization': `Token ${API_KEY}` },
    timeout: 3000,
  });

  return response.data;
}

RecallAiSdk.init({
  api_url: API_URL
});

RecallAiSdk.addEventListener("meeting-detected", async (evt) => {
  const { window: { id: id } } = evt;
  const { upload_token } = await createDesktopSdkUpload();

  RecallAiSdk.startRecording({
    windowId: id,
    uploadToken: upload_token
  });
});

RecallAiSdk.addEventListener('recording-ended', async (evt) => {
  const { window: { id: id } } = evt;
  setTimeout(function () {
    RecallAiSdk.uploadRecording({
      windowId: id
    });
  }, 3000);
});

RecallAiSdk.addEventListener('upload-progress', async (evt) => {
  const { progress } = evt;
  console.log(`Uploading ${progress}%`);
});

RecallAiSdk.addEventListener("sdk-state-change", async (evt) => {
  const { sdk: { state: { code: code } } } = evt;
  console.log("Recording state is:", code);
});
