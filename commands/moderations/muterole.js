const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
const mute = require('./mute');
module.exports={
    name: 'muterole',
    category: 'moderations',
    description: 'Set the mute role for your server',
    aliases: ['mr', 'setmute', 'setmuterole'],
    usage: 'k!muterole <role>',
    run: async(bot, message, args)=>{
        try{
            if(!message.member.hasPermission(["MANAGE_ROLES"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_ROLES\` permission, to use this command.");
            const muterole = message.guild.roles.cache.find(
                (role) => role.name.toLowerCase() === args.join(' ').toLowerCase() || role.id === args.join(' ')
            ) || message.mentions.roles.first();
            if(!args[0] || !muterole) {
                const error = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to at least mention or provide me the role\'s name or provide me the role\'s ID.\n\nExample :
                \`\`\`fix
k!muterole <mention the role>
or
k!muterole <provide the name of the role>
or
k!muterole <provide the role\'s ID>\`\`\``)
                return message.channel.send(error);
            }
            else if(muterole) {
                db.set(`botmuterole_${message.guild.id}`, muterole.id)
                const set = new Discord.MessageEmbed()
                .setTitle(`<:good:776121655528783964> Muterole`)
                .setDescription(`Muterole for **${message.guild.name}**, has been set to ${muterole}`)
                .setColor('#2f3136')
                return message.channel.send(set)
            }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}