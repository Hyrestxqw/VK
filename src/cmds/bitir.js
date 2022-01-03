const baseCmd = require("../structures/baseCmd.js")
const shortcuts = require("../structures/shortcuts")
const Discord = require("discord.js")

class baslatCmd extends baseCmd {
    constructor() {
        super({
            name: `Vampir Köylü Bitirme Komutu`,
            usage: `bitir`,
            info: `Vampir Köylü lobisinde devam eden bir oyunu bitirir.`,
            aliases: ["bitirr","end","finish"]
        })
    }
    async execute(client, message, args) {
        let PermissionStatus = await shortcuts.ValidateUser(message, client, "MODERATOR")
        if(PermissionStatus == 201) return;

        let GameInfo = await shortcuts.endGame(message, client)
        if(GameInfo.status == 201) return message.channel.send(GameInfo.message)

        let embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(`Vampir Köylü oyunu \`#${GameInfo.game.GameID}\` bitirildi. ${GameInfo.message}`)
        return message.channel.send(embed)
        


    }
}

module.exports = baslatCmd;

