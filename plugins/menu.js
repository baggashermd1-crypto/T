// BAGGA-SHER-MD ON TOP

const config = require('../config')
const { cmd, commands } = require('../command');
const path = require('path');
const os = require("os")
const fs = require('fs');
const {runtime} = require('../lib/functions')
const axios = require('axios')

// Helper function for small caps text
const toSmallCaps = (text) => {
    if (!text || typeof text !== 'string') return '';
    const smallCapsMap = {
        'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ',
        'j': 'ᴊ', 'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ǫ', 'r': 'ʀ',
        's': 's', 't': 'ᴛ', 'u': 'ᴜ', 'v': 'ᴠ', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ',
        'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ', 'E': 'ᴇ', 'F': 'ғ', 'G': 'ɢ', 'H': 'ʜ', 'I': 'ɪ',
        'J': 'ᴊ', 'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ', 'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'ǫ', 'R': 'ʀ',
        'S': 's', 'T': 'ᴛ', 'U': 'ᴜ', 'V': 'ᴠ', 'W': 'ᴡ', 'X': 'x', 'Y': 'ʏ', 'Z': 'ᴢ'
    };
    return text.split('').map(char => smallCapsMap[char] || char).join('');
};

// Format category with your exact styles
const formatCategory = (category, cmds) => {
    // Filter out commands with empty or undefined patterns
    const validCmds = cmds.filter(cmd => cmd.pattern && cmd.pattern.trim() !== '');
    
    if (validCmds.length === 0) return ''; // Skip empty categories
    
    let title = `\n\`『 ${category.toUpperCase()} 』\`\n╭───────────────────⊷\n`;
    let body = validCmds.map(cmd => {
        const commandName = cmd.pattern || '';
        return `*┋ ⬡ ${toSmallCaps(commandName)}*`;
    }).join('\n');
    let footer = `\n╰───────────────────⊷`;
    return `${title}${body}${footer}`;
};

// Function to validate media URL and determine type
const getMediaType = (url) => {
    if (!url || typeof url !== 'string' || url.trim() === '') {
        return null;
    }
    
    const urlLower = url.toLowerCase();
    
    // Check image extensions
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    if (imageExtensions.some(ext => urlLower.endsWith(ext))) {
        return 'image';
    }
    
    // Check video extensions
    const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.gif'];
    if (videoExtensions.some(ext => urlLower.endsWith(ext))) {
        return 'video';
    }
    
    return null;
};

cmd({
    pattern: "menu",
    alias: ["allmenu", "m", "fullmenu"],
    use: '.menu2',
    desc: "Show all bot commands",
    category: "main",
    react: "🐅",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Show typing presence before processing
        await conn.sendPresenceUpdate('composing', from);
        
        let totalCommands = Object.keys(commands).length;
        
        // Get all unique categories and filter out undefined/null categories
        const categories = [...new Set(Object.values(commands).map(c => c.category))].filter(cat => 
            cat && cat.trim() !== '' && cat !== 'undefined'
        );
        
        // Organize commands by category and filter out empty categories
        const categorized = {};
        categories.forEach(cat => {
            const categoryCommands = Object.values(commands).filter(c => c.category === cat);
            // Only add category if it has valid commands
            const validCommands = categoryCommands.filter(cmd => cmd.pattern && cmd.pattern.trim() !== '');
            if (validCommands.length > 0) {
                categorized[cat] = validCommands;
            }
        });

        // Build menu sections - only for categories that have commands
        let menuSections = '';
        for (const [category, cmds] of Object.entries(categorized)) {
            if (cmds && cmds.length > 0) {
                const section = formatCategory(category, cmds);
                if (section !== '') {
                    menuSections += section;
                }
            }
        }

        // Main menu text with new bar styles
        let dec = `*╭┈───〔 ${config.BOT_NAME} 〕┈───⊷*
*├▢ 🤖 Owner:* ${config.OWNER_NAME}
*├▢ 📜 Commands:* ${totalCommands}
*├▢ ⏱️ Runtime:* ${runtime(process.uptime())}
*├▢ 📦 Prefix:* ${config.PREFIX}
*├▢ ⚙️ Mode:* ${config.MODE}
*├▢ 🏷️ Version:* ${config.VERSION}
*╰───────────────────⊷*
${menuSections}

> ${config.DESCRIPTION || ''}`;

        // Determine which media to use
        let mediaData;
        const localImagePath = path.join(__dirname, '../lib/tiger.jpg');
        
        // First check if config has valid media URL
        const mediaType = getMediaType(config.BOT_MEDIA_URL);
        
        if (mediaType === 'image' || mediaType === 'video') {
            try {
                // Check if server is accessible (timeout after 3 seconds)
                await axios.head(config.BOT_MEDIA_URL, { timeout: 3000 });
                // Server is up, use the URL media
                mediaData = { 
                    [mediaType]: { url: config.BOT_MEDIA_URL } 
                };
            } catch (serverError) {
                // Server is down or inaccessible, use local image
                console.log('Media server down, using local image:', serverError.message);
                mediaData = { image: { url: localImagePath } };
            }
        } else {
            // Invalid media URL format, use local image
            mediaData = { image: { url: localImagePath } };
        }

        // Send menu message
        await conn.sendMessage(from, { 
            ...mediaData,
            caption: dec, 
            contextInfo: { 
                mentionedJid: [m.sender], 
                forwardingScore: 999, 
                isForwarded: true, 
                forwardedNewsletterMessageInfo: { 
                    newsletterJid: '120363422931946639@newsletter', 
                    newsletterName: config.BOT_NAME, 
                    serverMessageId: 143 
                } 
            } 
        }, { quoted: mek });

        // Send audio from lib/tiger.mp3 after menu
        const audioPath = path.join(__dirname, '../lib/tiger.mp3');
        
        // Check if audio file exists
        if (fs.existsSync(audioPath)) {
            // Read the audio file
            const audioBuffer = fs.readFileSync(audioPath);
            
            // Send audio message
            await conn.sendMessage(from, {
                audio: audioBuffer,
                mimetype: 'audio/mpeg',
                ptt: false // Set to true for voice note style
            }, { quoted: mek });
        } else {
            console.log('Audio file not found at:', audioPath);
            // Optional: Send fallback message if audio doesn't exist
            // reply('Audio file not found');
        }

    } catch (e) { 
        console.log(e); 
        reply(`Error: ${e}`); 
    } 
})
