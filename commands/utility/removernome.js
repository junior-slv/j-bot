const { SlashCommandBuilder } = require('discord.js');
const userList = require('./userlist');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removernome')
    .setDescription('Remove um nome da lista do sorteio')
    .addStringOption(option =>
      option
        .setName('nome')
        .setDescription('Nome a ser removido da lista')
        .setRequired(true)
    ),
  async execute(interaction) {
    const userName = interaction.user.username;

    if (userName === 'zippoowow') { // Substitua 'NomeDoAdmin' pelo nome do administrador real
      const nameToRemove = interaction.options.getString('nome');
      const index = userList.indexOf(nameToRemove);
      if (index !== -1) {
        userList.splice(index, 1);
        await interaction.reply(`O nome "${nameToRemove}" foi removido da lista.`);
      } else {
        await interaction.reply(`O nome "${nameToRemove}" não foi encontrado na lista.`);
      }
    } else {
      await interaction.reply('Apenas o administrador pode remover nomes da lista.');
    }
  },
};
