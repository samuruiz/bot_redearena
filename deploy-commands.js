const { REST, Routes } = require('discord.js')
const {  clientId, guildId, token} = require('./config.json')
const fs = require('node:fs')

const commands = []

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}
const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Iniciando ${commands.length}  (/) comandos.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Sucesso ao carregar ${data.length}  (/) comandos.`);
	} catch (error) {
		console.error(error);
	}
})();