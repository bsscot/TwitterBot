/**
 * @file Sample help command with slash command.
 * @author ShootaHunnid
 * @since 3.0.0
 * @version 3.3.0
 */

// Deconstructed the constants we need in this file.

const { EmbedBuilder, SlashCommandBuilder, FormattingPatterns } = require("discord.js");
const { User } = require("../../../utils/users")

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("twitter_raid")
		.setDescription(
			"List all the current raids available!"
		),

	async execute(interaction) {
		/**
		 * @type {string}
		 * @description user string in database
		 */
		const user_string = `${interaction.guildId}`+"_"+`${interaction.member.user.id}`;

		const userData = await User.findOne({id: `${user_string}`}) || new User({id: `${user_string}`});
		userData.balance = userData.balance + 100;
		userData.save();

		/**
		 * @type {EmbedBuilder}
		 * @description Help command's embed
		 */		
		const raidEmbed = new EmbedBuilder()
            .setColor("#11806A")
			.setTitle("Current Twitter Raids:")
			.setDescription(`${userData.balance}`);


		await interaction.reply({
			embeds: [raidEmbed],
		});
	},
};
