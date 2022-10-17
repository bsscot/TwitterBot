/**
 * @file Sample Message Context Menu interaction
 * @author ShootaHunnid
 * @since 3.0.0
 * @version 3.2.2
 */

/**
 * @type {import('../../../typings').ContextInteractionCommand}
 */
module.exports = {
	data: {
		name: "sample",
		type: 3,
	},

	async execute(interaction) {
		await interaction.reply({
			content: "I am a sample message context menu.",
		});
		return;
	},
};
