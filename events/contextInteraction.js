/**
 * @file Context Interaction Handler
 * @author Krish Garg & ShootaHunnid
 * @since 3.0.0
 * @version 3.3.0
 */

module.exports = {
	name: "interactionCreate",

	/**
	 * @description Executes when an interaction is created and handle it.
	 * @author ShootaHunnid
	 * @param {import('discord.js').ContextMenuCommandInteraction & { client: import('../typings').Client }} interaction The interaction which was created
	 */

	execute: async (interaction) => {
		const { client } = interaction;

		if (!interaction.isContextMenuCommand()) return;

		if (interaction.isUserContextMenuCommand()) {
			const command = client.contextCommands.get(
				"USER " + interaction.commandName
			);

			try {
				await command.execute(interaction);
				return;
			} catch (err) {
				console.error(err);
				await interaction.reply({
					content: "There was an issue while executing that context command!",
					ephemeral: true,
				});
				return;
			}
		}
		else if (interaction.isMessageContextMenuCommand()) {
			const command = client.contextCommands.get(
				"MESSAGE " + interaction.commandName
			);

			try {
				await command.execute(interaction);
				return;
			} catch (err) {
				console.error(err);
				await interaction.reply({
					content: "There was an issue while executing that context command!",
					ephemeral: true,
				});
				return;
			}
		}

		else {
			return console.log(
				"Something weird happening in context menu. Received a context menu of unknown type."
			);
		}
	},
};
