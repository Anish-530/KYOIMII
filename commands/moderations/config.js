const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db')
module.exports={
    name: 'config',
    category: 'moderations',
    description: 'Check how many times you have used the custom embed command',
    aliases: ['settings'],
    usage: 'k!config',
    run: async(bot, message, args)=>{
    try{
        let em = new Discord.MessageEmbed()

        let customembed = db.get(`ce_${message.guild.id}`)
        let ce;
        if(customembed !== null) ce = customembed;
        else if(customembed === null) ce = 'The embed command isn\'t used yet!';

        let chx = db.fetch(`modlog_${message.guild.id}`);
        let channel;
        if(chx === null) channel = 'No mod-log has been set yet.'
        else if(chx !== null) channel = message.guild.channels.cache.get(chx);

        let muterole = db.get(`botmuterole_${message.guild.id}`)
        let mute;
        if(muterole === undefined) mute = 'No mute-role has been set yet.'
        else if(muterole !== undefined) mute = message.guild.roles.cache.get(muterole);

        let welchan = db.get(`welchannel_${message.guild.id}`)
        let chan1;
        if(welchan === null) chan1 = 'No Channel for welcome message set yet!'
        else if(welchan !== null) chan1 = message.guild.channels.cache.get(welchan)

        let goodchan = db.get(`goodchannel_${message.guild.id}`)
        let chan2;
        if(goodchan === null) chan2 = 'No Channel for goodbye message set yet!'
        else if(goodchan !== null) chan2 = message.guild.channels.cache.get(goodchan)

        em.setAuthor(`Config for ${message.guild.name}`, message.guild.iconURL({ dynamic: true, format: 'png' }))
        em.setColor('#2f3136')
        em.setDescription(`**Number of times Custom Embed used**\n${ce}\n\n**Channel for Mod-log**\n${channel}\n\n**Mute-role**\n${mute}\n\n**Welcome-Channel**\n${chan1}\n\n**Goodbye-Channel**\n${chan2}`)
        em.setTimestamp(new Date())
        em.setFooter(bot.user.username, bot.user.avatarURL())
        message.channel.send(em)

    }catch(err){
        console.log(err)
        return message.channel.send('Oops! Looks like something went wrong, You can try again Later.')
        }
    }
}