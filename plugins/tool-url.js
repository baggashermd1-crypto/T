const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs');
const os = require('os');
const path = require("path");
const { cmd } = require("../command");

cmd({
  'pattern': "tourl",
  'alias': ["imgtourl", "imgurl", "url", "geturl", "upload"],
  'react': '🖇',
  'desc': "Convert media to Catbox URL",
  'category': "utility",
  'use': ".tourl [reply to media]",
  'filename': __filename
}, async (client, message, match, { from, reply }) => {
  try {
    // Check if quoted message exists
    if (!match.quoted) {
      return reply("*🍁 Please reply to an image, video, or audio message!*");
    }

    const mimeType = match.quoted.mimetype || '';
    
    if (!mimeType) {
      return reply("*❌ Please reply to a valid media file!*");
    }

    // Step 1: Download decrypted media (same as vv command)
    const buffer = await match.quoted.download();
    
    if (!buffer || buffer.length === 0) {
      throw "Failed to download media";
    }

    // Get file extension from mime type
    let extension = '';
    if (mimeType.includes('jpeg') || mimeType.includes('jpg')) extension = '.jpg';
    else if (mimeType.includes('png')) extension = '.png';
    else if (mimeType.includes('webp')) extension = '.webp';
    else if (mimeType.includes('mp4')) extension = '.mp4';
    else if (mimeType.includes('mp3')) extension = '.mp3';
    else if (mimeType.includes('ogg')) extension = '.ogg';
    else if (mimeType.includes('m4a')) extension = '.m4a';
    else extension = '.bin';
    
    const tempFilePath = path.join(os.tmpdir(), `uguu_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, buffer);

    // Step 2: Upload to uguu.se first (max 128MB, expires after 3 hours)
    const uguuForm = new FormData();
    uguuForm.append('files[]', fs.createReadStream(tempFilePath));

    const uguuResponse = await axios.post('https://uguu.se/upload.php', uguuForm, {
      headers: {
        ...uguuForm.getHeaders(),
        'User-Agent': 'Mozilla/5.0'
      },
      timeout: 60000
    });

    if (!uguuResponse.data || !uguuResponse.data[0] || !uguuResponse.data[0].url) {
      throw "Failed to upload to uguu.se";
    }

    const uguuUrl = uguuResponse.data[0].url;
    
    // Step 3: Upload the uguu URL to Catbox using URL method (works perfectly)
    const catboxForm = new FormData();
    catboxForm.append('reqtype', 'urlupload');
    catboxForm.append('url', uguuUrl);

    const catboxResponse = await axios.post('https://catbox.moe/user/api.php', catboxForm, {
      headers: {
        ...catboxForm.getHeaders(),
        'User-Agent': 'Mozilla/5.0'
      },
      timeout: 60000
    });

    // Clean up temp file
    fs.unlinkSync(tempFilePath);

    const mediaUrl = catboxResponse.data.trim();

    if (!mediaUrl || mediaUrl.toLowerCase().includes('error')) {
      throw `Catbox error: ${mediaUrl}`;
    }

    // Determine media type
    let mediaType = 'File';
    if (mimeType.includes('image')) mediaType = 'Image';
    else if (mimeType.includes('video')) mediaType = 'Video';
    else if (mimeType.includes('audio')) mediaType = 'Audio';

    // Send response
    await reply(
      `*${mediaType} Uploaded Successfully*\n\n` +
      `*Size:* ${formatBytes(buffer.length)}\n` +
      `*URL:* ${mediaUrl}\n\n` +
      `> © Uploaded by TIGER-MD 💜`
    );

  } catch (error) {
    console.error("Tourl Error:", error);
    await reply(`❌ Error: ${error.message || error}`);
  }
});

// Helper function to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
