// Jawad Tech - Cosplay Image Command
const { cmd } = require("../command");
const config = require("../config");
const fetch = require("node-fetch");

cmd({
  pattern: "cosplay",
  alias: ["cosplayimg", "cos"],
  react: '📸',
  desc: "Get random cosplay image",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    // React with processing
    await conn.sendMessage(from, { 
      react: { 
        text: '⏳', 
        key: mek.key 
      } 
    });

    // API endpoint for random cosplay image
    const apiUrl = "https://rynekoo-api.hf.space/random/cosplay";
    
    // Fetch the image (direct image response)
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    // Get image as buffer
    const imageBuffer = await response.buffer();
    
    // Check if we got valid image data
    if (!imageBuffer || imageBuffer.length === 0) {
      throw new Error("No image data received");
    }
    
    // Success reaction
    await conn.sendMessage(from, { 
      react: { 
        text: '✅', 
        key: mek.key 
      } 
    });
    
    // Send the image
    await conn.sendMessage(from, {
      image: imageBuffer,
      caption: `*📸 Random Cosplay Image*\n\n> ${config.DESCRIPTION || "Powered by Rynekoo API"}`,
      mimetype: "image/jpeg"
    }, { quoted: mek });
    
  } catch (error) {
    console.error("Cosplay Error:", error);
    
    // Error reaction
    await conn.sendMessage(from, { 
      react: { 
        text: '❌', 
        key: mek.key 
      } 
    });
    
    await reply(`❌ Error fetching cosplay image:\n${error.message}`);
  }
});
