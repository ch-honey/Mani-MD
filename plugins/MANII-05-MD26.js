/*_______________________________________________________________________________________________________________________________________________________________________________________________________________________
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
─██████████████──██████████──██████──────────██████████████──██████──────────██████──██████████████──██████──────────██████████████──██████──██████──██████████████──████████████████─── 
─██░░░░░░░░░░██──██░░░░░░██──██░░██──────────██░░░░░░░░░░██──██░░██████████──██░░██──██░░░░░░░░░░██──██░░██──────────██░░░░░░░░░░██──██░░██──██░░██──██░░░░░░░░░░██──██░░░░░░░░░░░░██─── 
─██░░██████████──████░░████──██░░██──────────██░░██████████──██░░░░░░░░░░██──██░░██──██████░░██████──██░░██──────────██░░██████░░██──██░░██──██░░██──██░░██████████──██░░████████░░██─── 
─██░░██────────────██░░██────██░░██──────────██░░██──────────██░░██████░░██──██░░██──────██░░██──────██░░██──────────██░░██──██░░██──██░░██──██░░██──██░░██──────────██░░██────██░░██─── 
─██░░██████████────██░░██────██░░██──────────██░░██████████──██░░██──██░░██──██░░██──────██░░██──────██░░██──────────██░░██──██░░██──██░░██──██░░██──██░░██████████──██░░████████░░██─── 
─██░░░░░░░░░░██────██░░██────██░░██──────────██░░░░░░░░░░██──██░░██──██░░██──██░░██──────██░░██──────██░░██──────────██░░██──██░░██──██░░██──██░░██──██░░░░░░░░░░██──██░░░░░░░░░░░░██─── 
─██████████░░██────██░░██────██░░██──────────██░░██████████──██░░██──██░░██──██░░██──────██░░██──────██░░██──────────██░░██──██░░██──██░░██──██░░██──██░░██████████──██░░██████░░████─── 
─────────██░░██────██░░██────██░░██──────────██░░██──────────██░░██──██░░██████░░██──────██░░██──────██░░██──────────██░░██──██░░██──██░░░░██░░░░██──██░░██──────────██░░██──██░░██───── 
─██████████░░██──████░░████──██░░██████████──██░░██████████──██░░██──██░░░░░░░░░░██──────██░░██──────██░░██████████──██░░██████░░██──████░░░░░░████──██░░██████████──██░░██──██░░██████─ 
─██░░░░░░░░░░██──██░░░░░░██──██░░░░░░░░░░██──██░░░░░░░░░░██──██░░██──██████████░░██──────██░░██──────██░░░░░░░░░░██──██░░░░░░░░░░██────████░░████────██░░░░░░░░░░██──██░░██──██░░░░░░██─ 
─██████████████──██████████──██████████████──██████████████──██████──────────██████──────██████──────██████████████──██████████████──────██████──────██████████████──██████──██████████─ 
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
created by MANII05 🔥 
contact me on telegram mani05here ♻️
© Copy coder alert ⚠
*/


const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

const WA_DEFAULT_EPHEMERAL_24H = 86400;  // 24 hours
const WA_DEFAULT_EPHEMERAL_7D = 604800;  // 7 days
const WA_DEFAULT_EPHEMERAL_90D = 7776000; // 90 days

cmd({
    pattern: "disappear",
    react: "🌪️",
    alias: ["dm"],
    desc: "Turn on/off disappearing messages.",
    category: "group",
    filename: __filename
}, 
async (conn, mek, m, { from, isGroup, isAdmins, args }) => {
    if (!isGroup) {
        await conn.sendMessage(from, { text: 'This command can only be used in groups.' });
        return;
    }
    
    if (!isAdmins) {
        await conn.sendMessage(from, { text: 'Only admins can turn on/off disappearing messages.' });
        return;
    }

    const action = args[0];

    if (action === 'on') {
        const duration = args[1];
        let ephemeralDuration;

        switch (duration) {
            case '24h':
                ephemeralDuration = WA_DEFAULT_EPHEMERAL_24H;
                break;
            case '7d':
                ephemeralDuration = WA_DEFAULT_EPHEMERAL_7D;
                break;
            case '90d':
                ephemeralDuration = WA_DEFAULT_EPHEMERAL_90D;
                break;
            default:
                await conn.sendMessage(from, { text: 'Invalid duration! Use `24h`, `7d`, or `90d`.' });
                return;
        }

        // Turn on disappearing messages with the specified duration
        await conn.sendMessage(
            from,
            { disappearingMessagesInChat: ephemeralDuration }
        );
        await conn.sendMessage(from, { text: `Disappearing messages are now ON for ${duration}.` });
    } else if (action === 'off') {
        // Turn off disappearing messages
        await conn.sendMessage(
            from,
            { disappearingMessagesInChat: false }
        );
        await conn.sendMessage(from, { text: 'Disappearing messages are now OFF.' });
    } else {
        await conn.sendMessage(from, { text: 'Please use `!disappear on <duration>` or `!disappear off`.' });
    }
});

