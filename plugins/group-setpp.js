const { cmd } = require("../command");

cmd({
  pattern: "gcpp",
  alias: ["gpp", "fullppgc", "gcdp", "groupdp"],
  react: "🏙️",
  desc: "Group Admin Only - Set group profile picture",
  category: "group",
  filename: __filename
}, async (client, message, match, { from, isCreator, isBotAdmins, isAdmins, isGroup }) => {
  try {
    // Check if in group
    if (!isGroup) {
      return await client.sendMessage(from, {
        text: "⚠️ This command only works in groups."
      }, { quoted: message });
    }

    // Check if bot is admin
    if (!isBotAdmins) {
      return await client.sendMessage(from, {
        text: "❌ I must be admin to change group picture."
      }, { quoted: message });
    }

    // Check if user is admin or bot owner
    if (!isAdmins && !isCreator) {
      return await client.sendMessage(from, {
        text: "🔐 Only admins can use this command."
      }, { quoted: message });
    }

    // Check for quoted image
    if (!match.quoted) {
      return await client.sendMessage(from, {
        text: "*🍁 Please reply to an image with .setgcpp*"
      }, { quoted: message });
    }

    const mtype = match.quoted.mtype;
    
    if (mtype !== "imageMessage") {
      return await client.sendMessage(from, {
        text: "❌ Only image messages are supported for group picture"
      }, { quoted: message });
    }

    const buffer = await match.quoted.download();
    
    // Update group profile picture
    await client.updateProfilePicture(from, buffer);
    
    await client.sendMessage(from, {
      text: "*✅ Group profile picture updated successfully!*"
    }, { quoted: message });

  } catch (error) {
    console.error("setgcpp Error:", error);
    await client.sendMessage(from, {
      text: "❌ Error updating group picture:\n" + error.message
    }, { quoted: message });
  }
});
