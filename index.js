const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[AVISO] O comando em ${filePath} não possui uma propriedade obrigatória de "data" ou "execute".`);
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`Nenhum comando correspondente a ${interaction.commandName} foi encontrado.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
        await interaction.reply({ content: `Erro ao executar o comando!`, ephemeral: true})
	}
});

client.once(Events.ClientReady, c => {
	const guild = client.guilds.cache.first()
    console.log(`Estou online no servidor ${guild.name} como usuario ${client.user.tag}`)
});

client.login(token);