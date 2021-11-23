const { ActivityTypes } = require('discord.js');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		client.user.setPresence({ activities: [{ name: 'ticket demands.', type: 'LISTENING' }], status: 'dnd' });
	}
}