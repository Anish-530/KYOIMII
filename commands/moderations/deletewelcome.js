const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db')
module.exports={
    name: 'deletewelcome',
    category: 'guild',
    description: 'Resets the current welcome channel for a guild to none',
    aliases: ['dw', 'dwc', 'deletewelcomechannel', 'dwelchan'],
    usage: 'k!deletegoodbye',
    run: async(bot, message, args)=>{
        if(!message.member.hasPermission(["MANAGE_CHANNELS"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_CHANNELS\` permission, to use this command.");
        let preguild = db.get(`welchannel_${message.guild.id}`)
        if(preguild === null) {
            const predel = new Discord.MessageEmbed()
            .setTitle(`<:notgood:776121645709525002> ${message.guild.name} has no Welcome channel set yet. To set the welcome message, use \`k!setwelcome <mention a channel>\``)
            .setColor('#2f3136')
            .setTimestamp(new Date())
            .setFooter(bot.user.username, bot.user.avatarURL())
            return message.channel.send(predel)
        }
        db.delete(`welchannel_${message.guild.id}`)
        const wasset = new Discord.MessageEmbed()
        .setTitle(`Welcome Channel`)
        .setDescription(`<:good:776121655528783964> Welcome channel for **${message.guild.name}**, was successfully deleted!`)
        .setColor('#2f3136')
        .setTimestamp(new Date())
        .setFooter(bot.user.username, bot.user.avatarURL())
        return message.channel.send(wasset)
    }
}