// Command to send a disappearing message
cmd({
    pattern: "senddm",
    react: "🌪️",
    alias: ["senddisappear"],
    desc: "Send a disappearing message.",
    category: "group",
    filename: __filename
}, 
async (conn, mek, m, { from, isGroup, isAdmins, args }) => {
    if (!isGroup) {
        await conn.sendMessage(from, { text: 'This command can only be used in groups.' });
        return;
    }
    
    if (!args.length) {
        await conn.sendMessage(from, { text: 'Please provide a message to send.' });
        return;
    }

    const message = args.join(' '); // Join the args to create the message text

    // Send the disappearing message
    await conn.sendMessage(from, { text: message }, { ephemeralExpiration: WA_DEFAULT_EPHEMERAL_7D }); // Default duration is set to 7 days
});


cmd({
    pattern: "mute",
    react: "🔇",
    alias: ["close","f_mute"],
    desc: "Change to group settings to only admins can send messages.",
    category: "group",
    use: '.mute',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/DARKSILENCE04/DARK-SILENCE-MD-DATABASE/refs/heads/main/DATABASE/mreply.json')).replyMsg

if (!isGroup) return reply(msr.only_gp)
if (!isAdmins) { if (!isDev) return reply(msr.you_adm),{quoted:mek }} 
if (!isBotAdmins) return reply(msr.give_adm)
await conn.groupSettingUpdate(from, 'announcement')
 await conn.sendMessage(from , { text: `*Group Chat closed by Admin ${pushname}* 🔇` }, { quoted: mek } )
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
})


