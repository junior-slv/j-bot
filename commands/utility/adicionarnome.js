const { SlashCommandBuilder } = require('discord.js');
const userList = require('./userlist');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('adicionarnome')
    .setDescription('Adiciona um nome à lista do sorteio')
    .addStringOption(option =>
      option
        .setName('nome')
        .setDescription('Nome a ser adicionado à lista')
        .setRequired(true)
    ),
  async execute(interaction) {
    const userName = interaction.user.username;

    if (userName === 'zippoowow') { // Substitua 'NomeDoAdmin' pelo nome do administrador real
      const nameToAdd = interaction.options.getString('nome');
      userList.push(nameToAdd);
      await interaction.reply(`O nome "${nameToAdd}" foi adicionado à lista.`);
    } else {
      await interaction.reply('Apenas o administrador pode adicionar nomes à lista.');
    }
  },
};
