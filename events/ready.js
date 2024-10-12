export default {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Бот увійшов як ${client.user.tag}`);
    },
};
