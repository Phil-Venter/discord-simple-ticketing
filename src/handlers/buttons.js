const { Collection } = require('discord.js');

const fs = require('fs');

module.exports = (client) => {
	client.handleButtons = async (buttonFiles) => {
		client.buttons = new Collection();

		for (const file of buttonFiles) {
			const button = require(file);
			client.buttons.set(button.name, button);
		}
	};
};