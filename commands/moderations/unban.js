const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const { good } = require('../../config.json')
const db = require('quick.db');
module.exports={
    name: 'unban',
    category: 'moderation',
    description: 'Unban an user',
    aliases: [],
    usage: 'k!unban <mention the user you want to unban or put their ID here>',
    run: async(bot, message, args)=>{
        let chx = db.fetch(`modlog_${message.guild.id}`);
        const channel = message.guild.channels.cache.get(chx);
        if(!message.member.hasPermission(["BAN_MEMBERS"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`BAN_MEMBERS\` permission, to use this command.");
        if(!message.member.guild.me.hasPermission(['BAN_MEMBERS'])) return message.reply("I don\'t have the permission to \`UNBAN MEMBERS\`.\nPlease provide me \`BAN_MEMBERS\` permission to use this command")
        if(!args[0]) return message.reply("You need to mention the user, whom you want to **unban**.\nEx: \`hey unban ID-of-the-user-you-want-to-unban\`").then(message => message.delete({ timeout: 10000 }));
        let bannedMember;
        try{                                                            
            bannedMember = await bot.users.fetch(args[0])
        }catch(e){
            if(!bannedMember) {
                const error = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to provide me the ID of the member, you want to ban.\n\nExample :
                \`\`\`fix
k!unban <user ID>\`\`\``)
                return message.channel.send(error);
            }
        }
    
        
        try {
                await message.guild.fetchBan(args[0])
            } catch(e){
                message.channel.send('This user is not banned.');
                return;
            }
    
        let reason = args.slice(1).join(" ")
        if(!reason) reason = "No reason was provided"
        try {
            message.guild.members.unban(bannedMember, {reason: reason})
            let uban1 = new Discord.MessageEmbed()
            uban1.setAuthor(`${good} Unban`, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
            uban1.setDescription(`${bannedMember.tag} are successfully unbanned 🎉\nReason: ${reason}\nUser ID: ${bannedMember.id}`)
            uban1.setColor(0x2ac075)
            uban1.setTimestamp(new Date())
            .setFooter(bot.user.username, bot.user.avatarURL())
            message.channel.send(uban1)
            message.react('👍');
            if(chx != null) {
                db.get(`banlogcount_${message.guild.id}`)
                let uban_log_count = db.add(`banlogcount_${message.guild.id}`, 1)
                let uban_log = new Discord.MessageEmbed()
                uban_log.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: 'png' }))
                uban_log.setDescription(`**Member:** ${bannedMember.tag} - (${bannedMember.id})\n**Action:** Unban\n**Reason:** ${reason}`)
                uban_log.setColor(0x2ac075)
                uban_log.setTimestamp(new Date())
                uban_log.setFooter(`Case #${uban_log_count}`)
                channel.send(uban_log)
            }
            else if(chx === null) {
                return;
            }
        } catch(e) {
            if(e)
            message.channel.send('Seems like I was unable to unban that user. You can try again later')
            message.react('👎');
            console.log(e.message)
        }
    }
}
