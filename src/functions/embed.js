const { MessageEmbed } = require('discord.js');

module.exports = (ticket) => {
	const { name, description, requested_by, assigned_to, created_by, closed } = ticket;

	return new MessageEmbed()
		.setTitle(name + (closed ? ' [CLOSED]' : ''))
		.setDescription(description ?? '')
		.addFields(
			{ name: 'Requested by', value: requested_by ? requested_by : 'none' },
			{ name: 'Assigned to', value: assigned_to ? `<@${assigned_to}>` : 'none' },
			{ name: 'Created by', value: `<@${created_by}>` },
		);
};