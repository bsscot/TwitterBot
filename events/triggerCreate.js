/**
 * @file Main trigger handler file.
 * @author ShootaHunnid
 * @since 2.0.0
 * @version 3.3.0
 */

module.exports = {
	name: "messageCreate",

	/**
	 * @description Executes when a message is created and handle it.
	 * @author ShootaHunnid
	 * @param {import('discord.js').Message & { client: import('../typings').Client }} message The message which was created.
	 */

	async execute(message) {
		/**
		 * @description The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
		 */

		const args = message.content.split(/ +/);
		if (message.author.bot) return;
		/**
		 * Checks if the message has a trigger.
		 * @type {Boolean}
		 * */

		let triggered = false;

		message.client.triggers.every((trigger) => {
			if (triggered) return false;

			trigger.name.every(async (name) => {
				if (triggered) return false;
				if (message.content.includes(name)) {
					try {
						trigger.execute(message, args);
					} catch (error) {
						console.error(error);

						message.reply({
							content: "there was an error trying to execute that trigger!",
						});
					}
					triggered = true;
					return false;
				}
			});
		});
	},
};
