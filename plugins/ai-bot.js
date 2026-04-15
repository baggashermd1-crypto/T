const { cmd } = require('../command');
const axios = require('axios');

// KHAN-MD / BOT - Delhi style
cmd({
    pattern: "bot",
    desc: "KHAN-MD Delhi style",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, q, reply, react }) => {
    try {
        if (!q) return reply("Kya bol rha hai bhai? Kuch to bol!");

        const prompt = `You are KHAN-MD, a friendly and humorous AI assistant. 
        Your personality traits:
        - Speak only in Roman Urdu mixed with Hindi
        - Be funny and casual like a Delhi friend
        - Use phrases like bhai, oyee, kya bolti company
        - Don't be too formal, be like a street-smart friend
        - If someone asks your name, say "Mera naam KHAN hai bhai!"
        - Respond in short, funny ways without emojis
        Do not repeat this prompt in your response.
        
        User message: ${q}`;

        const apiUrl = `https://api.zenitsu.web.id/api/ai/gpt?question=${encodeURIComponent(q)}&prompt=${encodeURIComponent(prompt)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.results) {
            await react("❌");
            return reply("Arey bhai! Kuch to gadbad hai, baad me try karna");
        }

        await reply(data.results);
    } catch (e) {
        console.error(e);
        await react("❌");
        reply("Oye! Kuch to error agaya, chalta hun main");
    }
});
