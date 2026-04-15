// Jawad Tech - Cartoon TikTok Commands

const { cmd } = require("../command");
const fetch = require("node-fetch");

// Classic Cartoons
cmd({
    pattern: "tomjerry",
    desc: "Send random Tom & Jerry TikTok videos",
    react: '🐱🐭',
    category: 'utility',
    use: ".tomjerry",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Tom and Jerry cartoon tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Tom & Jerry videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐱🐭 *Tom & Jerry Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Tom & Jerry Error:', error);
        reply("❌ Failed to fetch Tom & Jerry video.");
    }
});

cmd({
    pattern: "mickeymouse",
    desc: "Send random Mickey Mouse TikTok videos",
    react: '🐭',
    category: 'utility',
    use: ".mickeymouse",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Mickey Mouse Disney tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Mickey Mouse videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐭 *Mickey Mouse Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Mickey Mouse Error:', error);
        reply("❌ Failed to fetch Mickey Mouse video.");
    }
});

cmd({
    pattern: "donaldduck",
    desc: "Send random Donald Duck TikTok videos",
    react: '🦆',
    category: 'utility',
    use: ".donaldduck",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Donald Duck Disney tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Donald Duck videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦆 *Donald Duck Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Donald Duck Error:', error);
        reply("❌ Failed to fetch Donald Duck video.");
    }
});

cmd({
    pattern: "bugsbunny",
    desc: "Send random Bugs Bunny TikTok videos",
    react: '🐰',
    category: 'utility',
    use: ".bugsbunny",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Bugs Bunny Looney Tunes tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Bugs Bunny videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐰 *Bugs Bunny Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Bugs Bunny Error:', error);
        reply("❌ Failed to fetch Bugs Bunny video.");
    }
});

cmd({
    pattern: "spongebob",
    desc: "Send random SpongeBob TikTok videos",
    react: '🧽',
    category: 'utility',
    use: ".spongebob",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("SpongeBob SquarePants tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No SpongeBob videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🧽 *SpongeBob Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('SpongeBob Error:', error);
        reply("❌ Failed to fetch SpongeBob video.");
    }
});

cmd({
    pattern: "doraemon",
    desc: "Send random Doraemon TikTok videos",
    react: '🤖',
    category: 'utility',
    use: ".doraemon",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Doraemon anime cartoon tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Doraemon videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🤖 *Doraemon Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Doraemon Error:', error);
        reply("❌ Failed to fetch Doraemon video.");
    }
});

cmd({
    pattern: "shinchan",
    desc: "Send random Shin Chan TikTok videos",
    react: '👦',
    category: 'utility',
    use: ".shinchan",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Shin Chan cartoon tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Shin Chan videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 👦 *Shin Chan Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Shin Chan Error:', error);
        reply("❌ Failed to fetch Shin Chan video.");
    }
});

cmd({
    pattern: "pokemon",
    desc: "Send random Pokémon TikTok videos",
    react: '⚡',
    category: 'utility',
    use: ".pokemon",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Pokemon anime tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Pokémon videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- ⚡ *Pokémon Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Pokémon Error:', error);
        reply("❌ Failed to fetch Pokémon video.");
    }
});

cmd({
    pattern: "ben10",
    desc: "Send random Ben 10 TikTok videos",
    react: '👽',
    category: 'utility',
    use: ".ben10",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Ben 10 cartoon tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Ben 10 videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 👽 *Ben 10 Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Ben 10 Error:', error);
        reply("❌ Failed to fetch Ben 10 video.");
    }
});

cmd({
    pattern: "powerrangers",
    desc: "Send random Power Rangers TikTok videos",
    react: '🦸',
    category: 'utility',
    use: ".powerrangers",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Power Rangers tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Power Rangers videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦸 *Power Rangers Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Power Rangers Error:', error);
        reply("❌ Failed to fetch Power Rangers video.");
    }
});

// Disney & Pixar
cmd({
    pattern: "frozen",
    desc: "Send random Frozen TikTok videos",
    react: '❄️',
    category: 'utility',
    use: ".frozen",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Frozen Disney movie tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Frozen videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- ❄️ *Frozen Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Frozen Error:', error);
        reply("❌ Failed to fetch Frozen video.");
    }
});

cmd({
    pattern: "cars",
    desc: "Send random Cars movie TikTok videos",
    react: '🚗',
    category: 'utility',
    use: ".cars",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Cars Pixar movie tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Cars videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🚗 *Cars Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Cars Error:', error);
        reply("❌ Failed to fetch Cars video.");
    }
});

cmd({
    pattern: "toystory",
    desc: "Send random Toy Story TikTok videos",
    react: '🤠',
    category: 'utility',
    use: ".toystory",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Toy Story Pixar tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Toy Story videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🤠 *Toy Story Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Toy Story Error:', error);
        reply("❌ Failed to fetch Toy Story video.");
    }
});

cmd({
    pattern: "findingnemo",
    desc: "Send random Finding Nemo TikTok videos",
    react: '🐠',
    category: 'utility',
    use: ".findingnemo",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Finding Nemo movie tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Finding Nemo videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐠 *Finding Nemo Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Finding Nemo Error:', error);
        reply("❌ Failed to fetch Finding Nemo video.");
    }
});

