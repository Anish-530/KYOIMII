const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db')
module.exports={
    name: 'embed',
    category: 'guild',
    description: 'A simple, yet very effective custom embed command',
    aliases: ['ac', 'announce', 'custom-embed'],
    usage: 'k!embed',
    run: async(bot, message, args)=>{
        try {
            if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("You don\'t have the permission to use this command.\nYou need \`MANAGE_MESSAGES\` permission, to use this command.");
            if(!message.member.guild.me.hasPermission(['MANAGE_MESSAGES'])) return message.channel.send("I don\'t have the permission to \`MANAGE MESSAGES\`.\nPlease provide me the following permission to use this command")
            let questionMessage;
            let collected;
            let messageFilter = (m) => m.author.id === message.author.id;
            let chan;
            let color;
            let title;
            let description;
            let image;
            let thumbnail;
            let footer;
            let format;
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
                            await questionMessage.delete();
                            await collected.first().delete();
                            reject(`Exiting`);
                        } else {
                            const erEmbed = new MessageEmbed()
                                .setColor(0x2f3136)
                                .setTitle(`Error!`)
                                .setDescription(
                                    `Mention a channel for me to send the embed in!`,
                                )
                                .setTimestamp();
                            let error = await message.channel.send(erEmbed);
                            await collected.first().delete();
                            error.delete({ timeout: 5000 });
                            resolve(verifyChannel());
                        }
                    } else {
                        await questionMessage.delete();
                        await collected.first().delete();
                        resolve(collected.first().mentions.channels.first().id);
                    }
                });
            }
            const chanEmbed = new MessageEmbed()
                .setColor(0x2f3136)
                .setTitle(`Step 1: Channel`)
                .setDescription(
                    `Please mention a channel, for the embed to be sent in!, or write \`cancel\` if you wish to exit setup.`,
                )
                .setFooter(`Step 1 of 8`)
                .setTimestamp();
            questionMessage = await message.channel.send(chanEmbed);
            try {
                chan = await verifyChannel();
            } catch (e) {
                if (e === `Exiting`) {
                    const cEmbed = new MessageEmbed()
                        .setColor(0x2f3136)
                        .setTitle(`Cancelled!`)
                        .setDescription(`Your embed setup has been cancelled.`)
                        .setFooter('This message gets deleted after 10 seconds')
                        .setTimestamp();
                    await message.delete();
                    return message.channel.send(cEmbed).then(message => message.delete({ timeout: 10000 }));
                } else if (e === `Timeout`) {
                    const tEmbed = new MessageEmbed()
                        .setColor(0x2f3136)
                        .setTitle(`Timed out!`)
                        .setDescription(
                            `Your embed setup has timed out. Please run the command again.`,
                        )
                        .setTimestamp();
                    await questionMessage.delete();
                    await message.channel.send(tEmbed);
                    return message.delete();
                }
            }
            const colorEmbed = new MessageEmbed()
                .setColor(0x2f3136)
                .setTitle(`Step 2: Color`)
                .setDescription(
                    `Tell me a color\'s, name or give me a hex code of a color, for the embed to be, write \`skip\` if you don't want a color, or \`cancel\` if you wish to exit the setup.`,
                )
                .addField(`Example:`, `\`#cb42f5\` or \`cb42f5\`. Note :- **The Length of hex color code are only 6 characters, anything more than 6 characters will not be accepted.**`, true)
                .setFooter(`Step 2 of 8`)
                .setTimestamp();
            questionMessage = await message.channel.send(colorEmbed);
            collected = await message.channel.awaitMessages(messageFilter, {
                max: 1,
                time: 90000,
            });
            if (collected.size === 0) {
                const tEmbed = new MessageEmbed()
                    .setColor(0x2f3136)
                    .setTitle(`Timed out!`)
                    .setDescription(
                        `Your embed setup has timed out. Please run the command again.`,
                    )
                    .setTimestamp();
                await questionMessage.delete();
                await message.channel.send(tEmbed);
                return message.delete();
            }
            if (collected.first().content.toLowerCase() === 'skip')
                color = 0x2f3136;
            else if (collected.first().content.toLowerCase() === 'cancel') {
                const cEmbed = new MessageEmbed()
                    .setColor(0x2f3136)
                    .setTitle(`Cancelled!`)
                    .setDescription(`Your embed setup has been cancelled.`)
                    .setTimestamp();
                await collected.first().delete();
                await questionMessage.delete();
                await message.delete();
                return message.channel.send(cEmbed).then(message => message.delete({ timeout: 10000 }));
            } else color = collected.first().content;
            await collected.first().delete();
            await questionMessage.delete();

            const titEmbed = new MessageEmbed()
                .setColor(0x2f3136)
                .setTitle(`Step 3: Title`)
                .setDescription(
                    `Tell me a **title** for the embed, write \`skip\` if you don't want a title, or \`cancel\` if you wish to exit setup.`,
                )
                .setFooter(`Step 3 of 8`)
                .setTimestamp();
            questionMessage = await message.channel.send(titEmbed);
            collected = await message.channel.awaitMessages(messageFilter, {
                max: 1,
                time: 90000,
            });
            if (collected.size === 0) {
                const tEmbed = new MessageEmbed()
                    .setColor(0x2f3136)
                    .setTitle(`Timed out!`)
                    .setDescription(
                        `Your embed setup has timed out. Please run the command again.`,
                    )
                    .setTimestamp();
                await questionMessage.delete();
                await message.channel.send(tEmbed);
                return message.delete();
            }
            if (collected.first().content.toLowerCase() === 'skip') title = '';
            else if (collected.first().content.toLowerCase() === 'cancel') {
                const cEmbed = new MessageEmbed()
                    .setColor(0x2f3136)
                    .setTitle(`Cancelled!`)
                    .setDescription(`Your embed setup has been cancelled.`)
                    .setTimestamp();
                await collected.first().delete();
                await questionMessage.delete();
                await message.delete();
                return message.channel.send(cEmbed);
            } else title = collected.first().content;
            await collected.first().delete();
            await questionMessage.delete();
            const desEmbed = new MessageEmbed()
                .setColor(0x2f3136)
                .setTitle(`Step 4: Description`)
                .setDescription(
                    `Tell me the **description** for your embed, write \`skip\` if you don't want a description, or \`cancel\` if you wish to exit setup.`,
                )
                .setFooter(`Step 4 of 8`)
                .setTimestamp();
            questionMessage = await message.channel.send(desEmbed);
            collected = await message.channel.awaitMessages(messageFilter, {
                max: 1,
                time: 90000,
            });
            if (collected.size === 0) {
                const tEmbed = new MessageEmbed()
                    .setColor(0x2f3136)
                    .setTitle(`Timed out!`)
                    .setDescription(
                        `Your embed setup has timed out. Please run the command again.`,
                    )
                    .setTimestamp();
                await questionMessage.delete();
                await message.channel.send(tEmbed);
                return message.delete();
            }
            if (collected.first().content.toLowerCase() === 'skip')
                description = '';
            else if (collected.first().content.toLowerCase() === 'cancel') {
                const cEmbed = new MessageEmbed()
                    .setColor(0x2f3136)
                    .setTitle(`Cancelled!`)
                    .setDescription(`Your embed setup has been cancelled.`)
                    .setTimestamp();
                await collected.first().delete();
                await questionMessage.delete();
                await message.delete();
                return message.channel.send(cEmbed);
            } else description = collected.first().content;
            await collected.first().delete();
            await questionMessage.delete();
            const imageEmbed = new MessageEmbed()
                .setColor(0x2f3136)
                .setTitle(`Step 6: Image`)
                .setDescription(
                    `Provide me an **URL** of an **image** for your embed to have, write \`skip\` if you don't want to use an **image**, or \`cancel\` if you wish to exit setup.`,
                )
                .setFooter(`Step 6 of 8`)
                .setTimestamp();
            questionMessage = await message.channel.send(imageEmbed);
            collected = await message.channel.awaitMessages(messageFilter, {
                max: 1,
                time: 90000,
            });
            if (collected.size === 0) {
                const tEmbed = new MessageEmbed()
                    .setColor(0x2f3136)
                    .setTitle(`Timed out!`)
                    .setDescription(
                        `Your embed setup has timed out. Please run the command again.`,
                    )
                    .setTimestamp();
                await questionMessage.delete();
                await message.channel.send(tEmbed);
                return message.delete();
            }
            if (collected.first().content.toLowerCase() === 'skip') image = '';
            else if (collected.first().content.toLowerCase() === 'cancel') {
                const cEmbed = new MessageEmbed()
                    .setColor(0x2f3136)
                    .setTitle(`Cancelled!`)
                    .setDescription(`Your embed setup has been cancelled.`)
                    .setTimestamp();
                await collected.first().delete();
                await questionMessage.delete();
                await message.delete();
                return message.channel.send(cEmbed);
            } else image = collected.first().content;
            await collected.first().delete();
            await questionMessage.delete();

            const thumbEmbed = new MessageEmbed()
                .setColor(0x2f3136)
                .setTitle(`Step 7: Thumbnail`)
                .setDescription(
                    `Please select an **URL** of an **image** for your embed, to have a **thumbnail**, write \`skip\` if you don't want a **thumbnail**, or \`cancel\` if you wish to exit setup.`,
                )
                .setFooter(`Step 7 of 8`)
                .setTimestamp();
            questionMessage = await message.channel.send(thumbEmbed);
            collected = await message.channel.awaitMessages(messageFilter, {
                max: 1,
                time: 90000,
            });
            if (collected.size === 0) {
                const tEmbed = new MessageEmbed()
                    .setColor(0x2f3136)
                    .setTitle(`Timed out!`)
                    .setDescription(
                        `Your embed setup has timed out. Please run the command again.`,
                    )
                    .setTimestamp();
                await questionMessage.delete();
                await message.channel.send(tEmbed);
                return message.delete();
            }
            if (collected.first().content.toLowerCase() === 'skip')
                thumbnail = '';
            else if (collected.first().content.toLowerCase() === 'cancel') {
                const cEmbed = new MessageEmbed()
                    .setColor(0x2f3136)
                    .setTitle(`Cancelled!`)
                    .setDescription(`Your embed setup has been cancelled.`)
                    .setTimestamp();
                await collected.first().delete();
                await questionMessage.delete();
                await message.delete();
                return message.channel.send(cEmbed);
            } else thumbnail = collected.first().content;
            await collected.first().delete();
            await questionMessage.delete();

            const footEmbed = new MessageEmbed()
                .setColor(0x2f3136)
                .setTitle(`Step 8: Footer`)
                .setDescription(
                    `Provide me a **footer**, for your embed to have, write \`skip\` if you don't want a **footer**, or \`cancel\` if you wish to exit setup.`,
                )
                .setFooter(`Step 8 of 8`)
                .setTimestamp();
            questionMessage = await message.channel.send(footEmbed);
            collected = await message.channel.awaitMessages(messageFilter, {
                max: 1,
                time: 90000,
            });
            if (collected.size === 0) {
                const tEmbed = new MessageEmbed()
                    .setColor(0x2f3136)
                    .setTitle(`Timed out!`)
                    .setDescription(
                        `Your embed setup has timed out. Please run the command again.`,
                    )
                    .setTimestamp();
                await questionMessage.delete();
                await message.channel.send(tEmbed);
                return message.delete();
            }
            if (collected.first().content.toLowerCase() === 'skip') footer = '';
            else if (collected.first().content.toLowerCase() === 'cancel') {
                const cEmbed = new MessageEmbed()
                    .setColor(0x2f3136)
                    .setTitle(`Cancelled!`)
                    .setDescription(`Your embed setup has been cancelled.`)
                    .setTimestamp();
                await collected.first().delete();
                await questionMessage.delete();
                await message.delete();
                return message.channel.send(cEmbed);
            } else footer = collected.first().content;
            await collected.first().delete();
            await questionMessage.delete();

            const fEmbed = new MessageEmbed()
                .setColor(0x2f3136)
                .setTitle(`Success!`)
                .setDescription(`Your embed has been created in ${message.guild.channels.cache.get(chan)} - \`#${message.guild.channels.cache.get(chan).name}\`!`)
                .setTimestamp(new Date());
                fEmbed.setFooter(bot.user.username, bot.user.avatarURL())
            await message.channel.send(fEmbed);
            const embed = new MessageEmbed()
                embed.setColor(`${color}`)
                embed.setTitle(title)
                embed.setDescription(description)
                embed.setThumbnail((url = thumbnail))
                embed.setFooter(footer)
                embed.setImage((url = image));
                embed.setTimestamp(new Date())
            await bot.channels.cache.get(chan).send(embed);
            message.delete();
            db.get(`ce_${message.guild.id}`)
            db.add(`ce_${message.guild.id}`, 1)
        } catch (e) {
            return message.channel.send(`Oops, Looks like there\'s an error here : \`${e.message}\``);
        }
    }
}
