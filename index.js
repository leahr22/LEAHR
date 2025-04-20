const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const { token } = require('./config.json');
require('./keep_alive'); // Render için

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events');
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  event(client);
}

client.login(token);
