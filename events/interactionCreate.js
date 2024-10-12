// events/interactionCreate.js

import { createEmbed } from '../functions/embed.js';

export default {
    name: 'interactionCreate',
    async execute(interaction, client) {
        console.log(`Відбулася взаємодія: ${interaction.commandName} від ${interaction.user.tag}`);

        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`Не знайдена команда ${interaction.commandName}`);
            return;
        }

        try {
            await command.execute(interaction);
            console.log(`Виконана команда ${interaction.commandName} користувача ${interaction.user.tag}`);
        } catch (error) {
            console.error(`Помилка під час виконання команди ${interaction.commandName}:`, error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'Виникла помилка під час виконання цієї команди!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'Виникла помилка під час виконання цієї команди!', ephemeral: true });
            }
        }
    },
};
