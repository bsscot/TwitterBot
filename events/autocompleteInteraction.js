/**
 * @file Autocomplete Interaction Handler
 * @author ShootaHunnid
 * @since 3.3.0
 * @version 3.3.1
 */
module.exports = {
	name: "interactionCreate",

	/**
	 * @description Executes when an interaction is created and handle it.
	 * @author ShootaHunnid
	 * @param {import('discord.js').AutocompleteInteraction & { client: import('../typings').Client }} interaction The interaction which was created
	 */

	async execute(interaction) {
		const { client } = interaction;
		if (!interaction.isAutocomplete()) return;
		const request = client.autocompleteInteractions.get(
			interaction.commandName
		);
		if (!request) return;
		try {
			await request.execute(interaction);
		} catch (err) {
			console.error(err);
		}

		return;
	},
};
