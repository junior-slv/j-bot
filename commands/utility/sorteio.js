const { SlashCommandBuilder } = require('discord.js');
const userList = require('./userlist');

// Defina um objeto para rastrear o último uso do comando por usuário
const lastCommandUsage = {};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sorteio')
    .setDescription('Adquira sua entrada pro sorteio ativo')
    .addStringOption(option =>
      option
        .setName('nome')
        .setDescription('Seu nome para o sorteio')
        .setRequired(true)
    ),
  async execute(interaction) {
    // Obtém o ID da sala chamada "sorteio"
    const sorteioChannelId = '1163552488746668102'; // Substitua pelo ID da sala real

    // Verifica se a interação ocorre na sala correta
    if (interaction.channelId !== sorteioChannelId) {
      await interaction.reply('Este comando só pode ser usado na sala de sorteio.');
      return;
    }

    const userName = interaction.options.getString('nome'); // Obtém o nome inserido como opção

    // Verifica se o usuário usou o comando nas últimas 1 hora
    if (lastCommandUsage[interaction.user.id] && Date.now() - lastCommandUsage[interaction.user.id] < 60 * 60 * 1000) {
      await interaction.reply(`Você já usou o comando nas últimas 1 hora, ${userName}!`);
    } else if (userList.includes(userName)) {
      await interaction.reply(`O nome '${userName}' já está na lista do sorteio.`);
    } else {
      lastCommandUsage[interaction.user.id] = Date.now();
      userList.push(userName);
      await interaction.reply(`Você foi adicionado à lista do sorteio com o nome: ${userName}!`);
    }
  },
};
