/**
 * @file Select Menu Interaction Handler
 * @author ShootaHunnid
 * @since 3.0.0
 * @version 3.3.0
 */

module.exports = {
	name: "interactionCreate",

	/**
	 * @description Executes when an interaction is created and handle it.
	 * @author ShootaHunnid
	 * @param {import('discord.js').SelectMenuInteraction & { client: import('../typings').Client }} interaction The interaction which was created
	 */

	async execute(interaction) {
		const { client } = interaction;
		if (!interaction.isSelectMenu()) return;

		const command = client.selectCommands.get(interaction.customId);
		if (!command) {
			await require("../messages/defaultSelectError").execute(interaction);
			return;
		}
		try {
			await command.execute(interaction);
			return;
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "There was an issue while executing that select menu option!",
				ephemeral: true,
			});
			return;
		}
	},
};
