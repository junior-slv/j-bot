const { SlashCommandBuilder } = require('discord.js');
const userList = require('./userlist');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sortear')
    .setDescription('Sortear um vencedor do sorteio')
    .setDefaultPermission(false), // Define permissões padrão como false
  async execute(interaction) {
    if (interaction.member.permissions.has('Administrador')) {
      if (userList.length === 0) {
        await interaction.reply('A lista de sorteio está vazia.');
      } else {
        const winnerIndex = Math.floor(Math.random() * userList.length);
        const winner = userList[winnerIndex];
        await interaction.reply(`O vencedor do sorteio é: ${winner} 🥳🥳🥳!`);
      }
    } else {
      await interaction.reply('Você não tem permissão para usar este comando.');
    }
  },
};
