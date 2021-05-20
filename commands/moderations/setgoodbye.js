const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db')
module.exports={
    name: 'setgoodbye',
    category: 'guild',
    description: 'set the goodbye channel.',
    aliases: ['sgc', 'setgc'],
    usage: 'k!setgoodbye <mention a channel>',
    run: async(bot, message, args)=>{
        if(!message.member.hasPermission(["MANAGE_CHANNELS"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_CHANNELS\` permission, to use this command.");
        let channel = message.mentions.channels.first();
        if(!channel){
            const error = new Discord.MessageEmbed()
            .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
            .setColor(0x2f3136)
            .setDescription(`You have to at least mention a channel.\n\nExample :
            \`\`\`fix
k!setgoodbye <mention a channel>\`\`\``)
            return message.channel.send(error);
        }
        else if(channel){
            db.set(`goodchannel_${message.guild.id}`, channel.id)
            const wasset = new Discord.MessageEmbed()
            .setTitle(`Goodbye Channel`)
            .setDescription(`<:good:776121655528783964> Goodbye channel for **${message.guild.name}**, is now set as ${channel}`)
            .setColor('#2f3136')
            .setTimestamp(new Date())
            .setFooter(bot.user.username, bot.user.avatarURL())
            message.channel.send(wasset)
        }
    }
    
}
