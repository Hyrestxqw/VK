const baseCmd = require("../structures/baseCmd.js")
const shortcuts = require("../structures/shortcuts")
const Discord = require("discord.js")

class baslatCmd extends baseCmd {
    constructor() {
        super({
            name: `Vampir Köylü Başlatma Komutu`,
            usage: `baslat`,
            info: `Vampir Köylü lobisinde yeni bir oyun başlatır.`,
            aliases: ["başlat","start"]
        })
    }
    async execute(client, message, args) {
        let PermissionStatus = await shortcuts.ValidateUser(message, client, "MODERATOR")
        if(PermissionStatus == 201) return;

        let GameInfo = await shortcuts.StartGame(message, client)
        if(GameInfo.status == 201) return message.channel.send(GameInfo.message)

        let embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(`Vampir Köylü için yeni bir oyun \`#${GameInfo.game.GameID}\` ID'si ile başlatıldı. Roller dağıtılınca oyun başlayacaktır.`)
        return message.channel.send(embed)
        


    }
}

module.exports = baslatCmd;

