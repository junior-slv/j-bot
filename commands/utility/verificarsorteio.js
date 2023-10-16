const { SlashCommandBuilder } = require('discord.js');
const userList = require('./userlist');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('verificarsorteio')
    .setDescription('Verifique a lista de participantes do sorteio'),
  async execute(interaction) {
    if (userList.length === 0) {
      await interaction.reply('A lista de sorteio está vazia.');
    } else {
      const formattedList = userList.map((userName, index) => `${index + 1}. ${userName}`).join('\n');
      const response = `Participantes do sorteio:\n\`\`\`${formattedList}\`\`\``;
      await interaction.reply(response);
    }
  },
};
