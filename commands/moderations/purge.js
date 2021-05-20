const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'purge',
    category: 'moderations',
    description: 'Purge specific amount of messages from everyone, or from a specific user.',
    aliases: ['clear', 'del'],
    usage: 'su purge [mention user] <amount>',
    run: async(bot, message, args)=>{
        if (!message.member.hasPermission(['MANAGE_MESSAGES'])) return message.reply('You don\'t have the permission to use this command.\nYou need \`MANAGE_MESSAGES\` permission, to use this command.');
        if(!message.member.guild.me.hasPermission(['MANAGE_MESSAGES'])) return message.reply("I don\'t have the permission to \`MANAGE_MESSAGES\`.\nPlease provide me the following permission to use this command") 
        try{
        const user = message.mentions.users.first();
        let amount = args[0];
        if (!amount) return message.reply('Please specify an amount to delete');
        if (!user && !amount) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
        // Fetch 100 messages (will be filtered and lowered up to max amount requested)
        message.channel.messages.fetch({
        limit: 100,
        }).then(async (messages) => {
        if (user) {
        amount = args[1];
        if(isNaN(amount)) return message.reply('That doesn\'t seem like a number. Please enter a number.')
        const filterBy = user ? user.id : bot.user.id;
        messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
        await message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
        await message.channel.send(`Deleted ${amount} messages from ${user}`).then(message => message.delete({ timeout: 10000 }));
        }
        if(!user) {
            if(isNaN(amount)) return message.reply('That doesn\'t seem like a number. Please enter a number.')
            await message.channel.bulkDelete(amount).catch(error => console.log(error.stack));
            await message.channel.send(`Deleted ${amount} messages`).then(message => message.delete({ timeout: 10000 }));
        }
        });
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}