const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "gemini",
    desc: "Chat with Gemini AI",
    category: "ai",
    react: "✨",
    filename: __filename
},
async (conn, mek, m, { from, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for Gemini");

        const apiUrl = `https://api.zenitsu.web.id/api/ai/gemini?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.result) {
            await react("❌");
            return reply("Error fetching response. Please try again later.");
        }

        await reply(data.result);
    } catch (e) {
        console.error(e);
        await react("❌");
        reply("An error occurred. Please try again.");
    }
});
