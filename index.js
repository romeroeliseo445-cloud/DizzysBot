const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionFlagsBits } = require('discord.js');
require('dotenv').config();
const { JSONFile, Low } = require('lowdb');
const fetch = require('node-fetch');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

// Lowdb setup (stores everything in db.json file on Render)
const adapter = new JSONFile('db.json');
const db = new Low(adapter);
await db.read();
db.data = db.data || {
  stock_free: [],
  stock_premium: [],
  cooldowns: {}, // userID_type → timestamp
  gen_logs: [] // array of { time, user, type, account }
};
await db.write();

// CHANGE THESE // ← Your values
const SELLER_ROLE_ID = '1470072594303549669';
const TICKET_CATEGORY_ID = '1470073289106788518';
const PREMIUM_ROLE_ID = '1471183765622493358';
const LOG_CHANNEL_ID = 'YOUR_LOG_CHANNEL_ID_HERE'; // Replace with real ID

const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours
const GEN_BUTTON_COOLDOWN_MS = 5 * 1000; // 5 seconds anti-spam
const buttonCooldowns = new Map();

client.once('ready', () => {
  console.log('Bot is online and ready!');
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith('!')) return;

  // !panel (unchanged)
  if (message.content === '!panel') {
    // ... your original panel code ...
  }

  // !prices (unchanged)
  if (message.content === '!prices') {
    // ... your original prices code ...
  }

  // !executors (unchanged)
  if (message.content === '!executors') {
    // ... your original executors code ...
  }

  // !addstock (adapted to lowdb)
  if (message.content.startsWith('!addstock')) {
    if (!message.member.permissions.has('Administrator')) return message.reply({ content: 'Only admins.', ephemeral: true });
    const args = message.content.split(' ').slice(1);
    if (args.length < 2) return message.reply('Usage: !addstock <free|premium> <accounts...>');
    const type = args[0].toLowerCase();
    if (!['free', 'premium'].includes(type)) return message.reply('Type must be free or premium');
    const accounts = args.slice(1);
    const key = type === 'free' ? 'stock_free' : 'stock_premium';
    db.data[key] = db.data[key] || [];
    db.data[key].push(...accounts);
    await db.write();
    return message.reply(`Added ${accounts.length} ${type} account(s). Total now: ${db.data[key].length}`);
  }

  // !uploadstock (adapted to lowdb)
  if (message.content.startsWith('!uploadstock')) {
    if (!message.member.permissions.has('Administrator')) return message.reply({ content: 'Only admins.', ephemeral: true });
    const args = message.content.split(' ').slice(1);
    if (args.length < 1) return message.reply('Usage: !uploadstock <free|premium> (attach .txt)');
    const type = args[0].toLowerCase();
    if (!['free', 'premium'].includes(type)) return message.reply('Type must be free or premium');
    if (message.attachments.size === 0) return message.reply('Attach a .txt file.');
    const attachment = message.attachments.first();
    if (!attachment.contentType.startsWith('text/')) return message.reply('File must be .txt.');
    try {
      const response = await fetch(attachment.url);
      const text = await response.text();
      const accounts = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (accounts.length === 0) return message.reply('File empty.');
      const key = type === 'free' ? 'stock_free' : 'stock_premium';
      db.data[key] = db.data[key] || [];
      db.data[key].push(...accounts);
      await db.write();
      return message.reply(`Added ${accounts.length} ${type} account(s) from file. Total now: ${db.data[key].length}`);
    } catch (err) {
      console.error(err);
      return message.reply('Error reading file.');
    }
  }

  // !stock (adapted)
  if (message.content === '!stock' && message.member.permissions.has('Administrator')) {
    const free = db.data.stock_free || [];
    const premium = db.data.stock_premium || [];
    message.reply(`**Stock Counts:**\nFree: ${free.length}\nPremium: ${premium.length}`);
  }

  // !stocklist (adapted)
  if (message.content === '!stocklist' && message.member.permissions.has('Administrator')) {
    const free = db.data.stock_free || [];
    const premium = db.data.stock_premium || [];
    let reply = `**Free Stock (${free.length}):**\n${free.join('\n') || 'Empty'}\n\n**Premium Stock (${premium.length}):**\n${premium.join('\n') || 'Empty'}`;
    message.author.send(reply).catch(() => message.reply('Could not DM you.'));
    message.reply({ content: 'Stock list sent to DMs!', ephemeral: true });
  }

  // !genpanel (with auto-disable)
  if (message.content === '!genpanel') {
    if (!message.member.permissions.has('Administrator')) return message.reply({ content: 'Only admins.', ephemeral: true });
    const freeStock = db.data.stock_free || [];
    const premiumStock = db.data.stock_premium || [];

    const embed = new EmbedBuilder()
      .setColor('#00BFFF')
      .setTitle('Alt Generator')
      .setDescription('Get your alts!\nFree: 24h CD\nPremium: VIP + 24h CD');

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('free_altgen')
          .setLabel('Free AltGen')
          .setStyle(ButtonStyle.Primary)
          .setEmoji('🆓')
          .setDisabled(freeStock.length === 0),
        new ButtonBuilder()
          .setCustomId('premium_altgen')
          .setLabel('AltGen Premium')
          .setStyle(ButtonStyle.Success)
          .setEmoji('💎')
          .setDisabled(premiumStock.length === 0)
      );

    await message.channel.send({ embeds: [embed], components: [row] });
    await message.reply({ content: 'Panel posted!', ephemeral: true });
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;

  // Ticket create (unchanged)
  if (interaction.customId === 'create_ticket') {
    // ... your original code ...
  }

  if (interaction.customId === 'close_ticket') {
    // ... your original code ...
  }

  const userId = interaction.user.id;
  let type = null;
  let label = '';
  if (interaction.customId === 'free_altgen') {
    type = 'free';
    label = 'Free AltGen';
  } else if (interaction.customId === 'premium_altgen') {
    type = 'premium';
    label = 'AltGen Premium';
    if (!interaction.member.roles.cache.has(PREMIUM_ROLE_ID)) {
      return interaction.reply({ content: 'Premium only!', ephemeral: true });
    }
  }

  if (type) {
    await interaction.deferReply({ ephemeral: true });

    // Anti-spam cooldown
    const now = Date.now();
    const lastClick = buttonCooldowns.get(userId) || 0;
    if (now - lastClick < 5000) {
      const remaining = 5000 - (now - lastClick);
      return interaction.editReply({ content: `Wait ${Math.ceil(remaining / 1000)}s.` });
    }
    buttonCooldowns.set(userId, now);
    setTimeout(() => buttonCooldowns.delete(userId), 5000);

    // 24h cooldown
    const cooldownKey = `cooldown_${userId}_${type}`;
    const lastUsed = db.data.cooldowns[cooldownKey] || 0;
    if (now - lastUsed < COOLDOWN_MS) {
      const remaining = COOLDOWN_MS - (now - lastUsed);
      const h = Math.floor(remaining / 3600000);
      const m = Math.floor((remaining % 3600000) / 60000);
      return interaction.editReply({ content: `Cooldown: ~${h}h ${m}m.` });
    }

    const stockKey = type === 'free' ? 'stock_free' : 'stock_premium';
    const accounts = db.data[stockKey] || [];
    if (accounts.length === 0) return interaction.editReply({ content: 'Out of stock!' });

    const account = accounts.shift();
    db.data[stockKey] = accounts;
    db.data.cooldowns[cooldownKey] = now;
    await db.write();

    try {
      await interaction.user.send(`**${label}** account:\n\`\`\`\n${account}\n\`\`\``);

      // Log to channel
      const logChannel = interaction.guild.channels.cache.get(LOG_CHANNEL_ID);
      if (logChannel) {
        logChannel.send(`**${label}** by ${interaction.user.tag}\nTime: ${new Date().toLocaleString()}\nAccount: \`\`\`${account}\`\`\``);
      }

      await interaction.editReply({ content: 'Sent to DMs!' });
    } catch (err) {
      await interaction.editReply({ content: 'Cannot DM — open DMs.' });
    }
  }
});

console.log('Token from .env:', process.env.TOKEN || 'MISSING/EMPTY');
client.login(process.env.TOKEN);
