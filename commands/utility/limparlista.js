const { SlashCommandBuilder } = require('discord.js');
const userList = require('./userlist');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('limparlista')
    .setDescription('Limpa a lista de nomes para redefinir a singularidade')
    .setDefaultPermission(false), // Define permissão como false para que apenas administradores possam usar este comando
  async execute(interaction) {
    const userName = interaction.user.username;

    if (userName === 'zippoowow') { // Substitua 'NomeDoAdmin' pelo nome do administrador real
      userList.length = 0; // Limpa a lista de nomes
      await interaction.reply('A lista de nomes foi limpa. Os usuários podem adicionar seus nomes novamente.');
    } else {
      await interaction.reply('Apenas o administrador pode limpar a lista de nomes.');
    }
  },
};
