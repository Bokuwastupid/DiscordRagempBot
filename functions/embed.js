import { EmbedBuilder } from 'discord.js';

/**
 * Створює вбудоване повідомлення з заданими параметрами.
 * @param {string} title - Заголовок вбудованого повідомлення.
 * @param {string} description - Опис вбудованого повідомлення.
 * @param {number} [color=0x0099ff] - Колір вбудованого повідомлення у форматі HEX.
 * @returns {EmbedBuilder} Відформатований EmbedBuilder об'єкт.
 */
export function createEmbed(title, description, color = 0x0099ff) {
    return new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setTimestamp();
}
