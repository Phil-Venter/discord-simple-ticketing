const Sequelize = require('sequelize');

const name = 'Ticket';

module.exports = {
	name,
	init: async (client) => {
		const table = client.sequelize.define(name, {
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			description: Sequelize.TEXT,
			requested_by: Sequelize.STRING,
			created_by: Sequelize.STRING,
			assigned_to: Sequelize.STRING,
			channelId: Sequelize.STRING,
			closed: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
				allowNull: false,
			}
		});

		table.sync();

		return table;
	}
};