// Modern Cartoons
cmd({
    pattern: "adventuretime",
    desc: "Send random Adventure Time TikTok videos",
    react: '🧢',
    category: 'utility',
    use: ".adventuretime",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Adventure Time cartoon tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Adventure Time videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🧢 *Adventure Time Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Adventure Time Error:', error);
        reply("❌ Failed to fetch Adventure Time video.");
    }
});

cmd({
    pattern: "rickandmorty",
    desc: "Send random Rick and Morty TikTok videos",
    react: '👨‍🔬',
    category: 'utility',
    use: ".rickandmorty",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Rick and Morty tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Rick and Morty videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 👨‍🔬 *Rick and Morty Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Rick and Morty Error:', error);
        reply("❌ Failed to fetch Rick and Morty video.");
    }
});

cmd({
    pattern: "gravityfalls",
    desc: "Send random Gravity Falls TikTok videos",
    react: '🌲',
    category: 'utility',
    use: ".gravityfalls",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Gravity Falls cartoon tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Gravity Falls videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🌲 *Gravity Falls Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Gravity Falls Error:', error);
        reply("❌ Failed to fetch Gravity Falls video.");
    }
});

cmd({
    pattern: "stevenuniverse",
    desc: "Send random Steven Universe TikTok videos",
    react: '💎',
    category: 'utility',
    use: ".stevenuniverse",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Steven Universe cartoon tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Steven Universe videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 💎 *Steven Universe Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Steven Universe Error:', error);
        reply("❌ Failed to fetch Steven Universe video.");
    }
});

// Anime Cartoons
cmd({
    pattern: "dragonball",
    desc: "Send random Dragon Ball TikTok videos",
    react: '🐉',
    category: 'utility',
    use: ".dragonball",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Dragon Ball Z anime tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Dragon Ball videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐉 *Dragon Ball Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Dragon Ball Error:', error);
        reply("❌ Failed to fetch Dragon Ball video.");
    }
});

cmd({
    pattern: "naruto",
    desc: "Send random Naruto TikTok videos",
    react: '🍥',
    category: 'utility',
    use: ".naruto",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Naruto anime tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Naruto videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🍥 *Naruto Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Naruto Error:', error);
        reply("❌ Failed to fetch Naruto video.");
    }
});

cmd({
    pattern: "onepiece",
    desc: "Send random One Piece TikTok videos",
    react: '🏴‍☠️',
    category: 'utility',
    use: ".onepiece",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("One Piece anime tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No One Piece videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🏴‍☠️ *One Piece Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('One Piece Error:', error);
        reply("❌ Failed to fetch One Piece video.");
    }
});

cmd({
    pattern: "demoncat",
    desc: "Send random Demon Slayer TikTok videos",
    react: '👺',
    category: 'utility',
    use: ".demoncat",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Demon Slayer anime tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Demon Slayer videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 👺 *Demon Slayer Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Demon Slayer Error:', error);
        reply("❌ Failed to fetch Demon Slayer video.");
    }
});

// Indian Cartoons
cmd({
    pattern: "chhotabheem",
    desc: "Send random Chhota Bheem TikTok videos",
    react: '💪',
    category: 'utility',
    use: ".chhotabheem",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Chhota Bheem cartoon tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Chhota Bheem videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 💪 *Chhota Bheem Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Chhota Bheem Error:', error);
        reply("❌ Failed to fetch Chhota Bheem video.");
    }
});

cmd({
    pattern: "motupatlu",
    desc: "Send random Motu Patlu TikTok videos",
    react: '👬',
    category: 'utility',
    use: ".motupatlu",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("Motu Patlu cartoon tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No Motu Patlu videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 👬 *Motu Patlu Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Motu Patlu Error:', error);
        reply("❌ Failed to fetch Motu Patlu video.");
    }
});

// Fun Cartoons
cmd({
    pattern: "cartooncompilation",
    desc: "Send random cartoon compilation TikTok videos",
    react: '🎬',
    category: 'utility',
    use: ".cartooncompilation",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("cartoon funny compilation tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No cartoon compilation videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🎬 *Cartoon Compilation Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Cartoon Compilation Error:', error);
        reply("❌ Failed to fetch cartoon compilation video.");
    }
});

// More Wild Animals
cmd({
    pattern: "hyena",
    desc: "Send random hyena TikTok videos",
    react: '🐾',
    category: 'utility',
    use: ".hyena",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("hyena laughing tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No hyena videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐾 *Hyena Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Hyena Error:', error);
        reply("❌ Failed to fetch hyena video.");
    }
});

cmd({
    pattern: "mongoose",
    desc: "Send random mongoose TikTok videos",
    react: '🐕',
    category: 'utility',
    use: ".mongoose",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("mongoose animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No mongoose videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐕 *Mongoose Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Mongoose Error:', error);
        reply("❌ Failed to fetch mongoose video.");
    }
});

cmd({
    pattern: "porcupine",
    desc: "Send random porcupine TikTok videos",
    react: '🦔',
    category: 'utility',
    use: ".porcupine",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("porcupine animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No porcupine videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦔 *Porcupine Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Porcupine Error:', error);
        reply("❌ Failed to fetch porcupine video.");
    }
});

