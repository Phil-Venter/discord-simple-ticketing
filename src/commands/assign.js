const { SlashCommandBuilder } = require('@discordjs/builders');

const createEmbed = require('../functions/embed');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('assign')
		.setDescription('Asign user to ticket.')
		.addUserOption(option => option.setName('assigned_to').setDescription('Server member to assign the ticket to').setRequired(true)),

	async execute(client, interaction) {
		const _channelId = await interaction.channelId;
		const assigned_to = interaction.options.getUser('assigned_to').id;

		const ticket = await client.database.Ticket.findOne({ where: {  channelId: _channelId }});

		if (ticket.closed) return await interaction.reply({
				content: `Ticket is already closed`,
				ephemeral: true
			});

		await ticket.update({ assigned_to });

		await interaction.channel.send({ embeds: [createEmbed(ticket)] });
	},
};