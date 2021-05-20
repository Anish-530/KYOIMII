const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'nuke',
    category: 'moderations',
    description: 'Let Kiyomii nuke a whole channel for you :)',
    aliases: [],
    usage: 'k!nuke',
    run: async(bot, message, args)=>{
        try{
            if(!message.member.hasPermission(["MANAGE_CHANNELS"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_CHANNELS\` permission, to use this command.");
            if(!message.member.guild.me.hasPermission(["MANAGE_CHANNELS"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_CHANNELS\` permission, to use this command.");
            const nukeChannel = message.channel;
            let filter = (m) => m.author.id === message.author.id;
            db.set(`nuked_${message.guild.id}`, message.channel.name)
            if(!nukeChannel.deletable) {
                let mebed = new Discord.MessageEmbed()
                .setTitle('<:notgood:776121645709525002> Looks like this channel is not deleteable. So, I can\'t nuke this channel.')
                message.channel.send(mebed)
            }
            let cfm = new Discord.MessageEmbed()
            cfm.setTitle("<:notgood:776121645709525002> CAUTION!!")
            cfm.setDescription("Are you sure, that you are going to do this? By doing this, Kiyomii will delete this channel completely and create a new channel by this name. If you want to continue type \`y\` else if type \`n\` to cancel. You have 1 minute to choose.")
            cfm.setColor(0x2f3136)
            cfm.setTimestamp(new Date())
            cfm.setFooter(bot.user.username,bot.user.displayAvatarURL())
            await message.channel.send(cfm)
            await message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
            .then(async collected => {
                if(collected.first().content.toLowerCase() === 'yes' || collected.first().content.toLowerCase() === 'y'){
                    await nukeChannel.clone().catch(err => console.log(err))
            		await nukeChannel.delete().catch(err => console.log(err))
                }
                else if(collected.first().content.toLowerCase() === 'no' || collected.first().content.toLowerCase() === 'n'){
                    return message.channel.send('Operation cancelled sucessfully!')
                }
                else if(collected.first().content.toLowerCase() !== 'yes' || collected.first().content.toLowerCase() !== 'y' || 			collected.first().content.toLowerCase() !== 'no' || collected.first().content.toLowerCase() !== 'n'){
                    return message.channel.send('All you had to do, was to choose damn option!');
                }
            })
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}