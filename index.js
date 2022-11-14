const { Client, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.once("ready", (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on("messageCreate", async (message) => {
    if (message.author == client.bot) return;

    let prefix = "--"

    if (message.content.toLowerCase().startsWith(`${prefix}ping`)) {
        message.reply("***Pong!***")
    }
})

client.login(process.env.token);