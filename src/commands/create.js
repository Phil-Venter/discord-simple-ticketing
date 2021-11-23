const { SlashCommandBuilder } = require('@discordjs/builders');

const createEmbed = require('../functions/embed');
const formatId = require('../functions/id');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create')
		.setDescription('Create a new ticket, all data can be set from the onset.')
		.addStringOption(option => option.setName('name').setDescription('High level overview of the ticket').setRequired(true))
		.addStringOption(option => option.setName('description').setDescription('Detailed explination of ticket'))
		.addStringOption(option => option.setName('requested_by').setDescription('The party who requested the ticket'))
		.addUserOption(option => option.setName('assigned_to').setDescription('Server member to assign the ticket to')),

	async execute(client, interaction) {
		const name = await interaction.options.getString('name');
		const description = await interaction.options.getString('description') ?? null;
		const requested_by = await interaction.options.getString('requested_by') ?? null;
		const created_by = await interaction.user.id;
		const assigned_to = await interaction.options.getUser('assigned_to') ?? null;

		const ticket = await client.database.Ticket.create({ name, description, requested_by, created_by, assigned_to });

		if (!ticket) return await interaction.reply({
			content: `FAILED creating ticket`,
			ephemeral: true
		});

		const channel = await interaction.guild.channels.create(`🟢 ${formatId(ticket.id)}`, { type: 'GUILD_TEXT' });
		const message = await channel.send({ embeds: [ createEmbed(ticket) ] });

		await ticket.update({ channelId: channel.id });

		await interaction.reply({
			content: `CREATED <#${channel.id}>`,
			ephemeral: true
		});
	}
};