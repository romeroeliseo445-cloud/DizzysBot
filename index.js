const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();
const { QuickDB } = require('quick.db'); // Updated import for clarity
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});
const db = new QuickDB();
// CHANGE THESE THREE LINES // ← Your values
const SELLER_ROLE_ID = '1470072594303549669';
const TICKET_CATEGORY_ID = '1470073289106788518';
const PREMIUM_ROLE_ID = '1471183765622493358';
const OWNER_ID = '1049050401493753866'; // Your ID
const LOG_CHANNEL_ID = '1471230871100063744'; // Log channel
const GEN_BUTTON_COOLDOWN_MS = 5 * 1000; // 5s anti-spam
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24h
const buttonCooldowns = new Map(); // userID → timestamp
client.once('ready', () => {
  console.log(`Bot is online and ready! Logged in as ${client.user.tag}`);
});
client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith('!')) return;
  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  // ── Panel Commands ──
  if (command === 'panel') {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('DizzyHub')
      .setDescription(
        'Welcome to DizzyHub!\n\n' +
        '• Click below to open a ticket\n' +
        '• Be patient — sellers will answer soon\n\n' +
        '**Rules:**\n' +
        '- No scamming accusations\n' +
        '- Be respectful\n' +
        '- Tickets only for purchases\n\n' +
        '**Links / Contact:**\n' +
        '• Email: yaboidizzy67@gmail.com\n' +
        '• Contact: <@&' + SELLER_ROLE_ID + '>'
      )
      .setFooter({ text: 'DizzyHubs bot • From Dizzy' });
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('create_ticket')
          .setLabel('Open Purchase Ticket')
          .setStyle(ButtonStyle.Success)
          .setEmoji('💰')
      );
    await message.channel.send({ embeds: [embed], components: [row] });
    await message.reply({ content: 'Panel sent!', ephemeral: true });
  }
 if (command === 'prices') {
  const embed = new EmbedBuilder()
    .setColor('#FFD700')
    .setTitle('💰 Prices & Bundles')
    .setDescription(`\
🏙️ THA BRONX 3 — ACCOUNTS & MEMBERSHIPS
💠 $5 — BASIC
• 5 Cars | $990k Clean | $550k Dirty
• 1 Watch
• Full Gun Safe
💠 $10 — PREMIUM
• 25 Cars | $990k Clean & Dirty
• 5 Watches
• Full Gun Safe + Backpack
💠 $25 — EXOTIC
• ALL Cars | $1.6m Clean, Dirty & Bank
• ALL Watches
• Full Safe + Backpack + Trunk
• ALL Clothing
• Looting Pass
• Extra Wallet Pass
🔥 PREMIUM MEMBERSHIPS (Dupes or Money)
GUNS:
• 7 Days — $5
• 30 Days — $10
• 60 Days — $15
• LIFETIME — $25
MONEY:
• 7 Days — $6.50
• 30 Days — $7.50
• 60 Days — $10.50
• LIFETIME — $25
🏙️ PHILLY STREETS 2
💰 MONEY DROPS
• $1 → $5 MILL
• $2 → $10 MILL
• $3 → $15 MILL
• $4 → $20 MILL
• $5 → $25 MILL
💠 $5 — BASIC
• 5 Cars | $5.5 MILL Clean & Dirty
• 5 Outfits
• 1 Watch
💠 $10 — PREMIUM
• 10 Cars | $15 MILL Clean & Dirty
• 10 Outfits
• 5 Watches
💠 $25 — EXOTIC
• ALL Cars | MAX Clean & Dirty
• EVERY Outfit & Watch
• Double Wallet Pass
• Looting Pass
🚧 CENTRAL STREETS — COMING SOON 🚧
📩 DM FOR MORE INFO / ORDERS`)
    .setFooter({ text: 'Prices subject to change • DM for custom deals' });
  await message.channel.send({ embeds: [embed] });
  await message.reply({ content: 'Prices posted!', ephemeral: true });
}
  if (command === 'executors') {
  const embed = new EmbedBuilder()
    .setColor('#FF4500')
    .setTitle('🔥 Executors List – Best Tools for Roblox Scripting')
    .setDescription(`\
⚠️ **IMPORTANT DISCLAIMER**
Executors violate Roblox TOS and can lead to account bans, malware, or keyloggers.
Use at your own risk! Research thoroughly, use antivirus, and never share personal info.
We are NOT responsible for any issues. Download only from trusted sources.

**PC/WINDOWS**

**Paid**
• **Potassium** - sUNC 100% / UNC 100% → [Link](https://bloxproducts.com/r/weao#Potassium)
• **Seliware** - sUNC 100% / UNC 98% → [Link](https://robloxcheatz.com/product?id=51c9587f-4794-46ef-b6bf-2bd9f13c17d2&ref=weao)
• **Volcano** - sUNC 97% / UNC 98% → [Link](https://gckeys.cc/product?slug=volcano-executor&ref=weao)
• **Volt** - sUNC 100% / UNC 98% → [Link](https://bloxproducts.com/r/weao#Volt)
• **Wave** - sUNC 100% / UNC 99% → [Link](https://bloxproducts.com/?affiliate_key=weao#Wave)
• **Cryptic** - sUNC 94% / UNC 97% → [Link](https://bloxproducts.com/?affiliate_key=weao#Cryptic)

**Free**
• **Velocity** - sUNC 94% / UNC 99% → [Link](https://realvelocity.xyz/)
• **Xeno** - sUNC 27% / UNC 82% → [Link](https://www.xeno.onl/)

**iOS/ANDROID**

**Free**
• **Delta** - sUNC 100% / UNC 99% → [Official Site](https://delta-executor.com/) (or check deltaexploits.gg for updates)
• **Codex** - sUNC 96% / UNC 98% → [Link](https://robloxcheatz.com/affiliate/weao) or [codex.lol](https://www.codex.lol/)

**MAC**

**Free**
• **Hydrogen** - sUNC 90% / UNC 99% → [Link](https://hydrogenmacos.selly.store/)

**Paid**
• **MacSploit** - sUNC 100% / UNC 99% → [Link](https://bloxproducts.com/?affiliate_key=weao#MacSploit)

I HIGHLY RECOMMEND PAID EXECUTORS FOR BETTER STABILITY & SUPPORT.
VOLCANO, SELIWARE, VOLT, AND POTASSIUM WORK GREAT.

**Follow for updates:** [TikTok](https://www.tiktok.com/@officialplug100?_r=1&_t=ZT-93mkMBzXUZq)
**Questions?** Contact <@&${SELLER_ROLE_ID}> or DM @Dizzy`)
    .setFooter({ text: 'Executors stats can change • Always verify links • BE CAREFUL' })
    .setTimestamp();

  await message.channel.send({ embeds: [embed] });
  await message.reply({ content: 'Executors list posted!', ephemeral: true });
}
  // ── Stock Management ──
  if (command === 'uploadstock' || command === 'addstock') {
    if (!message.member.permissions.has('Administrator')) return message.reply({ content: 'Admins only.', ephemeral: true });
    if (args.length < 2) return message.reply('Usage: !uploadstock <free|premium> <account1> <account2> ...');
    const type = args[0].toLowerCase();
    if (!['free', 'premium'].includes(type)) return message.reply('Type must be "free" or "premium"');
    const accounts = args.slice(1);
    let current = await db.get(`stock_${type}`) || [];
    current.push(...accounts);
    await db.set(`stock_${type}`, current);
    await message.reply(`Uploaded **${accounts.length}** ${type} account(s). Total now: **${current.length}**`);
    const logChannel = client.channels.cache.get(LOG_CHANNEL_ID);
    if (logChannel) {
      logChannel.send(`**Stock Upload** by ${message.author.tag} (${message.author.id})\nType: ${type}\nAdded: ${accounts.length}\nNew total: ${current.length}\nAccounts added: ${accounts.join(', ')}`);
    }
  }
  if (command === 'removestock') {
    if (!message.member.permissions.has('Administrator')) return message.reply({ content: 'Ad
