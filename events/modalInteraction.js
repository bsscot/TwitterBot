/**
 * @file Modal Interaction Handler
 * @author ShootaHunnid
 * @since 3.2.0
 * @version 3.3.0
 */

const { InteractionType } = require("discord-api-types/v10");

module.exports = {
	name: "interactionCreate",

	/**
	 * @description Executes when an interaction is created and handle it.
	 * @author ShootaHunnid
	 * @param {import('discord.js').Interaction & { client: import('../typings').Client }} interaction The interaction which was created
	 */

	async execute(interaction) {
		const { client } = interaction;
		if (interaction.type !== InteractionType.ModalSubmit) return;

		const command = client.modalCommands.get(interaction.customId);
		if (!command) {
			await require("../messages/defaultModalError").execute(interaction);
			return;
		}

		try {
			await command.execute(interaction);
			return;
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "There was an issue while understanding this modal!",
				ephemeral: true,
			});
			return;
		}
	},
};
