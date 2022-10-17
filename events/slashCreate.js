/**
 * @file Slash Command Interaction Handler
 * @author ShootaHunnid
 * @since 3.0.0
 * @version 3.3.0
 */

module.exports = {
	name: "interactionCreate",

	/**
	 * @description Executes when an interaction is created and handle it.
	 * @author ShootaHunnid
	 * @param {import('discord.js').CommandInteraction & { client: import('../typings').Client }} interaction The interaction which was created
	 */

	async execute(interaction) {
		const { client } = interaction;
		if (!interaction.isChatInputCommand()) return;

		const command = client.slashCommands.get(interaction.commandName);
		if (!command) return;
		try {
			await command.execute(interaction);
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "There was an issue while executing that command!",
				ephemeral: true,
			});
		}
	},
};
