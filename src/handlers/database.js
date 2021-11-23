const Sequelize = require('sequelize');

const fs = require('fs');

module.exports = (client) => {
	client.handleDatabase = async (databaseFiles, config) => {
		const { database, dialect, host, password, storage, username } = config;

		client.sequelize = new Sequelize(database, username, password, { host, dialect, storage });
		client.database = {};

		for (const file of databaseFiles) {
			const database = require(file);
			client.database[database.name] = await database.init(client);
		}
	};
};