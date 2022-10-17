/**
 * @file Sample autocomplete interaction
 * @author ShootaHunnid
 * @since 3.3.0
 * @version 3.3.0
 */

/**
 * @type {import("../../../typings").AutocompleteInteraction}
 */
module.exports = {
	name: "sample",

	async execute(interaction) {
		const focusedValue = interaction.options.getFocused();
		const choices = ["welcome", "rug"];
		const filtered = choices.filter((choice) =>
			choice.startsWith(focusedValue)
		);
		await interaction.respond(
			filtered.map((choice) => ({ name: choice, value: choice }))
		);

		return;
	},
};