// Marine Mammals
cmd({
    pattern: "manatee",
    desc: "Send random manatee TikTok videos",
    react: '🧜',
    category: 'utility',
    use: ".manatee",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("manatee sea cow tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No manatee videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🧜 *Manatee Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Manatee Error:', error);
        reply("❌ Failed to fetch manatee video.");
    }
});

cmd({
    pattern: "otter",
    desc: "Send random otter TikTok videos",
    react: '🦦',
    category: 'utility',
    use: ".otter",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("otter cute tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No otter videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦦 *Otter Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Otter Error:', error);
        reply("❌ Failed to fetch otter video.");
    }
});

cmd({
    pattern: "beaver",
    desc: "Send random beaver TikTok videos",
    react: '🦫',
    category: 'utility',
    use: ".beaver",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("beaver animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No beaver videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦫 *Beaver Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Beaver Error:', error);
        reply("❌ Failed to fetch beaver video.");
    }
});

// More Birds
cmd({
    pattern: "pelican",
    desc: "Send random pelican TikTok videos",
    react: '🪿',
    category: 'utility',
    use: ".pelican",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("pelican bird tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No pelican videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🪿 *Pelican Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Pelican Error:', error);
        reply("❌ Failed to fetch pelican video.");
    }
});

cmd({
    pattern: "vulture",
    desc: "Send random vulture TikTok videos",
    react: '🦅',
    category: 'utility',
    use: ".vulture",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("vulture bird tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No vulture videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦅 *Vulture Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Vulture Error:', error);
        reply("❌ Failed to fetch vulture video.");
    }
});

cmd({
    pattern: "woodpecker",
    desc: "Send random woodpecker TikTok videos",
    react: '🐦',
    category: 'utility',
    use: ".woodpecker",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("woodpecker bird tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No woodpecker videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐦 *Woodpecker Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Woodpecker Error:', error);
        reply("❌ Failed to fetch woodpecker video.");
    }
});

// More Marine Life
cmd({
    pattern: "lobster",
    desc: "Send random lobster TikTok videos",
    react: '🦞',
    category: 'utility',
    use: ".lobster",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("lobster sea animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No lobster videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦞 *Lobster Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Lobster Error:', error);
        reply("❌ Failed to fetch lobster video.");
    }
});

cmd({
    pattern: "crab",
    desc: "Send random crab TikTok videos",
    react: '🦀',
    category: 'utility',
    use: ".crab",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("crab sea animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No crab videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦀 *Crab Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Crab Error:', error);
        reply("❌ Failed to fetch crab video.");
    }
});

cmd({
    pattern: "squid",
    desc: "Send random squid TikTok videos",
    react: '🦑',
    category: 'utility',
    use: ".squid",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("squid sea animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No squid videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦑 *Squid Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Squid Error:', error);
        reply("❌ Failed to fetch squid video.");
    }
});

// More Insects
cmd({
    pattern: "dragonfly",
    desc: "Send random dragonfly TikTok videos",
    react: '🦟',
    category: 'utility',
    use: ".dragonfly",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("dragonfly insect tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No dragonfly videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦟 *Dragonfly Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Dragonfly Error:', error);
        reply("❌ Failed to fetch dragonfly video.");
    }
});

cmd({
    pattern: "ladybug",
    desc: "Send random ladybug TikTok videos",
    react: '🐞',
    category: 'utility',
    use: ".ladybug",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("ladybug insect tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No ladybug videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐞 *Ladybug Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Ladybug Error:', error);
        reply("❌ Failed to fetch ladybug video.");
    }
});

cmd({
    pattern: "grasshopper",
    desc: "Send random grasshopper TikTok videos",
    react: '🦗',
    category: 'utility',
    use: ".grasshopper",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("grasshopper insect tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No grasshopper videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦗 *Grasshopper Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Grasshopper Error:', error);
        reply("❌ Failed to fetch grasshopper video.");
    }
});

// More Unique Animals
cmd({
    pattern: "wombat",
    desc: "Send random wombat TikTok videos",
    react: '🐻',
    category: 'utility',
    use: ".wombat",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("wombat australia tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No wombat videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐻 *Wombat Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Wombat Error:', error);
        reply("❌ Failed to fetch wombat video.");
    }
});

cmd({
    pattern: "platypus",
    desc: "Send random platypus TikTok videos",
    react: '🦆',
    category: 'utility',
    use: ".platypus",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("platypus australia tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No platypus videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦆 *Platypus Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Platypus Error:', error);
        reply("❌ Failed to fetch platypus video.");
    }
});

cmd({
    pattern: "meerkat",
    desc: "Send random meerkat TikTok videos",
    react: '🐾',
    category: 'utility',
    use: ".meerkat",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("meerkat animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No meerkat videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐾 *Meerkat Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Meerkat Error:', error);
        reply("❌ Failed to fetch meerkat video.");
    }
});

// More Farm Animals
cmd({
    pattern: "buffalo",
    desc: "Send random buffalo TikTok videos",
    react: '🐃',
    category: 'utility',
    use: ".buffalo",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("buffalo animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No buffalo videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐃 *Buffalo Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Buffalo Error:', error);
        reply("❌ Failed to fetch buffalo video.");
    }
});

