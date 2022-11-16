const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, '/commands'); // Get path to the commands
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // Filters out files and only grab files that have .js

for (const file of commandFiles) { // Grabs files in the commands folder
	const filePath = path.join(commandsPath, file); // Path to the file
	const command = require(filePath); // Loads the file
	client.commands.set(command.data.name, command); // Sets the slash command to the bot
}

const { clientId, guildId } = require('../config/config.json');
const { REST, Routes } = require('discord.js');

const commands = []; 

for (const file of commandFiles) {
	const command = require(`./commands/${file}`); 
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.token);

(async () => {
	try {
        setTimeout(function() {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);
        }, 500);
        
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();


client.on("interactionCreate", async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.login(process.env.token);