const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
  pattern: "newgc",
  alias: ["creategroup", "makegroup"],
  desc: "Create a new group and add participants",
  category: "group",
  filename: __filename,
}, async (conn, mek, m, {
  from,
  isCreator,
  body,
  reply
}) => {
  try {
    // Only bot owner can use this command
    if (!isCreator) return await reply("🔐 Only bot owner can use this command.");
    
    if (!body) {
      return await reply("❓ Usage: `newgc Group Name;number1,number2,...`\nExample: `newgc My Group;923001234567,923009876543`");
    }

    const parts = body.split(";");
    if (parts.length < 2) {
      return await reply("⚠️ Please provide both group name and numbers.\nFormat: Group Name;number1,number2,...");
    }

    const groupName = parts[0].trim();
    const numbersString = parts[1].trim();

    if (!groupName || !numbersString) {
      return await reply("⚠️ Group name and numbers are required.");
    }

    // Validate and format numbers
    const participantNumbers = numbersString.split(",")
      .map(num => {
        let cleanNum = num.trim();
        // Add country code if missing (assuming 92 for Pakistan)
        if (cleanNum.startsWith("3")) {
          cleanNum = "92" + cleanNum;
        }
        // Ensure it's a valid WhatsApp number format
        return cleanNum.includes('@') ? cleanNum : `${cleanNum}@s.whatsapp.net`;
      })
      .filter(num => num.match(/^\d+@s\.whatsapp\.net$/)); // Filter valid numbers

    if (participantNumbers.length === 0) {
      return await reply("❌ No valid phone numbers provided.\nExample: 923001234567,923009876543");
    }

    // Add bot owner to the group as well
    const ownerJid = conn.user.id.split(':')[0] + '@s.whatsapp.net';
    if (!participantNumbers.includes(ownerJid)) {
      participantNumbers.push(ownerJid);
    }

    // Create the group
    const group = await conn.groupCreate(groupName, participantNumbers);
    const inviteCode = await conn.groupInviteCode(group.id);
    const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;

    // Send welcome message to the new group
    await conn.sendMessage(group.id, {
      text: `🎉 *Welcome to ${groupName}!*\n\nGroup created successfully!\nInvite Link: ${inviteLink}\n\nUse this link to invite more members.`
    });

    await reply(`✅ Group created successfully!\n\n📌 *Name:* ${groupName}\n👥 *Members:* ${participantNumbers.length}\n🔗 *Link:* ${inviteLink}\n\nWelcome message sent to the group.`);

  } catch (err) {
    console.error(err);
    
    if (err.message?.includes("401") || err.message?.includes("not authorized")) {
      await reply("❌ I'm not authorized to create groups. Check bot permissions.");
    } else if (err.message?.includes("invalid") || err.message?.includes("phone")) {
      await reply("❌ Invalid phone number(s) provided.\nEnsure numbers are in international format: 923001234567");
    } else if (err.message?.includes("too many")) {
      await reply("❌ Too many participants. WhatsApp limits group creation to certain numbers.");
    } else {
      await reply("❌ Failed to create group: " + (err.message || "Unknown error"));
    }
  }
});
