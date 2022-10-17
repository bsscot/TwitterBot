/**
 * @file Sample ping command
 * @author ShootaHunnid
 * @since 1.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
	name: "ping",
	execute(message, args) {
		message.channel.send({ content: "Pong." });
	},
};
