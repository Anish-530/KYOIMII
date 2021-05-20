const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'invite',
    category: 'info',
    description: 'Get the invite link of the bot',
    aliases: ['inv'],
    usage: 'k!invite',
    run: async(bot, message, args)=>{
    try{
        let em = new Discord.MessageEmbed()
        .setAuthor('Yay! Thanks for inviting me!', bot.user.avatarURL())
        .setColor('#2f3136')
        .setDescription(`**[Click here to invite me!](https://discord.com/oauth2/authorize?client_id=791387658818420767&scope=bot&permissions=1543892215)**`)
        .setTimestamp(new Date())
        .setThumbnail(message.guild.iconURL({ dynamic: true, format: 'png' }))
        .setFooter(message.guild.name)
        return message.channel.send(em)
    }catch(err){
        console.log(err)
        return message.channel.send('Oops! Looks like something went wrong, You can try again Later.')
        }
    }
}