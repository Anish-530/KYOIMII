const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
module.exports={
    name: 'owo',
    category: 'fun',
    description: 'changes everything to owo text',
    aliases: ['owoify'],
    usage: 'k!owo <text>',
    run: async(bot, message, args)=>{
        try{
            let owo_args = args.slice(0).join(' ')
            if(!owo_args) {
                const error = new Discord.MessageEmbed()
                .setTitle(`<:notgood:776121645709525002> Looks like there is an Issue!`)
                .setColor(0x2f3136)
                .setDescription(`You have to at least provide me some text.\n\nExample :
                \`\`\`fix
k!owo <text>\`\`\``)
                return message.channel.send(error);
            }
            else if(owo_args) {
                let owo_text = owo_args.replace(/r/g, 'w')
                message.channel.send(owo_text)
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