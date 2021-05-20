const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db')
module.exports={
    name: 'cookie',
    category: 'fun',
    description: 'Give someone a cookie',
    aliases: ['ck'],
    usage: 'k!cookie <user>',
    run: async(bot, message, args)=>{
    try{
        const mentionedddMember11 = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        const member = message.guild.member(mentionedddMember11);
        try{
            if(!mentionedddMember11) {
                const error = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to at least mention or provide the id of the user, whom you are giving a cookie.\n\nExample :
                \`\`\`fix
k!cookie <mention a user>
OR
k!cookie <ID of a user>\`\`\``)
                return message.channel.send(error);
            }
             else if(mentionedddMember11) {
                let coll = new Discord.MessageEmbed()
                .setColor('#2f3136')
                .setTitle(`${message.guild.members.cache.get(message.author.id).displayName} gave a cookie to ${message.guild.members.cache.get(member.id).displayName} 🍪!`)
                message.channel.send(coll)
                db.add(`cookiegiven_${message.author.id}`, 1)
                db.add(`cookiehave_${member.id}`, 1)
            }
        }catch(err){
            console.log(err)
            return message.channel.send('Oops! Looks like something went wrong, You can try again Later.')
        }
    }catch(err){
        console.log(err)
        return message.channel.send('Oops! Looks like something went wrong, You can try again Later.')
        }
    }
}