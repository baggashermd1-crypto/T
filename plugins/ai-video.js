// Jawad TechX - Updated Sora Command with Ratio Support
const { cmd } = require("../command");
const config = require("../config");
const fetch = require("node-fetch");

cmd({
  pattern: "sora",
  alias: ["soragen", "soravideo"],
  react: '🎬',
  desc: "Generate AI video using Sora",
  category: "ai",
  filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    // Check if prompt is provided
    if (!q) {
      return await reply("🍁 Please provide a prompt!\nExample: `.sora A cat running in the park`\n\n*Available Ratios:*\n• 16:9 (default - landscape)\n• 9:16 (portrait)\n• 1:1 (square)\n\nUsage: `.sora <prompt>,<ratio>`\nExample: `.sora a man running,1:1`");
    }
    
    // React with processing indicator
    await conn.sendMessage(from, { 
      react: { 
        text: '⏳', 
        key: mek.key 
      } 
    });

    // Parse prompt and ratio
    let prompt = q;
    let ratio = "16:9"; // Default ratio
    
    // Check if user specified a ratio with comma
    if (q.includes(',')) {
      const parts = q.split(',');
      prompt = parts[0].trim();
      const userRatio = parts[1].trim().replace(':', '%3A'); // Convert : to %3A for URL
      
      // Validate supported ratios
      const supportedRatios = ['16:9', '9:16', '1:1'];
      if (supportedRatios.includes(parts[1].trim())) {
        ratio = userRatio;
      } else {
        await reply(`⚠️ Unsupported ratio. Using default 16:9.\n\n*Supported ratios:* 16:9, 9:16, 1:1`);
      }
    }

    // API endpoints
    const baseUrl = "https://rynekoo-api.hf.space/video.gen/sora";
    
    // Step 1: Create video generation request
    const encodedPrompt = encodeURIComponent(prompt);
    const createUrl = `${baseUrl}/create?prompt=${encodedPrompt}&ratio=${ratio}`;
    
    // Create video request
    const createResponse = await fetch(createUrl);
    
    if (!createResponse.ok) {
      throw new Error(`API error: ${createResponse.status}`);
    }
    
    const createData = await createResponse.json();
    
    if (!createData.success) {
      throw new Error("Failed to start video generation");
    }
    
    const taskId = createData.result.id;
    
    // Wait 30 seconds for initial generation
    await new Promise(resolve => setTimeout(resolve, 30000));
    
    // Step 2: Check video status
    const checkUrl = `${baseUrl}/get?id=${taskId}`;
    
    // Function to check status
    const checkStatus = async () => {
      const checkResponse = await fetch(checkUrl);
      if (!checkResponse.ok) {
        throw new Error(`Check API error: ${checkResponse.status}`);
      }
      return await checkResponse.json();
    };
    
    let checkData = await checkStatus();
    
    // Poll for completion (max 3 attempts with 30s intervals)
    let attempts = 1;
    while ((checkData.result.status === "processing" || checkData.result.status === "starting") && attempts < 3) {
      await new Promise(resolve => setTimeout(resolve, 30000));
      checkData = await checkStatus();
      attempts++;
    }
    
    // Handle final status
    if (checkData.result.status === "succeeded") {
      const videoUrl = checkData.result.output;
      
      // Download and send video
      const videoResponse = await fetch(videoUrl);
      
      if (!videoResponse.ok) {
        throw new Error(`Failed to download video: ${videoResponse.status}`);
      }
      
      const videoBuffer = await videoResponse.buffer();
      
      // Success reaction
      await conn.sendMessage(from, { 
        react: { 
          text: '✅', 
          key: mek.key 
        } 
      });
      
      // Send video with ratio info
      const ratioDisplay = ratio.replace('%3A', ':');
      await conn.sendMessage(from, {
        video: videoBuffer,
        caption: `*🎬 Sora Video Generated*\n\n*Prompt:* ${prompt}\n*Ratio:* ${ratioDisplay}\n\n> ${config.DESCRIPTION || "Generated with Sora AI"}`,
        mimetype: "video/mp4"
      }, { quoted: mek });
      
    } else if (checkData.result.status === "failed") {
      throw new Error("Video generation failed. Please try a different prompt.");
    } else {
      throw new Error("Video generation timed out. Try again later.");
    }
    
  } catch (error) {
    console.error("Sora Error:", error);
    
    // Error reaction
    await conn.sendMessage(from, { 
      react: { 
        text: '❌', 
        key: mek.key 
      } 
    });
    
    await reply(`❌ Error generating video:\n${error.message}`);
  }
});
