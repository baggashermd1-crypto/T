const fs = require('fs');
const os = require('os');
const path = require("path");
const { cmd } = require("../command");
const FormData = require('form-data');
const fetch = require('node-fetch');
const axios = require("axios");

// Helper function to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Helper function to get extension from mime type
function getExtension(mimeType) {
  if (mimeType.includes('jpeg') || mimeType.includes('jpg')) return '.jpg';
  if (mimeType.includes('png')) return '.png';
  if (mimeType.includes('webp')) return '.webp';
  if (mimeType.includes('gif')) return '.gif';
  if (mimeType.includes('mp4')) return '.mp4';
  if (mimeType.includes('mp3')) return '.mp3';
  if (mimeType.includes('ogg')) return '.ogg';
  if (mimeType.includes('m4a')) return '.m4a';
  if (mimeType.includes('wav')) return '.wav';
  if (mimeType.includes('pdf')) return '.pdf';
  if (mimeType.includes('zip')) return '.zip';
  return '.bin';
}

// Helper to get quoted message
function getQuotedMessage(message) {
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
  
  return quotedMsg;
}

// Helper to download media
async function downloadMedia(message, quotedMsg) {
  if (message.quoted && message.quoted.download) {
    return await message.quoted.download();
  }
  
  if (global.conn && global.conn.downloadMediaMessage) {
    return await global.conn.downloadMediaMessage(quotedMsg);
  }
  
  // Fallback: try to download from URL
  if (quotedMsg.url) {
    const response = await axios.get(quotedMsg.url, {
      responseType: 'arraybuffer',
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    return Buffer.from(response.data);
  }
  
  throw "Cannot download media";
}

// ==================== COMMAND 1: node-fetch method ====================
cmd({
  'pattern': "tourl",
  'alias': ["imgtourl", "imgurl", "upload"],
  'react': '🖇',
  'desc': "Convert media to Catbox URL (fetch method)",
  'category': "utility",
  'use': ".tourl [reply to media]",
  'filename': __filename
}, async (client, message, args, { reply }) => {
  try {
    const quotedMsg = getQuotedMessage(message);
    if (!quotedMsg) throw "Please reply to an image, video, or audio file";
    
    const mimeType = quotedMsg.mimetype || '';
    if (!mimeType) throw "Could not detect media type";
    
    await reply("⏳ Downloading media...");
    
    const mediaBuffer = await downloadMedia(message, quotedMsg);
    if (!mediaBuffer || mediaBuffer.length === 0) throw "Downloaded media is empty";
    
    await reply(`✅ Downloaded ${formatBytes(mediaBuffer.length)}\n⏳ Uploading to Catbox...`);
    
    const extension = getExtension(mimeType);
    const tempFilePath = path.join(os.tmpdir(), `catbox_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);
    
    const form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('fileToUpload', fs.createReadStream(tempFilePath));
    
    const response = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: form,
      headers: form.getHeaders()
    });
    
    fs.unlinkSync(tempFilePath);
    
    const responseText = await response.text();
    if (!response.ok) throw `HTTP ${response.status}: ${responseText}`;
    
    const mediaUrl = responseText.trim();
    if (!mediaUrl || mediaUrl.toLowerCase().includes('error')) throw `Catbox error: ${mediaUrl}`;
    
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
    console.error(error);
    await reply(`Error: ${error.message || error}`);
  }
});

// ==================== COMMAND 2: axios method ====================
cmd({
  'pattern': "tourl2",
  'alias': ["upload2", "url2"],
  'react': '📤',
  'desc': "Convert media to Catbox URL (axios method)",
  'category': "utility",
  'filename': __filename
}, async (client, message, args, { reply }) => {
  try {
    const quotedMsg = getQuotedMessage(message);
    if (!quotedMsg) throw "Please reply to a media file";
    
    const mimeType = quotedMsg.mimetype || '';
    if (!mimeType) throw "Could not detect media type";
    
    await reply("⏳ Processing...");
    
    const mediaBuffer = await downloadMedia(message, quotedMsg);
    if (!mediaBuffer || mediaBuffer.length === 0) throw "Download failed";
    
    const extension = getExtension(mimeType);
    const tempFilePath = path.join(os.tmpdir(), `catbox_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);
    
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
    if (!mediaUrl || mediaUrl.toLowerCase().includes('error')) throw `Upload failed: ${mediaUrl}`;
    
    let mediaType = 'File';
    if (mimeType.includes('image')) mediaType = 'Image';
    else if (mimeType.includes('video')) mediaType = 'Video';
    else if (mimeType.includes('audio')) mediaType = 'Audio';
    
    await reply(
      `*${mediaType} Uploaded*\n\n` +
      `*Size:* ${formatBytes(mediaBuffer.length)}\n` +
      `*URL:* ${mediaUrl}\n\n` +
      `> © TIGER-MDX`
    );
    
  } catch (error) {
    console.error(error);
    await reply(`Error: ${error.message || error}`);
  }
});

// ==================== COMMAND 3: URL upload method (no re-upload) ====================
cmd({
  'pattern': "urlupload",
  'alias': ["uploadurl", "directurl"],
  'react': '🔗',
  'desc': "Upload media using direct URL (fastest)",
  'category': "utility",
  'filename': __filename
}, async (client, message, args, { reply }) => {
  try {
    const quotedMsg = getQuotedMessage(message);
    if (!quotedMsg || !quotedMsg.url) throw "Please reply to a media message with valid URL";
    
    await reply("⏳ Uploading via URL method...");
    
    const form = new FormData();
    form.append('reqtype', 'urlupload');
    form.append('url', quotedMsg.url);
    
    const response = await axios.post('https://catbox.moe/user/api.php', form, {
      headers: {
        ...form.getHeaders(),
        'User-Agent': 'Mozilla/5.0'
      },
      timeout: 60000
    });
    
    const mediaUrl = response.data.trim();
    if (!mediaUrl || mediaUrl.toLowerCase().includes('error')) throw `Upload failed: ${mediaUrl}`;
    
    let mediaType = 'File';
    const mimeType = quotedMsg.mimetype || '';
    if (mimeType.includes('image')) mediaType = 'Image';
    else if (mimeType.includes('video')) mediaType = 'Video';
    else if (mimeType.includes('audio')) mediaType = 'Audio';
    
    await reply(
      `*${mediaType} Uploaded*\n\n` +
      `*URL:* ${mediaUrl}\n\n` +
      `> © TIGER-MDX`
    );
    
  } catch (error) {
    console.error(error);
    await reply(`Error: ${error.message || error}`);
  }
});

// ==================== COMMAND 4: Simple buffer upload (most compatible) ====================
cmd({
  'pattern': "upload",
  'alias': ["simpleupload", "bufupload"],
  'react': '☁️',
  'desc': "Simple buffer upload to Catbox",
  'category': "utility",
  'filename': __filename
}, async (client, message, args, { reply }) => {
  try {
    const quotedMsg = getQuotedMessage(message);
    if (!quotedMsg) throw "Please reply to a media file";
    
    await reply("☁️ Uploading to Catbox...");
    
    const mediaBuffer = await downloadMedia(message, quotedMsg);
    if (!mediaBuffer || mediaBuffer.length === 0) throw "Download failed";
    
    const extension = getExtension(quotedMsg.mimetype || '');
    const tempFilePath = path.join(os.tmpdir(), `upload_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);
    
    // Simple form data
    const formData = new FormData();
    formData.append('fileToUpload', fs.createReadStream(tempFilePath));
    formData.append('reqtype', 'fileupload');
    
    const response = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders()
    });
    
    fs.unlinkSync(tempFilePath);
    
    const result = await response.text();
    const url = result.trim();
    
    if (!url.startsWith('https://files.catbox.moe/')) {
      throw `Upload failed: ${url}`;
    }
    
    await reply(
      `*✅ Upload Successful*\n\n` +
      `*📦 Size:* ${formatBytes(mediaBuffer.length)}\n` +
      `*🔗 URL:* ${url}\n\n` +
      `> © TIGER-MDX`
    );
    
  } catch (error) {
    console.error(error);
    await reply(`❌ Error: ${error.message || error}`);
  }
});
