const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'mute',
    category: 'moderations',
    description: 'Mute a user',
    aliases: [],
    usage: 'k!mute <user>',
    run: async(bot, message, args)=>{
        try{
            if(!message.member.hasPermission(["MANAGE_ROLES"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_ROLES\` permission, to use this command.");
            if(!message.member.guild.me.hasPermission(['MANAGE_ROLES'])) return message.reply("I don\'t have the permission to manage roles.\nPlease provide me \`MANAGE_ROLES\` permission to use this command")
            const mentionedddMember11 = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
            const member = message.guild.member(mentionedddMember11);
            let chx = db.get(`modlog_${message.guild.id}`);
            const channel = message.guild.channels.cache.get(chx);
            let reason = args.slice(1).join(' ')
            if(!reason) reason = 'No reason specified'
            if(!mentionedddMember11) {
                const error = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to at least mention or provide me the member\'s ID.\n\nExample :
                \`\`\`fix
k!mute <mention the member> [reason]
or
k!mute <provide the ID of the member> [reason]\`\`\``)
                return message.channel.send(error);
            }
            else if(mentionedddMember11){
                if(member.hasPermission('ADMINISTRATOR', 'MANAGE_GUILD')) return message.channel.send('Seems like that user has higher roles than me!')
                let mute = db.get(`botmuterole_${message.guild.id}`)
                let mrole = message.guild.roles.cache.get(mute);
                if(mute === null) {
                    let er = new Discord.MessageEmbed()
                    .setTitle('<:notgood:776121645709525002> Looks like muterole, for this server has not been set yet. To set it, use \`su muterole <mention a role>\`.')
                    .setColor('#2f3136')
                    message.channel.send(er)
                }
                else if(mute !== null) {
                    if(member.roles.cache.has(mrole.id)) return message.channel.send('That user is already muted.')
                    else if(!member.roles.cache.has(mrole.id)) {
                        member.roles.add(mrole)
                        let mute_em = new Discord.MessageEmbed()
                        mute_em.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
                        mute_em.setDescription(`<:good:776121655528783964> **${member.user.tag}** were muted. Reason : ${reason}`)
                        mute_em.setColor(`#2f3136`)
                        mute_em.setTimestamp(new Date())
                        await message.channel.send(mute_em)
                        if(chx !== null) {
                            db.get(`banlogcount_${message.guild.id}`)
                            let ban_log_count = db.add(`banlogcount_${message.guild.id}`, 1)
                            let ban_log = new Discord.MessageEmbed()
                            ban_log.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
                            ban_log.setDescription(`**Member:** ${member.user.tag} - (${member.id})\n**Mention:** ${member}\n**Action:** Mute\n**Reason:** ${reason}`)
                            ban_log.setColor(0xf94343)
                            ban_log.setTimestamp(new Date())
                            ban_log.setFooter(`Case #${ban_log_count}`)
                            channel.send(ban_log)
                            }
                            else if(chx === null) {
                                return;
                            }
                    }
                }
            }
        }catch(err){
            console.log(err);
            const errr = new Discord.MessageEmbed()
            .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
            .setColor(0x2f3136)
            .setDescription(`You have to at least mention or provide me the member\'s ID.\n\nExample :
            \`\`\`fix
su mute <mention the member> [reason]
or
su mute <provide the ID of the member> [reason]\`\`\``)
            return message.channel.send(errr);
        }
    }
}