cmd({
    pattern: "yak",
    desc: "Send random yak TikTok videos",
    react: '🐃',
    category: 'utility',
    use: ".yak",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("yak animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No yak videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐃 *Yak Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Yak Error:', error);
        reply("❌ Failed to fetch yak video.");
    }
});

cmd({
    pattern: "camel",
    desc: "Send random camel TikTok videos",
    react: '🐪',
    category: 'utility',
    use: ".camel",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("camel desert animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No camel videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐪 *Camel Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Camel Error:', error);
        reply("❌ Failed to fetch camel video.");
    }
});

// Last 3 to complete 100
cmd({
    pattern: "lemur",
    desc: "Send random lemur TikTok videos",
    react: '🐒',
    category: 'utility',
    use: ".lemur",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("lemur madagascar tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No lemur videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐒 *Lemur Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Lemur Error:', error);
        reply("❌ Failed to fetch lemur video.");
    }
});

cmd({
    pattern: "tapir",
    desc: "Send random tapir TikTok videos",
    react: '🐷',
    category: 'utility',
    use: ".tapir",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("tapir animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No tapir videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐷 *Tapir Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Tapir Error:', error);
        reply("❌ Failed to fetch tapir video.");
    }
});

cmd({
    pattern: "okapi",
    desc: "Send random okapi TikTok videos",
    react: '🦒',
    category: 'utility',
    use: ".okapi",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("okapi forest giraffe tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No okapi videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦒 *Okapi Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Okapi Error:', error);
        reply("❌ Failed to fetch okapi video.");
    }
});

// Domestic & Farm Animals
cmd({
    pattern: "pig",
    desc: "Send random pig TikTok videos",
    react: '🐷',
    category: 'utility',
    use: ".pig",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("pig funny tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No pig videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐷 *Pig Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Pig Error:', error);
        reply("❌ Failed to fetch pig video.");
    }
});

cmd({
    pattern: "donkey",
    desc: "Send random donkey TikTok videos",
    react: '🫏',
    category: 'utility',
    use: ".donkey",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("donkey animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No donkey videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🫏 *Donkey Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Donkey Error:', error);
        reply("❌ Failed to fetch donkey video.");
    }
});

cmd({
    pattern: "chicken",
    desc: "Send random chicken TikTok videos",
    react: '🐔',
    category: 'utility',
    use: ".chicken",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("chicken rooster tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No chicken videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐔 *Chicken Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Chicken Error:', error);
        reply("❌ Failed to fetch chicken video.");
    }
});

cmd({
    pattern: "duck",
    desc: "Send random duck TikTok videos",
    react: '🦆',
    category: 'utility',
    use: ".duck",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("duck cute tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No duck videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦆 *Duck Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Duck Error:', error);
        reply("❌ Failed to fetch duck video.");
    }
});

cmd({
    pattern: "turkey",
    desc: "Send random turkey TikTok videos",
    react: '🦃',
    category: 'utility',
    use: ".turkey",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("turkey bird tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No turkey videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦃 *Turkey Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Turkey Error:', error);
        reply("❌ Failed to fetch turkey video.");
    }
});

cmd({
    pattern: "goose",
    desc: "Send random goose TikTok videos",
    react: '🪿',
    category: 'utility',
    use: ".goose",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("goose bird tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No goose videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🪿 *Goose Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Goose Error:', error);
        reply("❌ Failed to fetch goose video.");
    }
});

// Birds
cmd({
    pattern: "peacock",
    desc: "Send random peacock TikTok videos",
    react: '🦚',
    category: 'utility',
    use: ".peacock",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("peacock beautiful tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No peacock videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦚 *Peacock Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Peacock Error:', error);
        reply("❌ Failed to fetch peacock video.");
    }
});

cmd({
    pattern: "eagle",
    desc: "Send random eagle TikTok videos",
    react: '🦅',
    category: 'utility',
    use: ".eagle",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("eagle bird tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No eagle videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦅 *Eagle Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Eagle Error:', error);
        reply("❌ Failed to fetch eagle video.");
    }
});

cmd({
    pattern: "hawk",
    desc: "Send random hawk TikTok videos",
    react: '🦅',
    category: 'utility',
    use: ".hawk",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("hawk bird tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No hawk videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦅 *Hawk Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Hawk Error:', error);
        reply("❌ Failed to fetch hawk video.");
    }
});

cmd({
    pattern: "flamingo",
    desc: "Send random flamingo TikTok videos",
    react: '🦩',
    category: 'utility',
    use: ".flamingo",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("flamingo bird tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No flamingo videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦩 *Flamingo Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Flamingo Error:', error);
        reply("❌ Failed to fetch flamingo video.");
    }
});

cmd({
    pattern: "swan",
    desc: "Send random swan TikTok videos",
    react: '🦢',
    category: 'utility',
    use: ".swan",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("swan beautiful tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No swan videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦢 *Swan Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Swan Error:', error);
        reply("❌ Failed to fetch swan video.");
    }
});

cmd({
    pattern: "crow",
    desc: "Send random crow TikTok videos",
    react: '🐦‍⬛',
    category: 'utility',
    use: ".crow",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("crow raven tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No crow videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐦‍⬛ *Crow Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Crow Error:', error);
        reply("❌ Failed to fetch crow video.");
    }
});

