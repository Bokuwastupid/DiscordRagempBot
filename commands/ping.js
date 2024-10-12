import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Повертає затримку бота.'),
    async execute(interaction) {
        const sent = await interaction.reply({ content: 'Пінг...', fetchReply: true });
        await interaction.editReply(`Пінг: ${sent.createdTimestamp - interaction.createdTimestamp}мс`);
    },
};
