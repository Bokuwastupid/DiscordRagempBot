// index.js
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import chalk from 'chalk';

// Отримання __dirname у ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Створення нового клієнта
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Колекції для команд
client.commands = new Collection();

// Завантаження команд
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = await import(`./commands/${file}`);
    if ('data' in command.default && 'execute' in command.default) {
        client.commands.set(command.default.data.name, command.default);
        console.log(chalk.green(`Команда ${command.default.data.name} завантажена.`));
    } else {
        console.log(chalk.red(`[Команда] Файл ${filePath} не має властивостей "data" або "execute".`));
    }
}

// Завантаження подій
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = await import(`./events/${file}`);
    if (event.default.once) {
        client.once(event.default.name, (...args) => event.default.execute(...args, client));
    } else {
        client.on(event.default.name, (...args) => event.default.execute(...args, client));
    }
    console.log(chalk.blue(`Подія ${event.default.name} завантажена.`));
}

// Логін бота
client.login(process.env.DISCORD_TOKEN).then(() => {
    console.log(chalk.yellow('Бот успішно запущено!'));
}).catch(err => {
    console.error(chalk.red('Не вдалося запустити бота:', err));
});
