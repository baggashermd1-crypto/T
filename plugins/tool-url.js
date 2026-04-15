const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs');
const os = require('os');
const path = require("path");
const { cmd, commands } = require("../command");
const { fromBuffer } = require("file-type");

cmd({
  'pattern': "tourl",
  'alias': ["imgtourl", "imgurl", "url", "geturl", "upload"],
  'react': '🖇',
  'desc': "Convert media to Catbox URL",
  'category': "utility",
  'use': ".tourl [reply to media]",
  'filename': __filename
}, async (client, message, args, { reply }) => {
  try {
    // FIX: Properly check for quoted message in your structure
    let quotedMsg = message.quoted;
    
    // If message.quoted doesn't exist, try to get it from contextInfo
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

    // Get mime type
    const mimeType = quotedMsg.mimetype || '';
    
    if (!mimeType) {
      throw "Could not detect media type. Please reply to a valid media file.";
    }

    // FIX: Properly download the media using client.downloadMediaMessage
    let mediaBuffer;
    
    try {
      // Try using the client's download method if available
      if (client.downloadMediaMessage) {
        mediaBuffer = await client.downloadMediaMessage(quotedMsg);
      } 
      // Try using message.quoted.download if available
      else if (message.quoted && message.quoted.download) {
        mediaBuffer = await message.quoted.download();
      }
      // Fallback: try to download using the URL directly (won't work for encrypted WhatsApp media)
      else if (quotedMsg.url) {
        const response = await axios.get(quotedMsg.url, { 
          responseType: 'arraybuffer',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        mediaBuffer = Buffer.from(response.data);
      }
      else {
        throw "Cannot download media. The message might be encrypted.";
      }
    } catch (downloadError) {
      console.error("Download error:", downloadError);
      throw "Failed to download the media. Please try again with a different file.";
    }

    if (!mediaBuffer || mediaBuffer.length === 0) {
      throw "Downloaded media is empty. Please try again.";
    }

    console.log(`Downloaded ${mediaBuffer.length} bytes, MIME: ${mimeType}`);

    // Get file extension from buffer or mime type
    let extension = '';
    const fileTypeResult = await fromBuffer(mediaBuffer);
    
    if (fileTypeResult) {
      extension = '.' + fileTypeResult.ext;
    } else {
      // Fallback to mime type mapping
      if (mimeType.includes('image/jpeg')) extension = '.jpg';
      else if (mimeType.includes('image/png')) extension = '.png';
      else if (mimeType.includes('image/webp')) extension = '.webp';
      else if (mimeType.includes('video/mp4')) extension = '.mp4';
      else if (mimeType.includes('audio/mpeg')) extension = '.mp3';
      else if (mimeType.includes('audio/ogg')) extension = '.ogg';
      else if (mimeType.includes('audio/mp4')) extension = '.m4a';
      else extension = '.bin';
    }
    
    const tempFilePath = path.join(os.tmpdir(), `catbox_upload_${Date.now()}${extension}`);
    fs.writeFileSync(tempFilePath, mediaBuffer);
    
    // Verify file was written
    const stats = fs.statSync(tempFilePath);
    if (stats.size === 0) {
      fs.unlinkSync(tempFilePath);
      throw "File is empty after saving";
    }
    
    console.log(`Saved temp file: ${tempFilePath} (${stats.size} bytes)`);

    // Prepare form data for Catbox
    const form = new FormData();
    form.append('reqtype', 'fileupload');
    form.append('fileToUpload', fs.createReadStream(tempFilePath), `upload${extension}`);
    
    // Add userhash if you have one (optional)
    // form.append('userhash', 'YOUR_USERHASH_HERE');

    // Upload to Catbox with proper headers
    const response = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: {
        ...form.getHeaders(),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 60000,
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    // Clean up temp file
    fs.unlinkSync(tempFilePath);

    // Check response
    let mediaUrl = response.data;
    
    if (!mediaUrl || mediaUrl.includes('error') || mediaUrl.includes('Error')) {
      throw `Catbox error: ${mediaUrl || 'Unknown error'}`;
    }
    
    // Clean the URL (remove any whitespace or newlines)
    mediaUrl = mediaUrl.trim();
    
    if (!mediaUrl.startsWith('http')) {
      throw `Invalid response from Catbox: ${mediaUrl}`;
    }

    // Determine media type for response
    let mediaType = 'File';
    if (mimeType.includes('image')) mediaType = 'Image';
    else if (mimeType.includes('video')) mediaType = 'Video';
    else if (mimeType.includes('audio')) mediaType = 'Audio';
    else if (mimeType.includes('application/zip')) mediaType = 'ZIP Archive';
    
    // Send response
    await reply(
      `*${mediaType} Uploaded Successfully*\n\n` +
      `*Size:* ${formatBytes(mediaBuffer.length)}\n` +
      `*MIME:* ${mimeType}\n` +
      `*URL:* ${mediaUrl}\n\n` +
      `> © Uploaded by TIGER-MDX 💜`
    );

  } catch (error) {
    console.error('Upload error:', error);
    
    // Better error message based on status code
    let errorMsg = error.message || error;
    if (error.response) {
      if (error.response.status === 412) {
        errorMsg = "Catbox rejected the file. The file might be corrupted or in an unsupported format. Try a different file.";
      } else {
        errorMsg = `HTTP ${error.response.status}: ${error.response.data || error.message}`;
      }
    }
    
    await reply(`Error: ${errorMsg}`);
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

