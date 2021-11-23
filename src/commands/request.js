const { SlashCommandBuilder } = require('@discordjs/builders');

const createEmbed = require('../functions/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('request')
		.setDescription('Update the requester of the ticket.')
		.addStringOption(option => option.setName('requested_by').setDescription('The party who requested the ticket').setRequired(true)),

	async execute(client, interaction) {
		const requested_by = await interaction.options.getString('requested_by');

		const _channelId = await interaction.channelId;
		const ticket = await client.database.Ticket.findOne({ where: {  channelId: _channelId }});

		if (ticket.closed) return await interaction.reply({
				content: `Ticket is already closed`,
				ephemeral: true
			});

		await ticket.update({ requested_by });

		await interaction.channel.send({ embeds: [createEmbed(ticket)] });
	},
};