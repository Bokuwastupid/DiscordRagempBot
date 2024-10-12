import { SlashCommandBuilder } from 'discord.js';
import { formatDate, calculatePing } from '../functions/util.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Повертає затримку бота та поточну дату.'),
    async execute(interaction) {
        const currentDate = formatDate(new Date());
        const sent = await interaction.reply({ content: 'Пінг...', fetchReply: true });
        const ping = calculatePing(sent.createdTimestamp, interaction.createdTimestamp);
        await interaction.editReply(`Пінг: ${ping} мс. Дата: ${currentDate}`);
    },
};
