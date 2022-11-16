const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies back saying Pong!'),
	async execute(interaction) {
		await interaction.reply("Pong!");
	},
};