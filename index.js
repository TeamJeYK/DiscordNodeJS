const { Client, GatewayIntentBits, Collection } = require('discord.js');
const slash = require('./src/slashCommands/applySlash.js')

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.once("ready", (c) => {
	setTimeout(function() {
        console.log(`\nReady! Logged in as ${c.user.tag}`);
    }, 600)
});

client.on("messageCreate", async (message) => {
    if (message.author == client.bot) return;

    let prefix = "--";

    if (message.content.toLowerCase().startsWith(`${prefix}ping`)) {
        message.reply("***Pong!***");
    }
})

client.login(process.env.token);