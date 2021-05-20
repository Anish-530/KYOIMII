const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db')
module.exports={
    name: 'deletemuterole',
    category: 'guild',
    description: 'Resets the current mute role for a guild to none',
    aliases: ['dmr'],
    usage: 'k!deletemuterole',
    run: async(bot, message, args)=>{
        if(!message.member.hasPermission(["MANAGE_ROLES"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_ROLES\` permission, to use this command.");
        let preguild = db.get(`botmuterole_${message.guild.id}`)
        if(preguild === null) {
            const predel = new Discord.MessageEmbed()
            .setTitle(`<:notgood:776121645709525002> ${message.guild.name} has no Mute role set yet. To set the mute role, use \`k!muterole <mention a role>\``)
            .setColor('#2f3136')
            .setTimestamp(new Date())
            .setFooter(bot.user.username, bot.user.avatarURL())
            return message.channel.send(predel)
        }
        db.delete(`botmuterole_${message.guild.id}`)
        const wasset = new Discord.MessageEmbed()
        .setTitle(`Mute role`)
        .setDescription(`<:good:776121655528783964> Mute role channel for **${message.guild.name}**, was successfully deleted!`)
        .setColor('#2f3136')
        .setTimestamp(new Date())
        .setFooter(bot.user.username, bot.user.avatarURL())
        return message.channel.send(wasset)
    }
}