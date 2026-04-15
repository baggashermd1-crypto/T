const { cmd } = require("../command");

cmd({
  pattern: "poll",
  alias: ["vote", "survey"],
  desc: "Create a poll with question and options",
  category: "group",
  filename: __filename,
}, async (conn, mek, m, {
  from,
  isCreator,
  isAdmins,
  isGroup,
  q,
  reply
}) => {
  try {
    if (!isGroup) return await reply("⚠️ This command only works in groups.");
    if (!isAdmins && !isCreator) return await reply("🔐 Only admins can create polls.");
    
    if (!q) {
      return await reply("❓ Usage: `poll Question;Option1,Option2,Option3`\nExample: `poll Best color?;Red,Blue,Green,Black`");
    }

    const parts = q.split(";");
    if (parts.length < 2) {
      return await reply("⚠️ Please provide both question and options.\nFormat: Question;Option1,Option2,Option3");
    }

    const question = parts[0].trim();
    const optionsString = parts[1].trim();

    if (!question || !optionsString) {
      return await reply("⚠️ Question and options are required.");
    }

    // Parse options
    const options = optionsString.split(",")
      .map(opt => opt.trim())
      .filter(opt => opt.length > 0);

    if (options.length < 2) {
      return await reply("❌ Please provide at least two options.");
    }

    if (options.length > 12) {
      return await reply("⚠️ Maximum 12 options allowed.");
    }

    // Create and send poll
    await conn.sendMessage(from, {
      poll: {
        name: question,
        values: options,
        selectableCount: 1,
        toAnnouncementGroup: true,
      }
    }, { quoted: mek });

  } catch (err) {
    console.error(err);
    await reply("❌ Failed to create poll.");
  }
});
