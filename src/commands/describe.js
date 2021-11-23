const { SlashCommandBuilder } = require('@discordjs/builders');

const createEmbed = require('../functions/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('describe')
		.setDescription('Describe the ticket in more detail.')
		.addStringOption(option => option.setName('description').setDescription('Detailed explination of ticket').setRequired(true)),

	async execute(client, interaction) {
		const description = await interaction.options.getString('description');

		const _channelId = await interaction.channelId;
		const ticket = await client.database.Ticket.findOne({ where: {  channelId: _channelId }});

		if (ticket.closed) return await interaction.reply({
				content: `Ticket is already closed`,
				ephemeral: true
			});

		await ticket.update({ description });

		await interaction.channel.send({ embeds: [createEmbed(ticket)] });
	},
};