// Wild Cats
cmd({
    pattern: "cheetah",
    desc: "Send random cheetah TikTok videos",
    react: '🐆',
    category: 'utility',
    use: ".cheetah",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("cheetah fast animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No cheetah videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐆 *Cheetah Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Cheetah Error:', error);
        reply("❌ Failed to fetch cheetah video.");
    }
});

cmd({
    pattern: "leopard",
    desc: "Send random leopard TikTok videos",
    react: '🐆',
    category: 'utility',
    use: ".leopard",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("leopard wild cat tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No leopard videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐆 *Leopard Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Leopard Error:', error);
        reply("❌ Failed to fetch leopard video.");
    }
});

cmd({
    pattern: "panther",
    desc: "Send random panther TikTok videos",
    react: '🐈‍⬛',
    category: 'utility',
    use: ".panther",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("panther black cat tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No panther videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐈‍⬛ *Panther Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Panther Error:', error);
        reply("❌ Failed to fetch panther video.");
    }
});

cmd({
    pattern: "jaguar",
    desc: "Send random jaguar TikTok videos",
    react: '🐆',
    category: 'utility',
    use: ".jaguar",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("jaguar animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No jaguar videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐆 *Jaguar Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Jaguar Error:', error);
        reply("❌ Failed to fetch jaguar video.");
    }
});

// Primates
cmd({
    pattern: "gorilla",
    desc: "Send random gorilla TikTok videos",
    react: '🦍',
    category: 'utility',
    use: ".gorilla",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("gorilla animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No gorilla videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦍 *Gorilla Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Gorilla Error:', error);
        reply("❌ Failed to fetch gorilla video.");
    }
});

cmd({
    pattern: "chimpanzee",
    desc: "Send random chimpanzee TikTok videos",
    react: '🐵',
    category: 'utility',
    use: ".chimpanzee",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("chimpanzee monkey tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No chimpanzee videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐵 *Chimpanzee Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Chimpanzee Error:', error);
        reply("❌ Failed to fetch chimpanzee video.");
    }
});

cmd({
    pattern: "orangutan",
    desc: "Send random orangutan TikTok videos",
    react: '🦧',
    category: 'utility',
    use: ".orangutan",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("orangutan ape tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No orangutan videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦧 *Orangutan Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Orangutan Error:', error);
        reply("❌ Failed to fetch orangutan video.");
    }
});

// Rodents
cmd({
    pattern: "mouse",
    desc: "Send random mouse TikTok videos",
    react: '🐭',
    category: 'utility',
    use: ".mouse",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("mouse cute tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No mouse videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐭 *Mouse Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Mouse Error:', error);
        reply("❌ Failed to fetch mouse video.");
    }
});

cmd({
    pattern: "rat",
    desc: "Send random rat TikTok videos",
    react: '🐀',
    category: 'utility',
    use: ".rat",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("rat pet tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No rat videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐀 *Rat Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Rat Error:', error);
        reply("❌ Failed to fetch rat video.");
    }
});

cmd({
    pattern: "hamster",
    desc: "Send random hamster TikTok videos",
    react: '🐹',
    category: 'utility',
    use: ".hamster",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("hamster cute pet tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No hamster videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐹 *Hamster Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Hamster Error:', error);
        reply("❌ Failed to fetch hamster video.");
    }
});

cmd({
    pattern: "guineapig",
    desc: "Send random guinea pig TikTok videos",
    react: '🐹',
    category: 'utility',
    use: ".guineapig",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("guinea pig pet tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No guinea pig videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐹 *Guinea Pig Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Guinea Pig Error:', error);
        reply("❌ Failed to fetch guinea pig video.");
    }
});

cmd({
    pattern: "squirrel",
    desc: "Send random squirrel TikTok videos",
    react: '🐿️',
    category: 'utility',
    use: ".squirrel",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("squirrel cute tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No squirrel videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐿️ *Squirrel Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Squirrel Error:', error);
        reply("❌ Failed to fetch squirrel video.");
    }
});

// Reptiles & Amphibians
cmd({
    pattern: "lizard",
    desc: "Send random lizard TikTok videos",
    react: '🦎',
    category: 'utility',
    use: ".lizard",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("lizard reptile tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No lizard videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦎 *Lizard Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Lizard Error:', error);
        reply("❌ Failed to fetch lizard video.");
    }
});

cmd({
    pattern: "chameleon",
    desc: "Send random chameleon TikTok videos",
    react: '🦎',
    category: 'utility',
    use: ".chameleon",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("chameleon color change tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No chameleon videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦎 *Chameleon Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Chameleon Error:', error);
        reply("❌ Failed to fetch chameleon video.");
    }
});

cmd({
    pattern: "gecko",
    desc: "Send random gecko TikTok videos",
    react: '🦎',
    category: 'utility',
    use: ".gecko",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("gecko pet tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No gecko videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦎 *Gecko Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Gecko Error:', error);
        reply("❌ Failed to fetch gecko video.");
    }
});

cmd({
    pattern: "frog",
    desc: "Send random frog TikTok videos",
    react: '🐸',
    category: 'utility',
    use: ".frog",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("frog cute tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No frog videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐸 *Frog Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Frog Error:', error);
        reply("❌ Failed to fetch frog video.");
    }
});

