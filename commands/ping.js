const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Retorna o ping do bot!'),
    async execute(interaction){
        const embedPing = new EmbedBuilder()
        .setColor('DarkRed')
        .setDescription(`Olá eu estou com **${interaction.client.ws.ping} ms**`)

		await interaction.reply({ embeds : [embedPing], ephemeral : true})
    }
}