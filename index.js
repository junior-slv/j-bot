const fs = require('fs');
const path = require('path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
const http = require('http'); // Add the 'http' module

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

client.once(Events.ClientReady, () => {
  console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'Você não tem permissão pra executar esse comando!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'Você não tem permissão pra executar esse comando!', ephemeral: true });
    }
  }
});

client.login(process.env.TOKEN);

// HTTP server to keep the program active
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, this is your Node.js server running on port 3000.\n');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server is running on http://127.0.0.1:3000/');
});

// Keep the process running with a loop
setInterval(() => {
  // This code runs in a loop, so you can add any additional logic or checks here
  console.log('Loop is running...');
}, 10000); // Adjust the interval as needed