cmd({
    pattern: "toad",
    desc: "Send random toad TikTok videos",
    react: '🐸',
    category: 'utility',
    use: ".toad",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("toad amphibian tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No toad videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐸 *Toad Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Toad Error:', error);
        reply("❌ Failed to fetch toad video.");
    }
});

// Marine Animals
cmd({
    pattern: "octopus",
    desc: "Send random octopus TikTok videos",
    react: '🐙',
    category: 'utility',
    use: ".octopus",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("octopus sea animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No octopus videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐙 *Octopus Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Octopus Error:', error);
        reply("❌ Failed to fetch octopus video.");
    }
});

cmd({
    pattern: "jellyfish",
    desc: "Send random jellyfish TikTok videos",
    react: '🎐',
    category: 'utility',
    use: ".jellyfish",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("jellyfish beautiful tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No jellyfish videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🎐 *Jellyfish Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Jellyfish Error:', error);
        reply("❌ Failed to fetch jellyfish video.");
    }
});

cmd({
    pattern: "seal",
    desc: "Send random seal TikTok videos",
    react: '🦭',
    category: 'utility',
    use: ".seal",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("seal sea animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No seal videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦭 *Seal Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Seal Error:', error);
        reply("❌ Failed to fetch seal video.");
    }
});

cmd({
    pattern: "walrus",
    desc: "Send random walrus TikTok videos",
    react: '🦭',
    category: 'utility',
    use: ".walrus",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("walrus animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No walrus videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦭 *Walrus Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Walrus Error:', error);
        reply("❌ Failed to fetch walrus video.");
    }
});

cmd({
    pattern: "seahorse",
    desc: "Send random seahorse TikTok videos",
    react: '🐎',
    category: 'utility',
    use: ".seahorse",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("seahorse sea animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No seahorse videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐎 *Seahorse Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Seahorse Error:', error);
        reply("❌ Failed to fetch seahorse video.");
    }
});

cmd({
    pattern: "starfish",
    desc: "Send random starfish TikTok videos",
    react: '⭐',
    category: 'utility',
    use: ".starfish",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("starfish sea animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No starfish videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- ⭐ *Starfish Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Starfish Error:', error);
        reply("❌ Failed to fetch starfish video.");
    }
});

// Insects & Arachnids
cmd({
    pattern: "butterfly",
    desc: "Send random butterfly TikTok videos",
    react: '🦋',
    category: 'utility',
    use: ".butterfly",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("butterfly beautiful tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No butterfly videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦋 *Butterfly Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Butterfly Error:', error);
        reply("❌ Failed to fetch butterfly video.");
    }
});

cmd({
    pattern: "bee",
    desc: "Send random bee TikTok videos",
    react: '🐝',
    category: 'utility',
    use: ".bee",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("bee insect tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No bee videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐝 *Bee Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Bee Error:', error);
        reply("❌ Failed to fetch bee video.");
    }
});

cmd({
    pattern: "spider",
    desc: "Send random spider TikTok videos",
    react: '🕷️',
    category: 'utility',
    use: ".spider",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("spider web tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No spider videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🕷️ *Spider Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Spider Error:', error);
        reply("❌ Failed to fetch spider video.");
    }
});

cmd({
    pattern: "ant",
    desc: "Send random ant TikTok videos",
    react: '🐜',
    category: 'utility',
    use: ".ant",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("ant colony tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No ant videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐜 *Ant Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Ant Error:', error);
        reply("❌ Failed to fetch ant video.");
    }
});

// Unique Animals
cmd({
    pattern: "hedgehog",
    desc: "Send random hedgehog TikTok videos",
    react: '🦔',
    category: 'utility',
    use: ".hedgehog",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("hedgehog cute pet tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No hedgehog videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦔 *Hedgehog Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Hedgehog Error:', error);
        reply("❌ Failed to fetch hedgehog video.");
    }
});

cmd({
    pattern: "raccoon",
    desc: "Send random raccoon TikTok videos",
    react: '🦝',
    category: 'utility',
    use: ".raccoon",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("raccoon funny tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No raccoon videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦝 *Raccoon Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Raccoon Error:', error);
        reply("❌ Failed to fetch raccoon video.");
    }
});

cmd({
    pattern: "sloth",
    desc: "Send random sloth TikTok videos",
    react: '🦥',
    category: 'utility',
    use: ".sloth",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("sloth slow animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No sloth videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦥 *Sloth Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Sloth Error:', error);
        reply("❌ Failed to fetch sloth video.");
    }
});

cmd({
    pattern: "kangaroo",
    desc: "Send random kangaroo TikTok videos",
    react: '🦘',
    category: 'utility',
    use: ".kangaroo",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("kangaroo australia tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No kangaroo videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦘 *Kangaroo Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Kangaroo Error:', error);
        reply("❌ Failed to fetch kangaroo video.");
    }
});

cmd({
    pattern: "hippo",
    desc: "Send random hippopotamus TikTok videos",
    react: '🦛',
    category: 'utility',
    use: ".hippo",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("hippopotamus animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No hippo videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦛 *Hippo Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Hippo Error:', error);
        reply("❌ Failed to fetch hippo video.");
    }
});

cmd({
    pattern: "rhino",
    desc: "Send random rhinoceros TikTok videos",
    react: '🦏',
    category: 'utility',
    use: ".rhino",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("rhinoceros animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No rhino videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦏 *Rhino Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Rhino Error:', error);
        reply("❌ Failed to fetch rhino video.");
    }
});

