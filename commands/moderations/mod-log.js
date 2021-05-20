const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'mod-log',
    category: 'moderations',
    description: 'Set a channel for mod log',
    aliases: ['ml', 'mod-logs'],
    usage: 'k!mod-log <mention a channel>',
    run: async(bot, message, args)=>{
        try{
            if(!message.member.hasPermission(["MANAGE_GUILD"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_SERVER\` permission, to use this command.");
            let channel = message.mentions.channels.first();
            let questionMessage;
            let collected;
            let messageFilter = (m) => m.author.id === message.author.id;
            if(!channel) {
                async function verifyChannel() {
                    return new Promise(async (resolve, reject) => {
                        collected = await message.channel.awaitMessages(
                            messageFilter,
                            { max: 1, time: 600000 },
                        );
                        if (collected.size === 0) reject(`Timeout`);
                        else if (collected.first().mentions.channels.size === 0) {
                            if (
                                collected.first().content.toLowerCase() === 'cancel'
                            ) {
                                reject(`Exiting`);
                            } else {
                                let error = await message.channel.send('Please mention a channel, for the mod-log. You can type \`cancel\`, if you want to cancel the setup.');
                                error.delete({ timeout: 5000 });
                                resolve(verifyChannel());
                            }
                        } else {
                            resolve(collected.first().mentions.channels.first());
                        }
                    });
                }
                questionMessage = await message.channel.send('Which channel do you want to set for mod-log? You can type \`cancel\`, if you want to cancel the setup.');
                try {
                    let chan = message.mentions.channels.first();
                    chan = await verifyChannel();
                    await db.set(`modlog_${message.guild.id}`, chan.id)
                    const wasset1 = new Discord.MessageEmbed()
                    .setTitle(`Mod-log`)
                    .setDescription(`<:good:776121655528783964> Mod-log for **${message.guild.name}**, is now set as ${chan}`)
                    .setColor('#2f3136')
                    .setTimestamp(new Date())
                    .setFooter(bot.user.username, bot.user.avatarURL())
                    await message.channel.send(wasset1)
                } catch (e) {
                    if (e === `Exiting`) {
                        return message.channel.send(`Successfully cancelled the setting of channel for mod-log`).then(message => message.delete({ timeout: 10000 }));
                    } else if (e === `Timeout`) {
                        await message.channel.send(`mod-log setup has timed out. Please run the command again.`,);
                    }
                }
            }
            else if(channel){
                db.set(`modlog_${message.guild.id}`, channel.id)
                const wasset = new Discord.MessageEmbed()
                .setTitle(`Mod-log`)
                .setDescription(`<:good:776121655528783964> Mod-log for **${message.guild.name}**, is now set as ${channel}`)
                .setColor('#2f3136')
                .setTimestamp(new Date())
                .setFooter(bot.user.username, bot.user.avatarURL())
                await message.channel.send(wasset)
            }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}