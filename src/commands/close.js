const { SlashCommandBuilder } = require('@discordjs/builders');

const createEmbed = require('../functions/embed');
const formatId = require('../functions/id');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('close')
		.setDescription('Close current ticket'),

	async execute(client, interaction) {
		const _channelId = await interaction.channelId;
		const ticket = await client.database.Ticket.findOne({ where: {  channelId: _channelId }});

		const { created_by, assigned_to, channelId, messageId, closed } = ticket;

		if (closed) return await interaction.reply({
				content: `Ticket already closed`,
				ephemeral: true
			});

		const channel = await interaction.channel;

		await channel.setName(`🔴 ${formatId(ticket.id)}`);
		await channel.permissionOverwrites.create(channel.guild.roles.everyone, { SEND_MESSAGES: false });

		await ticket.update({ closed: true });

		await interaction.channel.send({ embeds: [createEmbed(ticket)] });
	},
};