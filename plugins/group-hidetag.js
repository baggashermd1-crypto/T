const { cmd } = require('../command');
const converter = require('../lib/converter'); // For audio conversion


// ============== .h / .hidetag COMMAND (Creator Only) ==============
cmd({
  pattern: "hidetag",
  alias: ["h"],
  react: "🔇",
  desc: "Hidden tag with custom message (Creator only) - Works with reply or direct message",
  category: "owner",
  use: '.h Hello everyone OR reply to any message with .h',
  filename: __filename
},
async (conn, mek, m, {
  from, q, isGroup, isCreator,
  participants, reply
}) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");
    if (!isCreator) return reply("❌ Only the bot creator can use this command.");

    // Check if there's ANY content (quoted message OR direct text)
    if (!m.quoted && !q) {
      return reply("❌ Please provide a message or reply to media.");
    }

    // Send loading reaction
    await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
    
    // Get all group members for mention
    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants;
    const mentionedJid = participants.map(p => p.id);
    
    let messageContent = {};

    // CASE 1: There's a quoted message (media or text)
    if (m.quoted) {
      const quotedMsg = m.quoted;
      const mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';
      const caption = quotedMsg.text || q || "";
      
      // If it's a text message (no mimeType)
      if (!mimeType) {
        messageContent = {
          text: caption || "📢 Hidden tag",
          mentions: mentionedJid
        };
      }
      // Handle IMAGE
      else if (mimeType.startsWith('image/')) {
        const buffer = await quotedMsg.download();
        if (!buffer) throw new Error("Failed to download image");
        
        messageContent = {
          image: buffer,
          caption: caption || "",
          mimetype: mimeType,
          mentions: mentionedJid
        };
      }
      // Handle VIDEO
      else if (mimeType.startsWith('video/')) {
        const buffer = await quotedMsg.download();
        if (!buffer) throw new Error("Failed to download video");
        
        const isGif = quotedMsg.message?.videoMessage?.gifPlayback || false;
        
        messageContent = {
          video: buffer,
          caption: caption || "",
          gifPlayback: isGif,
          mimetype: mimeType,
          mentions: mentionedJid
        };
      }
      // Handle ALL AUDIO FORMATS - Convert to voice note (PTT=true)
      else if (mimeType.startsWith('audio/') || 
               mimeType.includes('audio') || 
               mimeType.includes('m4a') || 
               mimeType.includes('mp3') || 
               mimeType.includes('ogg') || 
               mimeType.includes('opus') || 
               mimeType.includes('wav') || 
               mimeType.includes('aac') || 
               mimeType.includes('flac') ||
               mimeType.includes('mpeg') ||
               mimeType.includes('webm')) {
        
        const buffer = await quotedMsg.download();
        if (!buffer) throw new Error("Failed to download audio");
        
        // ALWAYS convert to voice note format (PTT=true) regardless of original type
        // Using the same converter as mention reply command
        const voiceNote = await converter.toPTT(buffer, 'mp3');
        
        messageContent = {
          audio: voiceNote,
          mimetype: 'audio/ogg; codecs=opus', // Standard voice note mime type
          ptt: true, // Always true for voice notes
          mentions: mentionedJid
        };
      }
      // Handle STICKER
      else if (mimeType.includes('sticker') || mimeType.includes('webp')) {
        const buffer = await quotedMsg.download();
        if (!buffer) throw new Error("Failed to download sticker");
        
        messageContent = {
          sticker: buffer,
          mentions: mentionedJid
        };
      }
      // Handle DOCUMENT
      else if (mimeType.includes('document') || mimeType.includes('pdf') || mimeType.includes('application/')) {
        const buffer = await quotedMsg.download();
        if (!buffer) throw new Error("Failed to download document");
        
        const fileName = quotedMsg.message?.documentMessage?.fileName || "document";
        const docMime = quotedMsg.message?.documentMessage?.mimetype || mimeType || "application/octet-stream";
        
        messageContent = {
          document: buffer,
          mimetype: docMime,
          fileName: fileName,
          caption: caption || "",
          mentions: mentionedJid
        };
      }
      // Handle CONTACT
      else if (mimeType.includes('contact')) {
        const contact = quotedMsg.message?.contactMessage;
        messageContent = {
          contacts: {
            displayName: contact?.displayName || "Contact",
            contacts: [{
              vcard: contact?.vcard || "BEGIN:VCARD\nVERSION:3.0\nFN:Contact\nEND:VCARD"
            }]
          },
          mentions: mentionedJid
        };
      }
      // Handle LOCATION
      else if (mimeType.includes('location')) {
        const location = quotedMsg.message?.locationMessage;
        messageContent = {
          location: {
            degreesLatitude: location?.degreesLatitude || 0,
            degreesLongitude: location?.degreesLongitude || 0
          },
          mentions: mentionedJid
        };
      }
      // Fallback to text for any other type
      else {
        messageContent = {
          text: caption || "📢 Hidden tag",
          mentions: mentionedJid
        };
      }
    }
    // CASE 2: No quoted message, just direct text
    else if (q) {
      messageContent = {
        text: q,
        mentions: mentionedJid
      };
    }

    // Send as NEW MESSAGE (no quoted)
    await conn.sendMessage(from, messageContent);
    
    // Success reaction
    await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

  } catch (e) {
    console.error("Hidden Tag Error:", e);
    reply(`❌ Error: ${e.message}`);
    await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
  }
});