cmd({
    pattern: "unmute",
    react: "🔇",
    alias: ["open","f_unmute"],
    desc: "Change to group settings to all members can send messages.",
    category: "group",
    use: '.unmute',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/DARKSILENCE04/DARK-SILENCE-MD-DATABASE/refs/heads/main/DATABASE/mreply.json')).replyMsg

if (!isGroup) return reply(msr.only_gp)
if (!isAdmins) { if (!isDev) return reply(msr.you_adm),{quoted:mek }} 
if (!isBotAdmins) return reply(msr.give_adm)
await conn.groupSettingUpdate(from, 'not_announcement')
 await conn.sendMessage(from , { text: `*Group Chat Opened by Admin ${pushname}* 🔇` }, { quoted: mek } )
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )


cmd({
    pattern: "lockgs",
    react: "🔇",
    alias: ["lockgsettings"],
    desc: "Change to group settings to only admins can edit group info",
    category: "group",
    use: '.lockgs',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/DARKSILENCE04/DARK-SILENCE-MD-DATABASE/refs/heads/main/DATABASE/mreply.json')).replyMsg

if (!isGroup) return reply(msr.only_gp)
if (!isAdmins) { if (!isDev) return reply(msr.you_adm),{quoted:mek }} 
if (!isBotAdmins) return reply(msr.give_adm)
await conn.groupSettingUpdate(from, 'locked')
 await conn.sendMessage(from , { text: `*Group settings Locked* 🔒` }, { quoted: mek } )
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )


cmd({
    pattern: "unlockgs",
    react: "🔓",
    alias: ["unlockgsettings"],
    desc: "Change to group settings to all members can edit group info",
    category: "group",
    use: '.unlockgs',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/DARKSILENCE04/DARK-SILENCE-MD-DATABASE/refs/heads/main/DATABASE/mreply.json')).replyMsg

if (!isGroup) return reply(msr.only_gp)
if (!isAdmins) { if (!isDev) return reply(msr.you_adm),{quoted:mek }} 
if (!isBotAdmins) return reply(msr.give_adm)
await conn.groupSettingUpdate(from, 'unlocked')
 await conn.sendMessage(from , { text: `*Group settings Unlocked* 🔓` }, { quoted: mek } )
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )


cmd({
    pattern: "leave",
    react: "🔓",
    alias: ["left","kickme","f_leave","f_left","bye"],
    desc: "To leave from the group",
    category: "group",
    use: '.leave',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/DARKSILENCE04/DARK-SILENCE-MD-DATABASE/refs/heads/main/DATABASE/mreply.json')).replyMsg

if (!isGroup) return reply(msr.only_gp)
if (!isBotAdmins) return reply(`*_you are not bot owner so I can't left this group...🚀_*`)
if (isAdmins) return reply(`*_you are not bot owner so I can't left this group...🚀_*`)	
if (!isOwner) return reply(msr.you_adm)
 await conn.sendMessage(from , { text: `*_Good Bye All..._* 👋🏻` }, { quoted: mek } )
 await conn.groupLeave(from) 
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )


cmd({
    pattern: "updategname",
    react: "🔓",
    alias: ["upgname","gname"],
    desc: "To Change the group name",
    category: "group",
    use: '.updategname',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/DARKSILENCE04/DARK-SILENCE-MD-DATABASE/refs/heads/main/DATABASE/mreply.json')).replyMsg

if (!isGroup) return reply(msr.only_gp)
if (!isAdmins) { if (!isDev) return reply(msr.you_adm),{quoted:mek }} 
if (!isBotAdmins) return reply(msr.give_adm)
if (!q) return reply("*Please write the new Group Subject* 🖊️")
await conn.groupUpdateSubject(from, q )
 await conn.sendMessage(from , { text: `✔️ *Group name Updated*` }, { quoted: mek } )
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )


cmd({
    pattern: "updategdesc",
    react: "🔓",
    alias: ["upgdesc","gdesc"],
    desc: "To Change the group description",
    category: "group",
    use: '.updategdesc',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/DARKSILENCE04/DARK-SILENCE-MD-DATABASE/refs/heads/main/DATABASE/mreply.json')).replyMsg

if (!isGroup) return reply(msr.only_gp)
if (!isAdmins) { if (!isDev) return reply(msr.you_adm),{quoted:mek }} 
if (!isBotAdmins) return reply(msr.give_adm)
if (!q) return reply("*Please write the new Group Description* 🖊️")
await conn.groupUpdateDescription(from, q )
 await conn.sendMessage(from , { text: `✔️ *Group Description Updated*` }, { quoted: mek } )
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )


cmd({
    pattern: "join",
    react: "📬",
    alias: ["joinme","f_join"],
    desc: "To Join a Group from Invite link",
    category: "group",
    use: '.join < Group Link >',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/DARKSILENCE04/DARK-SILENCE-MD-DATABASE/refs/heads/main/DATABASE/mreply.json')).replyMsg

if (!isCreator && !isDev && !isOwner && !isMe) return reply(msr.own_cmd)
if (!q) return reply("*Please write the Group Link*️ 🖇️")
 let result = args[0].split('https://chat.whatsapp.com/')[1]
 await conn.groupAcceptInvite(result)
     await conn.sendMessage(from , { text: `✔️ *SUCCESSFULLY JOINED BY MANII-05-MD*`}, { quoted: mek } )
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )



cmd({
    pattern: "invite",
    react: "🖇️",
    alias: ["grouplink","glink"],
    desc: "To Get the Group Invite link",
    category: "group",
    use: '.invite',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/DARKSILENCE04/DARK-SILENCE-MD-DATABASE/refs/heads/main/DATABASE/mreply.json')).replyMsg

if (!isGroup) return reply(msr.only_gp)
if (!isAdmins) { if (!isDev) return reply(msr.you_adm),{quoted:mek }} 
if (!isBotAdmins) return reply(msr.give_adm)
const code = await conn.groupInviteCode(from)

 await conn.sendMessage(from , { text: `🖇️ *Group Link*\n\nhttps://chat.whatsapp.com/${code}`}, { quoted: mek } )
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )



cmd({
    pattern: "revoke",
    react: "🖇️",
    alias: ["revokegrouplink","resetglink","revokelink","f_revoke"],
    desc: "To Reset the group link",
    category: "group",
    use: '.revoke',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/DARKSILENCE04/DARK-SILENCE-MD-DATABASE/refs/heads/main/DATABASE/mreply.json')).replyMsg

if (!isGroup) return reply(msr.only_gp)
if (!isAdmins) { if (!isDev) return reply(msr.you_adm),{quoted:mek }} 
if (!isBotAdmins) return reply(msr.give_adm)
await conn.groupRevokeInvite(from)
 await conn.sendMessage(from , { text: `*Group link Reseted* ⛔`}, { quoted: mek } )
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )

cmd({
    pattern: "kick",
    react: "🥏",
    alias: ["remove"],
    desc: "To Remove a participant from Group",
    category: "group",
    use: '.kick',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/DARKSILENCE04/DARK-SILENCE-MD-DATABASE/refs/heads/main/DATABASE/mreply.json')).replyMsg

if (!isGroup) return reply(msr.only_gp)
if (!isAdmins) { if (!isDev) return reply(msr.you_adm),{quoted:mek }} 
if (!isBotAdmins) return reply(msr.give_adm)
  
		let users = mek.mentionedJid ? mek.mentionedJid[0] : mek.msg.contextInfo.participant || false;
			if (!users) return reply("*_SWIPE ANY USER TO USE THIS ACTION..🚀_* ❌")

			await conn.groupParticipantsUpdate(from, [users], "remove")
			await conn.sendMessage(from,{text:`*SUCCESSFULLY REMOVED BY MANII-05-MD*  ✔️`},{quoted:mek })
	
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *SWIPE USER TO USE ACTION...🚀*`)
}
} )


cmd({
    pattern: "promote",
    react: "🥏",
    alias: ["addadmin"],
    desc: "Promote a member to admin",
    category: "group",
    use: ".promote @user",
    filename: __filename
},
async (conn, mek, m, {
    from, isGroup, isAdmins, isBotAdmins, isDev, participants, reply
}) => {
try {
    const msr = (await fetchJson(
        'https://raw.githubusercontent.com/DARKSILENCE04/DARK-SILENCE-MD-DATABASE/refs/heads/main/DATABASE/mreply.json'
    )).replyMsg;

    if (!isGroup) return reply(msr.only_gp);
    if (!isAdmins && !isDev) return reply(msr.you_adm);
    if (!isBotAdmins) return reply(msr.give_adm);

    let user = m.mentionedJid?.[0] ||
        mek.message?.extendedTextMessage?.contextInfo?.participant;

    if (!user) return reply("❌ *_Swipe ya mention kisi user ko promote karne ke liye_*");

    const groupAdmins = await getGroupAdmins(participants);
    if (groupAdmins.includes(user))
        return reply("❗ *User already admin hai*");

    await conn.groupParticipantsUpdate(from, [user], "promote");
    reply("✅ *User promoted as admin successfully*");

} catch (e) {
    console.log("Promote Error:", e);
    reply("❌ Promote failed");
}
});


const normalizeJid = (jid) => {
    if (!jid) return jid;
    return jid.includes("@s.whatsapp.net")
        ? jid
        : jid.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
};

cmd({
    pattern: "demote",
    react: "🥀",
    alias: ["removeadmin"],
    desc: "Demote an admin to member",
    category: "group",
    use: ".demote @user",
    filename: __filename
},
async (conn, mek, m, {
    from, isGroup, isAdmins, isBotAdmins, isDev, reply
}) => {
try {

    if (!isGroup) return reply("❌ Group only command");
    if (!isAdmins && !isDev) return reply("❌ Sirf admins use kar sakte hain");
    if (!isBotAdmins) return reply("❌ Bot ko admin banao pehle");

    let user;
    const ctx = mek.message?.extendedTextMessage?.contextInfo;

    // ───── MENTION ─────
    if (ctx?.mentionedJid?.length > 0) {
        user = ctx.mentionedJid[0];
    }
    // ───── REPLY (QUOTED USER) ─────
    else if (ctx?.participant) {
        user = ctx.participant;
    }

    if (!user)
        return reply("❗ Admin ko mention ya uske message par reply karo");

    // 🔧 JID FIX
    user = normalizeJid(user);

    // 🛑 BOT SELF PROTECTION
    if (user === conn.user.id)
        return reply("🤖 Main khud ko demote nahi kar sakta");

    // ───── REAL ADMIN CHECK ─────
    const metadata = await conn.groupMetadata(from);

    const admin = metadata.participants.find(
        p =>
            normalizeJid(p.id) === user &&
            (p.admin === "admin" || p.admin === "superadmin")
    );

    if (!admin)
        return reply("❌ Ye user admin hi nahi hai");

    await conn.groupParticipantsUpdate(from, [user], "demote");
    reply("✅ User successfully demoted");

} catch (e) {
    console.log("Demote Error:", e);
    reply("❌ Demote failed");
}
});

cmd({
    pattern: "tagall",
    react: "🔊",
    alias: ["gc_tagall"],
    desc: "To Tag all Members",
    category: "group",
    use: '.tagall',
    filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, senderNumber, groupAdmins, prefix, command }) => {
    try {
        if (!isGroup) return reply("*_❌ This command can only be used in groups._*");
        
        const botOwner = conn.user.id.split(":")[0]; // Extract bot owner's number
        const senderJid = senderNumber + "@s.whatsapp.net";

        if (!groupAdmins.includes(senderJid) && senderNumber !== botOwner) {
            return reply("*_❌ Only group admins or the bot owner can use this command._*");
        }

        // Ensure group metadata is fetched properly
        let groupInfo = await conn.groupMetadata(from).catch(() => null);
        if (!groupInfo) return reply("❌ Failed to fetch group information.");

        let groupName = groupInfo.subject || "Unknown Group";
        let totalMembers = participants ? participants.length : 0;
        if (totalMembers === 0) return reply("❌ No members found in this group.");

        let emojis = ['📢', '🔊', '🌐', '🔰', '❤‍🩹', '🤍', '🖤', '🩵', '📝', '💗', '🔖', '🪩', '📦', '🎉', '🛡️', '💸', '⏳', '🗿', '🚀', '🎧', '🪀', '⚡', '🚩', '🍁', '🗣️', '👻', '⚠️', '🔥'];
        let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        // Ensure message is properly extracted
        let message = (m.body || "").slice((prefix + command).length).trim();
        if (!message) message = "MANII-05-MD TAG ALL MEMBERS...🚀"; // Default message

        let teks = `▢ GROUP : *${groupName}*\n▢ MEMBERS : *${totalMembers}*\n\n▢ MESSAGE : *${message}*\n\n┌───⊷ *MENTIONS MEMBERS*\n`;

        for (let mem of participants) {
            if (!mem.id) continue; // Prevent undefined errors
            teks += `${randomEmoji} @${mem.id.split('@')[0]}\n`;
        }

        teks += "└──✪ MANII-05-MD ┃ WHATSAPP BOT ✪──";

        conn.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) }, { quoted: mek });

    } catch (e) {
        console.error("TagAll Error:", e);
        reply(`❌ *Error Occurred !!*\n\n${e.message || e}`);
    }
});

cmd({
    pattern: "hidetag",
    react: "🔊",
    alias: ["tag","f_tag"],
    desc: "To Tag all Members for Message",
    category: "group",
    use: '.tag Hi',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/DARKSILENCE04/DARK-SILENCE-MD-DATABASE/refs/heads/main/DATABASE/mreply.json')).replyMsg

if (!isGroup) return reply(msr.only_gp)
if (!isAdmins) { if (!isDev) return reply(msr.you_adm),{quoted:mek }} 
if (!isBotAdmins) return reply(msr.give_adm)
	
		if(!q) return reply('*Please add a Message* ℹ️')
		let teks = `${q}`
                conn.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) }, { quoted: mek })
                
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )

cmd({
    pattern: "taggp",
    react: "🔊",
    alias: ["tggp","f_taggp"],
    desc: "To Tag all Members for Message",
    category: "group",
    use: '.tag Hi',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
		if ( !m.quoted ) return reply('*Please mention a message* ℹ️')
		if(!q) return reply('*Please add a Group Jid* ℹ️')
		//if ( q == "120363174739054837@g.us" ) { if ( !isDev ) return reply("❌ *Acai wage ! You can send Tag messages to Official Support Group*") }
		let teks = `${m.quoted.msg}`
        conn.sendMessage(q, { text: teks, mentions: participants.map(a => a.id) }, { quoted: mek })
                
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )

cmd({
    pattern: "ginfo",
    react: "🥏",
    alias: ["groupinfo"],
    desc: "Get group informations.",
    category: "group",
    use: '.ginfo',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const msr = (await fetchJson('https://raw.githubusercontent.com/DARKSILENCE04/DARK-SILENCE-MD-DATABASE/refs/heads/main/DATABASE/mreply.json')).replyMsg

if (!isGroup) return reply(msr.only_gp)
if (!isAdmins) { if (!isDev) return reply(msr.you_adm),{quoted:mek }} 
if (!isBotAdmins) return reply(msr.give_adm)
const metadata = await conn.groupMetadata(from) 
let ppUrl = await conn.profilePictureUrl( from , 'image')
const gdata = `\n*${metadata.subject}*

🐉 *Group Jid* - ${metadata.id}

📬 *Participant Count* - ${metadata.size}

👤 *Group Creator* - ${metadata.owner}

📃 *Group Description* - ${metadata.desc}\n\n`
await conn.sendMessage(from,{image:{url: ppUrl },caption: gdata + config.FOOTER },{quoted:mek })
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )

cmd({
    pattern: "joinrequests",
    desc: "Get list of participants who requested to join the group",
    react: "📋",
    category: "group",
    filename: __filename
}, 
async (conn, mek, m, { from, q, reply, isGroup }) => {
    if (!isGroup) return reply("This command can only be used in a group chat.");

    try {
        const groupJid = from;  // Use the group ID from the message context
        console.log(`Attempting to fetch pending requests for group: ${groupJid}`);
        
        const response = await conn.groupRequestParticipantsList(groupJid);
        console.log(response); // Log the response for debugging

        if (response.length > 0) {
            let participantList = "Pending Requests to Join the Group:\n";
            let mentions = []; // Array to hold participant mentions

            response.forEach(participant => {
                const jid = participant.jid;
                participantList += `😻 @${jid.split('@')[0]}\n`; // Format the mention
                mentions.push(jid); // Add JID to mentions array
            });

            // Send the reply with mentions
            await conn.sendMessage(from, {
                text: participantList,
                mentions: mentions // Include mentions array here
            });
        } else {
            reply("No pending requests to join the group.");
        }
    } catch (e) {
        console.error(`Error fetching participant requests: ${e.message}`); // Log specific error message
        reply("⚠️ An error occurred while fetching the pending requests. Please try again later.");
    }
});

cmd({
    pattern: "allreq",
    desc: "Approve or reject all join requests",
    react: "✅",
    category: "group",
    filename: __filename
}, 
async (conn, mek, m, { from, reply, isGroup }) => {
    if (!isGroup) return reply("This command can only be used in a group chat.");

    const action = m.body.includes("approve") ? "approve" : "reject"; // Determine action based on the command

    try {
        // Fetch all pending requests
        const pendingRequests = await conn.groupRequestParticipantsList(from);
        
        if (pendingRequests.length === 0) {
            return reply("There are no pending requests to manage.");
        }

        // Format mentions and JIDs for approval/rejection
        let participantList = "Pending Requests to Join the Group:\n";
        let mentions = [];
        let jids = [];

        pendingRequests.forEach(participant => {
            const jid = participant.jid;
            participantList += `😻 @${jid.split('@')[0]}\n`; // Format the mention
            mentions.push(jid); // Add JID to mentions array
            jids.push(jid); // Add JID to the jids array for action
        });

        // Send the pending requests as a message
        await conn.sendMessage(from, {
            text: participantList,
            mentions: mentions
        });

        // Proceed to approve/reject all requests
        const updateResponse = await conn.groupRequestParticipantsUpdate(from, jids, action);
        console.log(updateResponse); // Log the response for debugging

        // Send a confirmation message
        reply(`Successfully ${action}ed all join requests.`);
    } catch (e) {
        console.error(`Error updating participant requests: ${e.message}`); // Log specific error message
        reply("⚠️ An error occurred while processing the request. Please try again later.");
    }
});
