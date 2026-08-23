const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "fimg",
  alias: ["findphoto", "findpic"],
  desc: "Random image without API (100% working)",
  category: "search",
  use: ".img black cat",
  filename: __filename
}, async (conn, mek, m, { from, args, reply }) => {
  try {
    const query = args.join(" ").trim();
    if (!query) return reply("❓ Example: `.img black cat` ya `.img moon`");

    await conn.sendPresenceUpdate("composing", from);

    // Unsplash random image (no API)
    const url = `https://source.unsplash.com/1600x1600/?${encodeURIComponent(query)}`;

    const img = await axios.get(url, {
      responseType: "arraybuffer",
      timeout: 20000,
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    await conn.sendMessage(from, {
      image: Buffer.from(img.data),
      caption: `🖼️ *${query}*\n✨ Random Image`
    }, { quoted: mek });

  } catch (e) {
    console.log("IMG ERROR:", e);
    reply("❌ Image load nahi hui (retry karo)");
  }
});
