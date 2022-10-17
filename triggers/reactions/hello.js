/**
 * @file Sample Trigger command.
 * @author ShootaHunnid
 * @since 2.0.0
 * @version 3.2.2
 */

// For now, the only available property is name array. Not making the name array will result in an error.

/**
 * @type {import('../../typings').TriggerCommand}
 */
module.exports = {
	name: ["welcome", "rug"],

	execute(message, args) {
		message.channel.send({
			content: "Set this trigger response",
		});
	},
};
