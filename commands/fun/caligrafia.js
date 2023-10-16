const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('caligrafia')
		.setDescription('isso é um TESTE!'),
	async execute(interaction) {
		return interaction.reply('Vê se não erra hein https://cdn.triviapw.com.br/images/pw/ordem_letras.jpg');
	},
};