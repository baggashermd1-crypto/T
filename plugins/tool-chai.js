const { cmd } = require('../command');
const { sleep } = require('../lib/functions');

cmd({
    pattern: "cgrt",
    alias: ["cigrate", "smoke", "🚬"],
    desc: "Sends a fun cigarette meme with smoking animation",
    category: "fun",
    react: "🚬",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        // Owner restriction check - only creator can use
        if (!isCreator) {
            return await conn.sendMessage(from, {
                text: "*📛 This is an owner-only command.*\n_Only the bot owner can use this._"
            }, { quoted: mek });
        }

        // Smoking animation steps
        const smokeSteps = [
            "Preparing your cigarette break... 🚬",
            "Rolling your cigarette... 🚬",
            "Lighting it up... 🔥",
            "*Puff*... 💨",
            "*Puff puff*... 💨💨",
            "Ahhh... that sweet nicotine rush... 😌",
            "*Cough cough* (just kidding) 😂",
            "Enjoying the moment... 🚬😎",
            "Blowing smoke rings... ⭕💨",
            "Almost finished... 🚬",
            "Final puff... 💨",
            "Your smoking session is complete! 🚬✨\nSending meme..."
        ];

        // Send initial message
        const smokingMsg = await conn.sendMessage(from, { 
            text: smokeSteps[0] 
        }, { quoted: mek });

        // Edit the same message for each step
        for (let i = 1; i < smokeSteps.length; i++) {
            await sleep(800);
            const protocolMsg = {
                key: smokingMsg.key,
                type: 0xe,
                editedMessage: { conversation: smokeSteps[i] }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        // Send meme after animation
        await sleep(1000);
        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/bd95gw.jpg" },
            caption: "- *Smoking kills... but looks cool* 🚬😎\n> _Smoking is injurious to health_\n> _This is just for fun_ 😂",
            mimetype: "image/jpeg"
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ *Cigarette dropped!* ${e.message}\n_Maybe try vaping instead?_ 😜`);
    }
});

cmd({
    pattern: "chai",
    alias: ["tea", "chay", "cha", "chah"],
    desc: "Brews you a fantastic cup of chai with the famous meme!",
    category: "tools",
    react: "☕",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    try {
        // Owner restriction check
        if (!isCreator) {
            return await conn.sendMessage(from, {
                text: "*📛 This is an owner command.*"
            }, { quoted: mek });
        }

        // Chai brewing animation with fun steps
        const chaiSteps = [
            "Brewing your chai... ☕",
            "Boiling water... 💦",
            "Adding Assam tea leaves... 🍃",
            "Pouring fresh milk... 🥛",
            "Crushing ginger & cardamom... 🧄🌿",
            "Adding just the right sugar... ⚖️",
            "Letting it boil to perfection... ♨️",
            "*Aroma intensifies* 👃🤤",
            "Straining the tea... 🕳️",
            "Pouring into cup... 🫖",
            "Almost ready... ⏳",
            "Your masala chai is ready! ☕✨\nSending meme..."
        ];

        // Send initial message
        const brewingMsg = await conn.sendMessage(from, { 
            text: chaiSteps[0] 
        }, { quoted: mek });

        // Edit the same message for each step
        for (let i = 1; i < chaiSteps.length; i++) {
            await sleep(1000);
            const protocolMsg = {
                key: brewingMsg.key,
                type: 0xe,
                editedMessage: { conversation: chaiSteps[i] }
            };
            await conn.relayMessage(from, { protocolMessage: protocolMsg }, {});
        }

        // Send the famous meme image
        await sleep(1000);
        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/dyzdgl.jpg" },
            caption: "- *The Tea Was Fantastic* ☕\n> _(Remember 2019 😂💀🗿)_ \n - *2019 X 2025 🗿😎*",
            mimetype: "image/jpeg"
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ *Chai spilled!* ${e.message}\n_Better luck next time!_`);
    }
});