cmd({
    pattern: "llama",
    desc: "Send random llama TikTok videos",
    react: '🦙',
    category: 'utility',
    use: ".llama",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("llama animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No llama videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦙 *Llama Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Llama Error:', error);
        reply("❌ Failed to fetch llama video.");
    }
});

cmd({
    pattern: "alpaca",
    desc: "Send random alpaca TikTok videos",
    react: '🦙',
    category: 'utility',
    use: ".alpaca",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("alpaca animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No alpaca videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦙 *Alpaca Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Alpaca Error:', error);
        reply("❌ Failed to fetch alpaca video.");
    }
});

cmd({
    pattern: "armadillo",
    desc: "Send random armadillo TikTok videos",
    react: '🦔',
    category: 'utility',
    use: ".armadillo",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("armadillo animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No armadillo videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦔 *Armadillo Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Armadillo Error:', error);
        reply("❌ Failed to fetch armadillo video.");
    }
});

// Domestic Animals
cmd({
    pattern: "cat",
    desc: "Send random cat TikTok videos",
    react: '🐱',
    category: 'utility',
    use: ".cat",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("cat cute funny tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No cat videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐱 *Cat Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Cat Error:', error);
        reply("❌ Failed to fetch cat video.");
    }
});

cmd({
    pattern: "dog",
    desc: "Send random dog TikTok videos",
    react: '🐶',
    category: 'utility',
    use: ".dog",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("dog puppy funny tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No dog videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐶 *Dog Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Dog Error:', error);
        reply("❌ Failed to fetch dog video.");
    }
});

cmd({
    pattern: "horse",
    desc: "Send random horse TikTok videos",
    react: '🐴',
    category: 'utility',
    use: ".horse",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("horse riding tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No horse videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐴 *Horse Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Horse Error:', error);
        reply("❌ Failed to fetch horse video.");
    }
});

cmd({
    pattern: "cow",
    desc: "Send random cow TikTok videos",
    react: '🐮',
    category: 'utility',
    use: ".cow",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("cow animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No cow videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐮 *Cow Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Cow Error:', error);
        reply("❌ Failed to fetch cow video.");
    }
});

cmd({
    pattern: "goat",
    desc: "Send random goat TikTok videos",
    react: '🐐',
    category: 'utility',
    use: ".goat",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("goat funny tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No goat videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐐 *Goat Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Goat Error:', error);
        reply("❌ Failed to fetch goat video.");
    }
});

cmd({
    pattern: "sheep",
    desc: "Send random sheep TikTok videos",
    react: '🐑',
    category: 'utility',
    use: ".sheep",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("sheep animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No sheep videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐑 *Sheep Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Sheep Error:', error);
        reply("❌ Failed to fetch sheep video.");
    }
});

cmd({
    pattern: "rabbit",
    desc: "Send random rabbit TikTok videos",
    react: '🐰',
    category: 'utility',
    use: ".rabbit",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("rabbit bunny cute tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No rabbit videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐰 *Rabbit Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Rabbit Error:', error);
        reply("❌ Failed to fetch rabbit video.");
    }
});

cmd({
    pattern: "bird",
    desc: "Send random bird TikTok videos",
    react: '🐦',
    category: 'utility',
    use: ".bird",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("bird singing tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No bird videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐦 *Bird Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Bird Error:', error);
        reply("❌ Failed to fetch bird video.");
    }
});

cmd({
    pattern: "parrot",
    desc: "Send random parrot TikTok videos",
    react: '🦜',
    category: 'utility',
    use: ".parrot",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("parrot talking tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No parrot videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦜 *Parrot Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Parrot Error:', error);
        reply("❌ Failed to fetch parrot video.");
    }
});

cmd({
    pattern: "fish",
    desc: "Send random fish TikTok videos",
    react: '🐠',
    category: 'utility',
    use: ".fish",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("fish aquarium tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No fish videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐠 *Fish Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Fish Error:', error);
        reply("❌ Failed to fetch fish video.");
    }
});

// Wild Animals
cmd({
    pattern: "lion",
    desc: "Send random lion TikTok videos",
    react: '🦁',
    category: 'utility',
    use: ".lion",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("lion wild animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No lion videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦁 *Lion Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Lion Error:', error);
        reply("❌ Failed to fetch lion video.");
    }
});

cmd({
    pattern: "tiger",
    desc: "Send random tiger TikTok videos",
    react: '🐯',
    category: 'utility',
    use: ".tiger",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("tiger wild animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No tiger videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐯 *Tiger Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Tiger Error:', error);
        reply("❌ Failed to fetch tiger video.");
    }
});

cmd({
    pattern: "elephant",
    desc: "Send random elephant TikTok videos",
    react: '🐘',
    category: 'utility',
    use: ".elephant",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("elephant animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No elephant videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐘 *Elephant Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Elephant Error:', error);
        reply("❌ Failed to fetch elephant video.");
    }
});

cmd({
    pattern: "giraffe",
    desc: "Send random giraffe TikTok videos",
    react: '🦒',
    category: 'utility',
    use: ".giraffe",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("giraffe animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No giraffe videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦒 *Giraffe Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Giraffe Error:', error);
        reply("❌ Failed to fetch giraffe video.");
    }
});