// ============== .tag COMMAND (Admins + Creator) ==============
cmd({
  pattern: "tag",
  alias: ["taggc"],
  react: "🔊",
  desc: "Tag all members (Admins & Creator) - Works with reply or direct message",
  category: "group",
  use: '.tag Hello everyone OR reply to any message with .tag',
  filename: __filename
},
async (conn, mek, m, {
  from, q, isGroup, isCreator, isAdmins,
  participants, reply
}) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");
    if (!isAdmins && !isCreator) return reply("❌ Only group admins can use this command.");

    // Check if there's ANY content (quoted message OR direct text)
    if (!m.quoted && !q) {
      return reply("❌ Please provide a message or reply to media to tag all members.");
    }

    // Send loading reaction
    await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
    
    // Get all group members for mention
    const groupMetadata = await conn.groupMetadata(from);
    const participants = groupMetadata.participants;
    const mentionedJid = participants.map(p => p.id);
    
    let messageContent = {};

    // CASE 1: There's a quoted message (media or text)
    if (m.quoted) {
      const quotedMsg = m.quoted;
      const mimeType = (quotedMsg.msg || quotedMsg).mimetype || '';
      const caption = quotedMsg.text || q || "";
      
      // If it's a text message (no mimeType)
      if (!mimeType) {
        messageContent = {
          text: caption || "📢 Tag all members",
          mentions: mentionedJid
        };
      }
      // Handle IMAGE
      else if (mimeType.startsWith('image/')) {
        const buffer = await quotedMsg.download();
        if (!buffer) throw new Error("Failed to download image");
        
        messageContent = {
          image: buffer,
          caption: caption || "",
          mimetype: mimeType,
          mentions: mentionedJid
        };
      }
      // Handle VIDEO
      else if (mimeType.startsWith('video/')) {
        const buffer = await quotedMsg.download();
        if (!buffer) throw new Error("Failed to download video");
        
        const isGif = quotedMsg.message?.videoMessage?.gifPlayback || false;
        
        messageContent = {
          video: buffer,
          caption: caption || "",
          gifPlayback: isGif,
          mimetype: mimeType,
          mentions: mentionedJid
        };
      }
      // Handle ALL AUDIO FORMATS - Convert to voice note (PTT=true)
      else if (mimeType.startsWith('audio/') || 
               mimeType.includes('audio') || 
               mimeType.includes('m4a') || 
               mimeType.includes('mp3') || 
               mimeType.includes('ogg') || 
               mimeType.includes('opus') || 
               mimeType.includes('wav') || 
               mimeType.includes('aac') || 
               mimeType.includes('flac')) {
        
        const buffer = await quotedMsg.download();
        if (!buffer) throw new Error("Failed to download audio");
        
        // ALWAYS convert to voice note format (PTT=true) regardless of original type
        // Using the same converter as mention reply command
        const voiceNote = await converter.toPTT(buffer, 'mp3');
        
        messageContent = {
          audio: voiceNote,
          mimetype: 'audio/ogg; codecs=opus', // Standard voice note mime type
          ptt: true, // Always true for voice notes
          mentions: mentionedJid
        };
      }
      // Handle STICKER
      else if (mimeType.includes('sticker') || mimeType.includes('webp')) {
        const buffer = await quotedMsg.download();
        if (!buffer) throw new Error("Failed to download sticker");
        
        messageContent = {
          sticker: buffer,
          mentions: mentionedJid
        };
      }
      // Handle DOCUMENT
      else if (mimeType.includes('document') || mimeType.includes('pdf') || mimeType.includes('application/')) {
        const buffer = await quotedMsg.download();
        if (!buffer) throw new Error("Failed to download document");
        
        const fileName = quotedMsg.message?.documentMessage?.fileName || "document";
        const docMime = quotedMsg.message?.documentMessage?.mimetype || mimeType || "application/octet-stream";
        
        messageContent = {
          document: buffer,
          mimetype: docMime,
          fileName: fileName,
          caption: caption || "",
          mentions: mentionedJid
        };
      }
      // Handle CONTACT
      else if (mimeType.includes('contact')) {
        const contact = quotedMsg.message?.contactMessage;
        messageContent = {
          contacts: {
            displayName: contact?.displayName || "Contact",
            contacts: [{
              vcard: contact?.vcard || "BEGIN:VCARD\nVERSION:3.0\nFN:Contact\nEND:VCARD"
            }]
          },
          mentions: mentionedJid
        };
      }
      // Handle LOCATION
      else if (mimeType.includes('location')) {
        const location = quotedMsg.message?.locationMessage;
        messageContent = {
          location: {
            degreesLatitude: location?.degreesLatitude || 0,
            degreesLongitude: location?.degreesLongitude || 0
          },
          mentions: mentionedJid
        };
      }
      // Fallback to text for any other type
      else {
        messageContent = {
          text: caption || "📢 Tag all members",
          mentions: mentionedJid
        };
      }
    }
    // CASE 2: No quoted message, just direct text
    else if (q) {
      messageContent = {
        text: q,
        mentions: mentionedJid
      };
    }

    // Send as REPLY to command message
    await conn.sendMessage(from, messageContent, { quoted: mek });
    
    // Success reaction
    await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

  } catch (e) {
    console.error("Tag Error:", e);
    reply(`❌ Error: ${e.message}`);
    await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
  }
});
