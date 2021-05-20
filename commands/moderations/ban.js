const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db')
const { good } = require('../../config.json')
module.exports={
    name: 'ban',
    category: 'moderation',
    description: 'Ban an user',
    aliases: [],
    usage: 'k!ban <mention the user you want to ban> <reason>',
    run: async(bot, message, args)=>{
        try{
        let chx = db.fetch(`modlog_${message.guild.id}`);
        const channel = message.guild.channels.cache.get(chx);
        if (!message.member.hasPermission(['BAN_MEMBERS'])) return message.reply('You don\'t have the permission to use this command.\nYou need \`BAN_MEMBERS\` permission, to use this command.');
        if(!message.member.guild.me.hasPermission(['BAN_MEMBERS'])) return message.reply("I don\'t have the permission to \`BAN_MEMBERS\`.\nPlease provide me the following permission to use this command")  
        const userb = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        const memberb = message.guild.member(userb);
        var guildID = bot.guilds.cache.get(message.guild.id).id;
        let bareason = args.slice(1).join(" ")
        if (!userb) {
            const error = new Discord.MessageEmbed()
            .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
            .setColor(0x2f3136)
            .setDescription(`You have to at least mention, or provide me the ID of the member, you want to ban.\n\nExample :
            \`\`\`fix
k!ban <mention an user> <reason>
OR
k!ban <the ID of an user> <reason>\`\`\``)
            return message.channel.send(error);
        }
        if (memberb !== undefined) {

            if (memberb.id === bot.user.id) {
          
             return message.channel.send(`*You can\'t use that command on me!*`)
          
            }
        }
        if(userb.id === message.author.id) return message.reply('Uh! You can\'t ban yourself, you know? :/');
        else if (userb) {
            if(!bareason) bareason = "No reason was provided"
            if (memberb) {
                if(memberb.hasPermission('ADMINISTRATOR', 'MANAGE_SERVER')) return message.channel.send('Seems like that user has higher roles than me!')
                let uban = new Discord.MessageEmbed()
                uban.setAuthor(`${good} Ban`, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
                uban.setDescription(`**${memberb.user.tag}** were banned 🤕.\nReason: ${bareason}\nUser ID: ${memberb.id}`)
                uban.setColor(0xf94343)
                uban.setTimestamp(new Date())
                uban.setFooter(bot.user.username, bot.user.avatarURL())
                await message.channel.send(uban);
                await message.react('👍');
                await bot.guilds.resolve(guildID).members.resolve(userb).ban({days: 7, reason: bareason}).then(async () => {
                }).catch(err => {
                    message.channel.send('Seems like, I was unable to ban that user. You can try again later')
                    message.react('👎');
                    console.log(err);
                });

            } else {
                message.reply("The user isn\'t in this server").then(message => message.delete({ timeout: 5000 }));
            }
        } else {
            message.reply('That user is not in the server :( ').then(message => message.delete({ timeout: 5000 }));
        }
        if(chx != null) {
            db.get(`banlogcount_${message.guild.id}`)
            let ban_log_count = db.add(`banlogcount_${message.guild.id}`, 1)
            let ban_log = new Discord.MessageEmbed()
            ban_log.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
            ban_log.setDescription(`**Member:** ${memberb.user.tag} - (${memberb.id})\n**Mention:** ${memberb}\n**Action:** Ban\n**Reason:** ${bareason}`)
            ban_log.setColor(0xf94343)
            ban_log.setTimestamp(new Date())
            ban_log.setFooter(`Case #${ban_log_count}`)
            channel.send(ban_log)
        }
        else if(chx === null) {
            return;
        }
    }catch(err) {
        console.log(err)
        return message.channel.send('Oops looks like an error occured')
    }
    }
}
