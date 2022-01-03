const baseCmd = require("../structures/baseCmd.js")
const shortcuts = require("../structures/shortcuts")
const Discord = require("discord.js")

class baslatCmd extends baseCmd {
    constructor() {
        super({
            name: `Vampir Köylü Oyuncu Canlandırma Komutu`,
            usage: `hayatta <@user/id>`,
            info: `Vampir Köylü lobisinde ölü olan bir oyuncuyu canlandırır.`,
            aliases: ["hayata","canlandır","canlandir","canlı","canli"]
        })
    }
    async execute(client, message, args) {
        let PermissionStatus = await shortcuts.ValidateUser(message, client, "MODERATOR")
        if(PermissionStatus == 201) return;

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.channel.send("Bir üye etiketle ve tekrardan dene!") 

        let GameInfo = await shortcuts.revive(message, client, member)
        if(GameInfo.status == 201) return message.channel.send(GameInfo.message)

        let embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(GameInfo.message)
        return message.channel.send(embed)
        


    }
}

module.exports = baslatCmd;

