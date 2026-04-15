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
    // Check if quoted message exists (exactly like vv command)
    if (!match.quoted) {
      return reply("*🍁 Please reply to an image, video, or audio message!*");
    }

    const mimeType = match.quoted.mimetype || '';
    
    if (!mimeType) {
      return reply("*❌ Please reply to a valid media file!*");
    }

    // Download decrypted media (SAME as vv command)
    const buffer = await match.quoted.download();
    
    if (!buffer || buffer.length === 0) {
      throw "Failed to download media";
    }

    // Get file extension from mime type
    let extension = '';
    if (mimeType.includes('image/jpeg')) extension = '.jpg';
    else if (mimeType.includes('image/png')) extension = '.png';
    else if (mimeType.includes('image/webp')) extension = '.webp';
    else if (mimeType.includes('video/mp4')) extension = '.mp4';
    else if (mimeType.includes('audio/mpeg')) extension = '.mp3';
    else if (mimeType.includes('audio/ogg')) extension = '.ogg';
    else if (mimeType.includes('audio/mp4') || mimeType.includes('audio/x-m4a')) extension = '.m4a';
    else if (mimeType.includes('image/')) extension = '.jpg';
    else if (mimeType.includes('video/')) extension = '.mp4';
    else if (mimeType.includes('audio/')) extension = '.mp3';
    else extension = '.bin';
    
    const tempFilePath = path.join(os.tmpdir(), `catbox_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, buffer);

    // Upload decrypted file to Catbox
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
      throw "Error uploading to Catbox";
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
      `> © Uploaded by Tiger-MD 💜`
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
