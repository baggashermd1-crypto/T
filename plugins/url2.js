const { exec } = require('child_process');
const { promisify } = require('util');
const execPromise = promisify(exec);
const fs = require('fs');
const os = require('os');
const path = require("path");
const { cmd } = require("../command");

cmd({
  'pattern': "url2",
  'alias': ["curlupload"],
  'react': '🌀',
  'desc': "Upload using actual curl command",
  'category': "utility",
  'filename': __filename
}, async (client, message, args, { reply }) => {
  try {
    let quotedMsg = message.quoted;
    
    if (!quotedMsg && message.msg?.contextInfo?.quotedMessage) {
      const quoted = message.msg.contextInfo.quotedMessage;
      const mediaTypes = ['imageMessage', 'videoMessage', 'audioMessage'];
      for (const type of mediaTypes) {
        if (quoted[type]) {
          quotedMsg = quoted[type];
          break;
        }
      }
    }
    
    if (!quotedMsg) {
      throw "Please reply to a media message";
    }

    reply("⏳ Downloading and uploading...");

    // Download media
    let mediaBuffer;
    if (message.quoted && message.quoted.download) {
      mediaBuffer = await message.quoted.download();
    } else {
      throw "Cannot download media";
    }

    const tempFilePath = path.join(os.tmpdir(), `upload_${Date.now()}.bin`);
    fs.writeFileSync(tempFilePath, mediaBuffer);

    // Use actual curl command
    const curlCmd = `curl -F "reqtype=fileupload" -F "fileToUpload=@${tempFilePath}" https://catbox.moe/user/api.php`;
    
    const { stdout, stderr } = await execPromise(curlCmd);
    
    fs.unlinkSync(tempFilePath);

    if (stderr && !stderr.includes('100%')) {
      throw stderr;
    }

    const mediaUrl = stdout.trim();
    
    if (!mediaUrl || mediaUrl.toLowerCase().includes('error')) {
      throw `Catbox error: ${mediaUrl}`;
    }

    await reply(
      `*Uploaded Successfully*\n\n` +
      `*Size:* ${formatBytes(mediaBuffer.length)}\n` +
      `*URL:* ${mediaUrl}\n\n` +
      `> © Uploaded by TIGER-MDX 💜`
    );

  } catch (error) {
    console.error('Upload error:', error);
    await reply(`Error: ${error.message || error}`);
  }
});

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
