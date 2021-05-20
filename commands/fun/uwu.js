const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'uwu',
    category: 'fun',
    description: 'changes everything to uwu text',
    aliases: ['uwuify'],
    usage: 'k!uwu <text>',
    run: async(bot, message, args)=>{
        try{
            let uwu_args = args.slice(0).join(' ')
            if(!uwu_args) {
                const error = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to at least provide me some text.\n\nExample :
                \`\`\`fix
k!uwu <text>\`\`\``)
                return message.channel.send(error);
            }
            else if(uwu_args) {
                let uwu_text = uwu_args.replace(/r/g, 'w')
                message.channel.send(uwu_text)
            }
            if(message.author.id === message.author.id){
                message.delete()
            }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}