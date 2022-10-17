/**
 * @file Live command reloader
 * @author ShootaHunnid
 * @since 1.0.0
 * @version 3.2.2
 */

const fs = require("fs");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
	name: "reload",
	description: "Reloads a command",
	args: true,
	ownerOnly: true,

	execute(message, args) {
		/**
		 * @type {String}
		 * @description Name of the specifiied command in lowercase.
		 */

		const commandName = args[0].toLowerCase();

		const command =
			message.client.commands.get(commandName) ||
			message.client.commands.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
			);
		if (!command) {
			return message.channel.send({
				content: `There is no command with name or alias \`${commandName}\`, ${message.author}!`,
			});
		}

		/**
		 * @type {String[]}
		 * @description Array of all command categories aka folders.
		 */

		const commandFolders = fs.readdirSync("./commands");

		/**
		 * @type {String}
		 * @description Name of the command category/folder of the specified command.
		 */

		const folderName = commandFolders.find((folder) =>
			fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`)
		);

		delete require.cache[
			require.resolve(`../${folderName}/${command.name}.js`)
		];

		try {
			/**
			 * @type {import('../../typings').LegacyCommand}
			 * @description The new command (code fetch)
			 */

			const newCommand = require(`../${folderName}/${command.name}.js`);

			message.client.commands.set(newCommand.name, newCommand);

			message.channel.send({
				content: `Command \`${newCommand.name}\` was reloaded!`,
			});
		} catch (error) {

			console.error(error);
			message.channel.send({
				content: `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``,
			});
		}
	},
};
