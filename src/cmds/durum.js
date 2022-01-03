const baseCmd = require("../structures/baseCmd.js")
const shortcuts = require("../structures/shortcuts")
const moment = require("moment-timezone")
const Discord = require("discord.js")

class durumCmd extends baseCmd {
    constructor() {
        super({
            name: `Vampir Köylü Durum Komutu`,
            usage: `durum `,
            info: `Vampir Köylü oyununun genel durumunu gösterir.`,
            aliases: ["status","durumu"]
        })
    }
    async execute(client, message, args) {
        let PermissionStatus = await shortcuts.ValidateUser(message, client, "MODERATOR")
        if(PermissionStatus == 201) return;

        let GameInfo = await shortcuts.GetCurrentGame(message, client)
        if(GameInfo == 404) return message.channel.send(`Vampir Köylü için başlatılmış bir oyun bulunamadı. \`${client.settings.MANAGEMENT.Prefix}başlat\` komutu ile bir oyun başlatınız. `)

        let seperator = "─────────────────────"
        let States = new Map([
            ["awaiting-players","Oyuncular bekleniyor"],
            ["roles-given","Gece"],
            ["gece","Gece"],
            ["sabah","Sabah"],
        ])

        let embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(` **#${GameInfo.GameID}** ID li oyun için durum bilgisi:
        ${seperator}
        • Oyun Yöneticisi: <@${GameInfo.Host}>
        • Oyun Durumu: ${States.get(GameInfo.IGNState) || GameInfo.IGNState}
        • Başlatılma: ${moment(GameInfo.Start).format('Do MMMM HH:mm:ss')}
        • Oyuncu Sayısı: ${GameInfo.Roles.size}

        • Hayattaki Oyuncular: (${GameInfo.LiveMembers.length})
        ${GameInfo.LiveMembers.map(x => `:small_orange_diamond: <@${x}>`).join("\n")}
        
        • Ölü Oyuncular: (${GameInfo.DeadMembers.length})
        ${GameInfo.DeadMembers.map(x => `:small_orange_diamond: <@${x}>`).join("\n")}
        `)

        return message.channel.send(embed)

    }
}

module.exports = durumCmd;

