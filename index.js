const Discord = require('discord.js');
const { Collection, Client, MessageEmbed } = require('discord.js');
const date = new Date();
const fs = require('fs');
const bot = new Discord.Client({
    disableEveryone: true
});
const db = require('quick.db')
const config = require('./config.json')
bot.commands = new Collection();
bot.aliases = new Collection();
bot.categories = fs.readdirSync("./commands/");
const Timeout = new Set();
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

const ms = require('ms')

const PREFIX = config.PREFIX;

bot.on('ready', async () => {
    setInterval(() => {
        bot.user.setActivity(`k!help`, { type: "LISTENING" });
    }, 10000);
    console.log(`Hello, I am online on ${bot.guilds.cache.size} servers and serving ${bot.users.cache.size} users`);
});

bot.on('guildMemberAdd', async Addedmember => {
    let welcome_messages = [
`Welcome ${Addedmember}!`,
`Moshi Moshi ${Addedmember}`,
`Konichiwa ${Addedmember}!`,
`Please don\'t leave us ${Addedmember}!`,
`Oh! Glad to see you here ${Addedmember}!`,
`Looks like we have a new visitor, ${Addedmember}`,
`Nice to meet you ${Addedmember}!`,
`Am happy that you joined ${Addedmember}!`,
`YAY!! ${Addedmember} just joined >w<`,
`Hi ${Addedmember}!`,
`Oh! Hello ${Addedmember}!`,
`I hope ${Addedmember} brought some pizza!`,
`I guess ${Addedmember} brought us some drinks!`,
`Cool! ${Addedmember} just joined!`,
`Guess what? We got a new member ${Addedmember}!`,
`Thank you for joining ${Addedmember} :)`,
`Someone serve some coffee to ${Addedmember}!`,
`A good human joined ${Addedmember}!`,
`Finally I can now see ${Addedmember}!`,
`Nice pfp ${Addedmember}!`,
`Great job, for joining the server ${Addedmember} :D`
    ]
    let random_welcome_messages = welcome_messages[Math.floor(Math.random() * welcome_messages.length)];
    let chx2 = db.get(`welchannel_${Addedmember.guild.id}`)
    const channel2 = Addedmember.guild.channels.cache.get(chx2);
    if(chx2 !== null) {
        let welcome_embed = new Discord.MessageEmbed()
        .setTitle('Welcome')
        .setDescription(random_welcome_messages)
        .setColor('#2f3136')
        .setTimestamp(new Date())
        .setFooter(Addedmember.guild.name, Addedmember.guild.iconURL({ dynamic: true, format: 'png' }))
        .setThumbnail(Addedmember.user.avatarURL({ dynamic: true, format: 'png' }))
    await channel2.send(welcome_embed)
    } else if(chx2 === null) {
        return;
    }
})

bot.on('guildMemberRemove', async member => {
    let goodbye_messages = [
`Damn! ${member} just left the server`,
`Why did ${member} leave the server :(`,
`Looks like someone didn\'t treat ${member} well.`,
`They left. ${member} just left.`,
`Guess what, ${member} just left the server`,
`Better luck next time ${member}!`,
`You\'ll be missed ${member} :'(`,
`nuuuuuuuu! ${member} left.`,
`Goodbye ${member}!`,
`Sayonara ${member}!`,
`We will surely meet again ${member}!`,
`Seems so odd after ${member} left`,
`Tis so cold here because of ${member}\'s absence`,
`Thou shall suffer ${member}! For leaving a beautiful server like this!`,
`Annnnnnnnnnnnnnd ${member} left *shrugs*`,
`Oyasumi ${member}, rest well!`,
`Am confused about why did ${member} leave`,
`Guys! GUYS! ${member} left :c`,
`Why did you leave us ${member}!`,
`I feel lonely without ${member} in here :c`,
`I\'ll miss ${member} so much!`,
`It was great to spend time with you ${member}!`,
`Left? ${member} :C`,
`I hope ${member} will join again!`,
`Guess, I scared ${member}, they left just now.`
    ]
    let random_goodbye_messages = goodbye_messages[Math.floor(Math.random() * goodbye_messages.length)];
    let chx = db.get(`goodchannel_${member.guild.id}`)
    const channel = member.guild.channels.cache.get(chx);
    if(chx !== null) {
        let goodbye_embed = new Discord.MessageEmbed()
        .setTitle('Goodbye')
        .setDescription(random_goodbye_messages)
        .setColor('#2f3136')
        .setTimestamp(new Date())
        .setFooter(member.guild.name, member.guild.iconURL({ dynamic: true, format: 'png' }))
        .setThumbnail(member.user.avatarURL({ dynamic: true, format: 'png' }))
    await channel.send(goodbye_embed)
    } else if(chx === null) {
        return;
    }
})

bot.on('message', async message => {
    if (message.channel.type === "dm") return;
    if (message.author.bot) return;
    if (!message.content.toLowerCase().startsWith(PREFIX)) return;



    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const com = args.shift().toLowerCase();
    if (com.length == 0) return;
    const command = bot.commands.get(com) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(com));
    if (command) {
        if (command.timeout) {
            if (Timeout.has(`${message.author.id}${command.name}`)) {
                let um = new Discord.MessageEmbed()
                um.setTitle("Hold Up ✋!")
                um.setDescription(`You have to wait more ${ms(command.timeout)}, to use this command again`)
                um.addField('Why?', 'Because this system was installed, in order not to flood the chat with bot commands everywhere', true)
                um.setFooter(`This message gets deleted after 10s`)
                um.setTimestamp(new Date())
                um.setColor(0xf94343)
                return message.reply(um).then(message => message.delete({ timeout: 10000 }));
            } else {
                Timeout.add(`${message.author.id}${command.name}`)
                setTimeout(() => {
                    Timeout.delete(`${message.author.id}${command.name}`)
                }, command.timeout);
            }
        }
        command.run(bot, message, args)
    }



})


bot.snipes = new Map();
bot.on('messageDelete', function (message, channel) {
    bot.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
})
bot.edits = new Map();
bot.on('messageUpdate', function (message, channel) {
    bot.edits.set(message.channel.id, {
        content: message.content,
        author: message.author
    })
})



bot.login(config.token);