const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'avatar',
    category: 'info',
    description: 'Get the Avatar of an user',
    aliases: ['av'],
    usage: 'k!av [mention someone or use their ID]',
    run: async(bot, message, args)=>{
        try{
            const mentionedddMember11 = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
            const member = message.guild.member(mentionedddMember11);
            const statuser = member.user.presence.status;
            var guildID = bot.guilds.cache.get(message.guild.id).id;
            let em = new MessageEmbed()
            em.setImage(bot.guilds.resolve(guildID).members.resolve(mentionedddMember11).user.avatarURL({ dynamic: true, format: 'png', size: 512 }))
            em.setColor(0x2f3136)
            if(statuser === 'offline'){
                em.addField(message.guild.members.cache.get(member.id).displayName + '\'s Avatar', [
                    `<:Offline:777091424671760385> [Link to ${message.guild.members.cache.get(member.id).displayName}'s avatar](${bot.guilds.resolve(guildID).members.resolve(mentionedddMember11).user.avatarURL({ dynamic: true, format: 'png', size: 512 })})`
                ])
            }
            else if(statuser === 'online'){
                em.addField(message.guild.members.cache.get(member.id).displayName + '\'s Avatar', [
                    `<:good:776121655528783964> [Link to ${message.guild.members.cache.get(member.id).displayName}'s avatar](${bot.guilds.resolve(guildID).members.resolve(mentionedddMember11).user.avatarURL({ dynamic: true, format: 'png', size: 512 })})`
                ])
            }
            else if(statuser === 'idle'){
                em.addField(message.guild.members.cache.get(member.id).displayName + '\'s Avatar', [
                    `<:statusIdle:733765872275161219> [Link to ${message.guild.members.cache.get(member.id).displayName}'s avatar](${bot.guilds.resolve(guildID).members.resolve(mentionedddMember11).user.avatarURL({ dynamic: true, format: 'png', size: 512 })})`
                ])
            }
            else if(statuser === 'dnd'){
                em.addField(message.guild.members.cache.get(member.id).displayName + '\'s Avatar', [
                    `<:notgood:776121645709525002> [Link to ${message.guild.members.cache.get(member.id).displayName}'s avatar](${bot.guilds.resolve(guildID).members.resolve(mentionedddMember11).user.avatarURL({ dynamic: true, format: 'png', size: 512 })})`
                ])
            }
            em.setTimestamp(new Date())
            em.setFooter(bot.user.username, bot.user.avatarURL())
            message.channel.send(em);
        }catch(err){
            console.log(err)
            if(err) return message.channel.send('I was unable to find that member :(');
        }
    }
}
