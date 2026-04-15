const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs');
const os = require('os');
const path = require("path");
const { cmd } = require("../command");
const { downloadMediaMessage } = require('@whiskeysockets/baileys');

cmd({
  'pattern': "tourl",
  'alias': ["imgtourl", "imgurl", "url", "geturl", "upload"],
  'react': '🖇',
  'desc': "Convert media to Catbox URL",
  'category': "utility",
  'use': ".tourl [reply to media]",
  'filename': __filename
}, async (client, message, match, { reply }) => {
  try {
    // Check if quoted message exists
    if (!match.quoted) {
      return reply("*🍁 Please reply to an image, video, or audio message!*");
    }

    const mimeType = match.quoted.mimetype || '';
    
    if (!mimeType) {
      return reply("*❌ Please reply to a valid media file!*");
    }

    // Get the message type
    let messageType = '';
    if (mimeType.includes('image')) messageType = 'image';
    else if (mimeType.includes('video')) messageType = 'video';
    else if (mimeType.includes('audio')) messageType = 'audio';
    else {
      return reply("*❌ Only image, video, and audio files are supported!*");
    }

    // Download using Baileys' native method (decrypts properly)
    const stream = await downloadMediaMessage(
      match.quoted,
      messageType,
      {},
      { 
        logger: console,
        reuploadRequest: client.updateMediaMessage
      }
    );

    // Convert stream to buffer
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    if (!buffer || buffer.length === 0) {
      throw "Failed to download media";
    }

    // Get correct extension from mime type
    let extension = '';
    if (mimeType.includes('jpeg') || mimeType.includes('jpg')) extension = '.jpg';
    else if (mimeType.includes('png')) extension = '.png';
    else if (mimeType.includes('webp')) extension = '.webp';
    else if (mimeType.includes('mp4')) extension = '.mp4';
    else if (mimeType.includes('mpeg')) extension = '.mp3';
    else if (mimeType.includes('ogg')) extension = '.ogg';
    else if (mimeType.includes('m4a')) extension = '.m4a';
    else if (mimeType.includes('wav')) extension = '.wav';
    else extension = '.mp4'; // fallback
    
    const tempFilePath = path.join(os.tmpdir(), `media_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, buffer);

    // Upload to Catbox using file upload (not URL method)
    const form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('fileToUpload', fs.createReadStream(tempFilePath));

    const response = await axios.post('https://catbox.moe/user/api.php', form, {
      headers: {
        ...form.getHeaders(),
        'User-Agent': 'Mozilla/5.0'
      },
      timeout: 60000
    });

    fs.unlinkSync(tempFilePath);

    const mediaUrl = response.data.trim();

    if (!mediaUrl || mediaUrl.toLowerCase().includes('error')) {
      throw "Catbox upload failed";
    }

    // Determine media type for display
    let mediaType = 'File';
    if (mimeType.includes('image')) mediaType = 'Image';
    else if (mimeType.includes('video')) mediaType = 'Video';
    else if (mimeType.includes('audio')) mediaType = 'Audio';

    await reply(
      `*${mediaType} Uploaded Successfully*\n\n` +
      `*Size:* ${formatBytes(buffer.length)}\n` +
      `*URL:* ${mediaUrl}\n\n` +
      `> © Uploaded by Tiger 💜`
    );

  } catch (error) {
    console.error("Tourl Error:", error);
    await reply(`❌ Error: ${error.message || error}`);
  }
});

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
