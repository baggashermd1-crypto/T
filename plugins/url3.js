const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs');
const os = require('os');
const path = require("path");
const { cmd } = require("../command");
const { fromBuffer } = require("file-type");

cmd({
  'pattern': "url3",
  'alias': ["imgtourl", "imgurl", "url", "geturl", "upload"],
  'react': '🖇',
  'desc': "Convert media to Catbox URL",
  'category': "utility",
  'use': ".tourl [reply to media]",
  'filename': __filename
}, async (client, message, args, { reply }) => {
  try {
    // Get quoted message
    let quotedMsg = message.quoted;
    
    if (!quotedMsg && message.msg?.contextInfo?.quotedMessage) {
      const quoted = message.msg.contextInfo.quotedMessage;
      const mediaTypes = ['imageMessage', 'videoMessage', 'audioMessage', 'documentMessage', 'stickerMessage'];
      for (const type of mediaTypes) {
        if (quoted[type]) {
          quotedMsg = quoted[type];
          quotedMsg.mtype = type;
          break;
        }
      }
    }
    
    if (!quotedMsg) {
      throw "Please reply to an image, video, audio, or other supported file";
    }

    const mimeType = quotedMsg.mimetype || '';
    
    if (!mimeType) {
      throw "Could not detect media type";
    }

    // Download media
    let mediaBuffer;
    
    if (client.downloadMediaMessage) {
      mediaBuffer = await client.downloadMediaMessage(quotedMsg);
    } else if (message.quoted && message.quoted.download) {
      mediaBuffer = await message.quoted.download();
    } else {
      throw "Cannot download media";
    }

    if (!mediaBuffer || mediaBuffer.length === 0) {
      throw "Downloaded media is empty";
    }

    // Get file extension
    let extension = '';
    const fileTypeResult = await fromBuffer(mediaBuffer);
    
    if (fileTypeResult) {
      extension = '.' + fileTypeResult.ext;
    } else {
      if (mimeType.includes('jpeg') || mimeType.includes('jpg')) extension = '.jpg';
      else if (mimeType.includes('png')) extension = '.png';
      else if (mimeType.includes('webp')) extension = '.webp';
      else if (mimeType.includes('mp4')) extension = '.mp4';
      else if (mimeType.includes('mp3')) extension = '.mp3';
      else if (mimeType.includes('ogg')) extension = '.ogg';
      else extension = '.bin';
    }
    
    const tempFilePath = path.join(os.tmpdir(), `upload_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    // ========== USING EXACT CURL METHOD ==========
    // This matches Catbox documentation exactly:
    // curl -F "reqtype=fileupload" -F "fileToUpload=@cutie.png" https://catbox.moe/user/api.php
    
    const form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('fileToUpload', fs.createReadStream(tempFilePath));
    
    // Send request exactly like curl would
    const response = await axios.post('https://catbox.moe/user/api.php', form, {
      headers: {
        ...form.getHeaders(),
        'User-Agent': 'curl/7.68.0'  // Mimicking curl
      },
      timeout: 60000
    });

    fs.unlinkSync(tempFilePath);

    let mediaUrl = response.data;
    
    if (!mediaUrl || mediaUrl.toLowerCase().includes('error')) {
      throw `Catbox error: ${mediaUrl || 'Unknown error'}`;
    }
    
    mediaUrl = mediaUrl.trim();

    let mediaType = 'File';
    if (mimeType.includes('image')) mediaType = 'Image';
    else if (mimeType.includes('video')) mediaType = 'Video';
    else if (mimeType.includes('audio')) mediaType = 'Audio';

    await reply(
      `*${mediaType} Uploaded Successfully*\n\n` +
      `*Size:* ${formatBytes(mediaBuffer.length)}\n` +
      `*URL:* ${mediaUrl}\n\n` +
      `> © Uploaded by TIGER-MDX 💜`
    );

  } catch (error) {
    console.error('Upload error:', error);
    
    if (error.response) {
      await reply(`Error (${error.response.status}): ${error.response.data || error.message}`);
    } else {
      await reply(`Error: ${error.message || error}`);
    }
  }
});

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
