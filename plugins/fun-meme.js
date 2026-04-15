const { cmd } = require('../command');
const converter = require('../lib/converter');

// Fixed delay function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ==================== OUCH COMMAND ====================
cmd({
    pattern: "ouch",
    alias: ["awch", "goiz", "sparrow"],
    desc: "Funny Pakistani meme sound - Ouch awch goiz",
    category: "fun",
    react: "😂",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const audioUrl = "https://files.catbox.moe/ije8ef.mp3";
        
        // Show recording animation
        await conn.sendPresenceUpdate('recording', from);
        
        // Fetch audio
        const audioResponse = await fetch(audioUrl);
        const arrayBuffer = await audioResponse.arrayBuffer();
        const audioBuffer = Buffer.from(arrayBuffer);

        // Fixed 3-second delay before converting
        await delay(3000);

        // Convert to PTT
        const pttAudio = await converter.toPTT(audioBuffer, 'mp3');

        // Send voice note
        await conn.sendMessage(from, {
            audio: pttAudio,
            mimetype: 'audio/ogg; codecs=opus',
            ptt: true
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply(`❌ Error: ${error.message}`);
    }
});

// ==================== TECHNOLOGIA COMMAND ====================

cmd({
    pattern: "technologia",
    alias: ["tech", "technologyia"],
    desc: "Send the Technologia meme audio",
    category: "fun",
    react: "😂",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        await conn.sendMessage(from, {
            audio: { url: "https://files.catbox.moe/fac856.mp3" },
            mimetype: "audio/mpeg",
            ptt: false
        }, { quoted: mek });
    } catch (e) {
        console.error(e);
        reply("*❌ Technologia Failed!*\n_Blyat! Error: " + e.message + "_");
    }
});


// ==================== TAROUN COMMAND ====================
cmd({
    pattern: "taroun",
    alias: ["tadao", "tung"],
    desc: "Send the Taroun meme audio",
    category: "fun",
    react: "🎵",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const audioUrl = "https://files.catbox.moe/tkawe4.mp3";
        
        // Show recording animation
        await conn.sendPresenceUpdate('recording', from);
        
        // Fetch audio
        const audioResponse = await fetch(audioUrl);
        const arrayBuffer = await audioResponse.arrayBuffer();
        const audioBuffer = Buffer.from(arrayBuffer);

        // Fixed 3-second delay before converting
        await delay(3000);

        // Convert to PTT
        const pttAudio = await converter.toPTT(audioBuffer, 'mp3');

        // Send voice note
        await conn.sendMessage(from, {
            audio: pttAudio,
            mimetype: 'audio/ogg; codecs=opus',
            ptt: true
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`*❌ Taroun Failed!*\n_Error: ${e.message}_`);
    }
});