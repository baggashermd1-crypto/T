// KHAN MD

const { cmd } = require('../command');

cmd({
    pattern: "groupstatus",
    alias: ["statusgc", "gcstatus", "swgc"],
    desc: "Post group status with media or text (mentions all members)",
    category: "group",
    react: "📢",
    filename: __filename
}, async (conn, mek, m, { from, text, reply, isCreator, isGroup }) => {
    // Check if user is owner
    if (!isCreator) return reply("❌ This command is only for owners!");
    
    // Check if in group
    if (!isGroup) return reply("❌ This command can only be used in groups!");
    
    try {
        // Get the quoted message
        const quotedMsg = m.quoted;
        
        // Get mime type properly
        const mimeType = quotedMsg ? (quotedMsg.msg || quotedMsg).mimetype || '' : '';
        
        // Get caption/text
        const caption = text?.trim() || "";
        
        // Check if there's content to send
        if (!quotedMsg && !caption) {
            return reply(
                `⚠️ Reply to media or provide text!\n\n` +
                `Examples:\n` +
                `• .gcstatus Hello everyone\n` +
                `• Reply to an image with: .gcstatus`
            );
        }
        
        // Send loading reaction
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });
        
        // Get all group members for mention
        const groupMetadata = await conn.groupMetadata(from);
        const participants = groupMetadata.participants;
        const mentionedJid = participants.map(p => p.id);
        
        let messageContent = {};
        
        // If there's quoted media
        if (quotedMsg) {
            // Download media
            const mediaBuffer = await quotedMsg.download();
            if (!mediaBuffer) throw new Error("Failed to download media");
            
            // Add status context with mentions
            const contextInfo = {
                isGroupStatus: true,
                mentionedJid: mentionedJid
            };
            
            // Handle different media types based on mimeType
            if (mimeType.startsWith('image/')) {
                // Image message
                messageContent = {
                    image: mediaBuffer,
                    caption: caption || "",
                    mimetype: mimeType,
                    contextInfo: contextInfo
                };
            } 
            else if (mimeType.startsWith('video/')) {
                // Video message
                messageContent = {
                    video: mediaBuffer,
                    caption: caption || "",
                    mimetype: mimeType,
                    contextInfo: contextInfo
                };
            } 
            else if (mimeType.startsWith('audio/')) {
                // Check if it's a voice note
                const isPTT = quotedMsg.message?.audioMessage?.ptt || false;
                
                messageContent = {
                    audio: mediaBuffer,
                    mimetype: isPTT ? 'audio/ogg; codecs=opus' : 'audio/mp4',
                    ptt: isPTT,
                    contextInfo: contextInfo
                };
            }
            else {
                // Try to detect by message type as fallback
                const msgType = Object.keys(quotedMsg.message || {})[0];
                
                if (msgType === 'imageMessage') {
                    messageContent = {
                        image: mediaBuffer,
                        caption: caption || "",
                        mimetype: 'image/jpeg',
                        contextInfo: contextInfo
                    };
                }
                else if (msgType === 'videoMessage') {
                    messageContent = {
                        video: mediaBuffer,
                        caption: caption || "",
                        mimetype: 'video/mp4',
                        contextInfo: contextInfo
                    };
                }
                else if (msgType === 'audioMessage' || msgType === 'pttMessage') {
                    messageContent = {
                        audio: mediaBuffer,
                        mimetype: msgType === 'pttMessage' ? 'audio/ogg; codecs=opus' : 'audio/mp4',
                        ptt: msgType === 'pttMessage',
                        contextInfo: contextInfo
                    };
                }
                else {
                    return reply("❌ Unsupported media type! Please reply to an image, video, or audio file.");
                }
            }
        } 
        // If only text
        else if (caption) {
            messageContent = {
                text: caption,
                contextInfo: {
                    isGroupStatus: true,
                    mentionedJid: mentionedJid
                }
            };
        }
        
        // Send the status with mentions
        await conn.sendMessage(from, messageContent, { quoted: mek });
        
        // Success reaction only - no mention count message
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
        
    } catch (error) {
        console.error("Group Status Error:", error);
        reply(`❌ Error: ${error.message}`);
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
    }
});