cmd({
    pattern: "monkey",
    desc: "Send random monkey TikTok videos",
    react: '🐒',
    category: 'utility',
    use: ".monkey",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("monkey funny tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No monkey videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐒 *Monkey Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Monkey Error:', error);
        reply("❌ Failed to fetch monkey video.");
    }
});

cmd({
    pattern: "bear",
    desc: "Send random bear TikTok videos",
    react: '🐻',
    category: 'utility',
    use: ".bear",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("bear wild animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No bear videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐻 *Bear Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Bear Error:', error);
        reply("❌ Failed to fetch bear video.");
    }
});

cmd({
    pattern: "wolf",
    desc: "Send random wolf TikTok videos",
    react: '🐺',
    category: 'utility',
    use: ".wolf",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("wolf animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No wolf videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐺 *Wolf Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Wolf Error:', error);
        reply("❌ Failed to fetch wolf video.");
    }
});

cmd({
    pattern: "fox",
    desc: "Send random fox TikTok videos",
    react: '🦊',
    category: 'utility',
    use: ".fox",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("fox animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No fox videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦊 *Fox Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Fox Error:', error);
        reply("❌ Failed to fetch fox video.");
    }
});

cmd({
    pattern: "deer",
    desc: "Send random deer TikTok videos",
    react: '🦌',
    category: 'utility',
    use: ".deer",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("deer animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No deer videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦌 *Deer Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Deer Error:', error);
        reply("❌ Failed to fetch deer video.");
    }
});

cmd({
    pattern: "zebra",
    desc: "Send random zebra TikTok videos",
    react: '🦓',
    category: 'utility',
    use: ".zebra",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("zebra animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No zebra videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦓 *Zebra Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Zebra Error:', error);
        reply("❌ Failed to fetch zebra video.");
    }
});

cmd({
    pattern: "crocodile",
    desc: "Send random crocodile TikTok videos",
    react: '🐊',
    category: 'utility',
    use: ".crocodile",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("crocodile alligator tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No crocodile videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐊 *Crocodile Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Crocodile Error:', error);
        reply("❌ Failed to fetch crocodile video.");
    }
});

cmd({
    pattern: "snake",
    desc: "Send random snake TikTok videos",
    react: '🐍',
    category: 'utility',
    use: ".snake",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("snake reptile tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No snake videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐍 *Snake Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Snake Error:', error);
        reply("❌ Failed to fetch snake video.");
    }
});

cmd({
    pattern: "turtle",
    desc: "Send random turtle TikTok videos",
    react: '🐢',
    category: 'utility',
    use: ".turtle",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("turtle tortoise tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No turtle videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐢 *Turtle Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Turtle Error:', error);
        reply("❌ Failed to fetch turtle video.");
    }
});

cmd({
    pattern: "penguin",
    desc: "Send random penguin TikTok videos",
    react: '🐧',
    category: 'utility',
    use: ".penguin",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("penguin bird tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No penguin videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐧 *Penguin Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Penguin Error:', error);
        reply("❌ Failed to fetch penguin video.");
    }
});

cmd({
    pattern: "dolphin",
    desc: "Send random dolphin TikTok videos",
    react: '🐬',
    category: 'utility',
    use: ".dolphin",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("dolphin sea animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No dolphin videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐬 *Dolphin Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Dolphin Error:', error);
        reply("❌ Failed to fetch dolphin video.");
    }
});

cmd({
    pattern: "whale",
    desc: "Send random whale TikTok videos",
    react: '🐋',
    category: 'utility',
    use: ".whale",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("whale ocean animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No whale videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐋 *Whale Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Whale Error:', error);
        reply("❌ Failed to fetch whale video.");
    }
});

cmd({
    pattern: "shark",
    desc: "Send random shark TikTok videos",
    react: '🦈',
    category: 'utility',
    use: ".shark",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("shark sea animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No shark videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦈 *Shark Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Shark Error:', error);
        reply("❌ Failed to fetch shark video.");
    }
});

cmd({
    pattern: "owl",
    desc: "Send random owl TikTok videos",
    react: '🦉',
    category: 'utility',
    use: ".owl",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("owl bird tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No owl videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🦉 *Owl Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Owl Error:', error);
        reply("❌ Failed to fetch owl video.");
    }
});

cmd({
    pattern: "koala",
    desc: "Send random koala TikTok videos",
    react: '🐨',
    category: 'utility',
    use: ".koala",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const url = `https://delirius-apiofc.vercel.app/search/tiktoksearch?query=${encodeURIComponent("koala australia animal tiktok")}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error(`API failed: ${response.status}`);
        
        const data = await response.json();
        if (!data?.meta?.length) return reply("❌ No koala videos found.");
        
        const video = data.meta[Math.floor(Math.random() * data.meta.length)];
        
        if (video.hd) {
            await conn.sendMessage(
                from,
                { 
                    video: { url: video.hd },
                    caption: `- 🐨 *Koala Videos*\n> *© Powered by TIGER-MD*`
                },
                { quoted: mek }
            );
        } else {
            reply("❌ Failed to retrieve video.");
        }
    } catch (error) {
        console.error('Koala Error:', error);
        reply("❌ Failed to fetch koala video.");
    }
});
