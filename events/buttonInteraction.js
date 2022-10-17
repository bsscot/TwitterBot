/**
 * @file Button Interaction Handler
 * @author ShootaHunnid
 * @since 3.0.0
 * @version 3.3.0
 */

const { InteractionType, ComponentType } = require("discord-api-types/v10");

module.exports = {
	name: "interactionCreate",

	/**
	 * @description Executes when an interaction is created and handle it.
	 * @author ShootaHunnid
	 * @param {import('discord.js').ButtonInteraction & { client: import('../typings').Client }} interaction The interaction which was created
	 */

	async execute(interaction) {
		const { client } = interaction;
		if (interaction.type !== InteractionType.MessageComponent) return;
		if (interaction.componentType !== ComponentType.Button) return;
		const command = client.buttonCommands.get(interaction.customId);

		if (!command) {
			await require("../messages/defaultButtonError").execute(interaction);
			return;
		}

		try {
			await command.execute(interaction);
			return;
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "There was an issue while executing that button!",
				ephemeral: true,
			});
			return;
		}
	},
};
