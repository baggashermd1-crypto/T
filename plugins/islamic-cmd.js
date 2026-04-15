// jawad tech
const { cmd } = require('../command');
const axios = require('axios');
const { Readable } = require('stream');

cmd({
    pattern: "surah",
    desc: "Play Quran surah audio by number (1-114)",
    category: "download",
    react: "📖",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply("📖 Please provide a surah number!\n\nExample: .surah 1");

        const surahNumber = parseInt(q);
        if (isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
            return await reply("❌ Invalid surah number! Use 1-114");
        }

        const audioUrl = `https://cdn.islamic.network/quran/audio-surah/128/ar.alafasy/${surahNumber}.mp3`;
        
        // Get the stream
        const response = await axios({
            method: 'GET',
            url: audioUrl,
            responseType: 'stream'
        });

        // Add metadata to the stream
        const stream = response.data;
        stream._readableState = stream._readableState || {};
        stream.url = audioUrl;

        // Send as DOCUMENT (better for long audio)
        await conn.sendMessage(from, {
            document: stream,
            mimetype: "audio/mpeg",
            fileName: `SURAH-${surahNumber}.mp3`
        }, { 
            quoted: mek 
        });

        // Success reaction
        await conn.sendMessage(from, { 
            react: { text: '✅', key: m.key } 
        });

    } catch (e) {
        console.error("Error in .surah command:", e);
        await reply("❌ Error occurred, please try again!");
        await conn.sendMessage(from, { 
            react: { text: '❌', key: m.key } 
        });
    }
});
