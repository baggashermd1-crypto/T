const axios = require("axios");
const FormData = require('form-data');
const { cmd } = require("../command");

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
    // Check if quoted message exists and has media
    const quotedMsg = message.quoted ? message.quoted : message;
    const mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';
    
    if (!mimeType) {
      throw "Please reply to an image, video, audio, or other supported file";
    }

    if (!quotedMsg.url) {
      throw "Media URL not found";
    }

    // Prepare form data for Catbox using URL upload method
    const form = new FormData();
    form.append('reqtype', 'urlupload');
    form.append('url', quotedMsg.url);
    
    // Upload to Catbox
    const response = await axios.post('https://catbox.moe/user/api.php', form, {
      headers: {
        ...form.getHeaders(),
        'User-Agent': 'Mozilla/5.0'
      },
      timeout: 60000
    });

    const mediaUrl = response.data.trim();

    if (!mediaUrl || mediaUrl.toLowerCase().includes('error')) {
      throw "Error uploading to Catbox";
    }

    // Determine media type for response
    let mediaType = 'File';
    if (mimeType.includes('image')) mediaType = 'Image';
    else if (mimeType.includes('video')) mediaType = 'Video';
    else if (mimeType.includes('audio')) mediaType = 'Audio';
    else if (mimeType.includes('application/zip')) mediaType = 'ZIP Archive';
    else if (mimeType.includes('application/javascript') || mimeType.includes('text/javascript')) mediaType = 'JavaScript';

    // Get file size from quoted message if available
    const fileSize = quotedMsg.fileLength || quotedMsg.size || 0;
    const sizeText = fileSize > 0 ? `\n*Size:* ${formatBytes(parseInt(fileSize))}` : '';

    // Send response
    await reply(
      `*${mediaType} Uploaded Successfully*\n\n` +
      `${sizeText}\n` +
      `*URL:* ${mediaUrl}\n\n` +
      `> © Uploaded by JawadTechX 💜`
    );

  } catch (error) {
    console.error(error);
    await reply(`Error: ${error.message || error}`);
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
