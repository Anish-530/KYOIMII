const Discord = require('discord.js');
const reactionPages = async (message, author, options, page, retries) => {
    const restartLoop = async () => { await reactionPages(message, author, options, page, retries); }
    const filter = (reaction, user) => {
        if (options.allowOtherUserReactions) {
            return Object.values(options.emojis).includes(reaction.emoji.name);
        } else {
            return Object.values(options.emojis).includes(reaction.emoji.name) && user.id === author.id;
        }
    }
    
    const collectorOptions = {
        max: 1,
        time: (options.timeLimit * 1000),
        errors: ['time']
    }
    
    message.awaitReactions(filter, collectorOptions)
        .then(async (collected) => {
            const reaction = collected.first();
const minPage = 0;
const maxPage = (options.pages.length - 1);


if (reaction.emoji.name === options.emojis.firstPage) {
    // head back to the first page
if (page === minPage) return restartLoop();

page = minPage;
message = await message.edit(options.pages[minPage]);
return restartLoop();
}

if (reaction.emoji.name === options.emojis.previousPage) {
    // move to the previous page
if (page === minPage) return restartLoop();

page--;
message = await message.edit(options.pages[page]);
return restartLoop();
}

if (reaction.emoji.name === options.emojis.stop) {
    // stop listening
return true;
}

if (reaction.emoji.name === options.emojis.delete) {
    // delete the message (also stops listening)
await message.delete();
const helpd = new Discord.MessageEmbed()
helpd.setThumbnail('https://i.imgur.com/JmFQNiz.gif')
helpd.setColor(0x2f3136)
helpd.setTitle('`Help command deleted!`')
helpd.setDescription('**This message gets deleted after 10 seconds**')
await message.channel.send(helpd).then(message => message.delete({ timeout: 10000 }));
return true;   
}

if (reaction.emoji.name === options.emojis.nextPage) {
    // move to the next page
if (page === maxPage) return restartLoop();

page++;
message = await message.edit(options.pages[page]);
return restartLoop();
}

if (reaction.emoji.name === options.emojis.lastPage) {
   // head forward to the last page
page = maxPage;
message = await message.edit(options.pages[maxPage]);
return restartLoop();      
}

        }).catch(async (error) => {
                if (retries >= options.maximumRetries) {
                    return true;
                } else {
                    retries++;
                    return restartLoop();
                }
        });
}
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'help',
    category: 'info',
    description: 'get a list of all the commands or get details of a specific command',
    aliases: [],
    usage: 'k!help [a specific command]',
    //work on the help command
    run: async(bot, message, args)=>{
        try{
        if(!args[0]) {
        const emojis = {
            firstPage: '⏮',
            previousPage: '◀',
            delete: '🗑',
            nextPage: '▶',
            lastPage: '⏭'
        }
  
        const pages = [
            {
                embed: {
                    color: 0x2f3136,
                    title: 'Use the :arrow_backward: or :arrow_forward: reactions to navigate through the pages and 🗑 to delete the embed.\nUse \`k!help [command]\` to get more information about a specific command.',
                    fields: [
                        {
                            name: '😂 | FUN',
                            value: '\`k!avatar [user]\`\n\`k!cookie <user>\`\n\`k!cookies [user]\`\n\`k!owo <text>\`\n\`k!uwu <text>\`\n'
                        }
                    ]
                }
            },
            {
                embed: {
                    color: 0x2f3136,
                    title: 'Use the :arrow_backward: or :arrow_forward: reactions to navigate through the pages and 🗑 to delete the embed.\nUse \`k!help [command]\` to get more information about a specific command.',
                    fields: [
                        {
                            name: '🤖 | INFO',
                            value: `\`k!help [command]\`\n\`k!invite\`\n\`k!ping\``
                        }
                    ]
                }
            },
            {
                embed: {
                    color: 0x2f3136,
                    title: 'Use the :arrow_backward: or :arrow_forward: reactions to navigate through the pages and 🗑 to delete the embed.\nUse \`k!help [command]\` to get more information about a specific command.',
                    fields: [
                        {
                            name: '⚙ | MODERATION',
                            value: `\`k!ban <user>\`\n\`k!config\`\n\`k!embed\`\n\`k!fetchbans\`\n\`k!mod-log <channel>\`\n\`k!mute <user> [reason]\`\n\`k!muterole <role>\`\n\`k!nuke\`\n\`k!purge [user] <amount>\`\n\`k!setgoodbye <channel>\`\n\`k!setwelcome <channel>\`\n\`k!unban <user ID>\`\n\`k!unmute <user> [reason]\`\n\`k!deletemuterole\`\n\`k!deletegoodbye\`\n\`k!deletewelcome\`\n\`k!deletemod-log\``
                        }
                    ]
                }
            },
        ]
  
        const defaultPage = 0;
        
        const timeLimit = 150000;
        
        const maximumRetries = 3;
        
        const allowOtherUserReactions = false;
        let currentPage = 0;
        let currentRetries = 0;
  
          const msg = await message.channel.send(pages[defaultPage]);
  
          await msg.react(emojis.firstPage);
          await msg.react(emojis.previousPage);
          await msg.react(emojis.delete);
          await msg.react(emojis.nextPage);
          await msg.react(emojis.lastPage);
  
          const options = {
            emojis,
            pages,
            timeLimit,
            maximumRetries,
            allowOtherUserReactions
          }
          await reactionPages(msg, message.author, options, currentPage, currentRetries);
        }else {
            return getCMD(bot, message, args[0]);
        }


    function getCMD(bot, message, input) {
    const embed = new Discord.MessageEmbed()

    const cmd = bot.commands.get(input.toLowerCase()) || bot.commands.get(bot.aliases.get(input.toLowerCase()));
    
    let info = `No information found for command **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info).setFooter('This means that the command you entered was either not found\nor there was mistakes while writing the command\'s name, you can recheck your spelling')).then(message => message.delete({ timeout: 10000 }));
    }
    if (cmd.category) info += `**Category**: ${cmd.category}`;
    if (cmd.name) info = `**Command name**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ") ? cmd.aliases.map(a => `\`${a}\``).join(", ") : 'None'}`;
    if(cmd.timeout) info += `\n**Cooldown**: ${cmd.timeout}s`
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        embed.setFooter(`Syntax: <> = required, [] = optional`);
    }

    return message.channel.send(embed.setColor(0x2f3136).setDescription(info));
}
    }catch(err){
        return message.channel.send('Oops! Looks like something went wrong, You can try again Later.')
      }
}
}
