const mongoose = require("mongoose");
const moment = require("moment-timezone");
const database = require("../utils/databaseSchema");


/**
 * 
 * @param client Oyunları performans için client'e bağlı önbelleğe alıyoruz.
 * @returns Başarılı ise oyun listesi, hatalı ise hata kodu geri döner.
 */
 async function LoadGames(client){
    return new Promise(async (resolve, reject) => {
        await database.find({}).then(schemas => {

            client.cache.GAME_CACHE = schemas
            client.isReady = true
            resolve(schemas)
        }).catch((err) => {
            reject(err);
        });
    })
}



/**
 * 
 * @returns Yetki kontrolü, engelli veya yetkisi olmayan kullanıcılara 201 hata kodu döner.
 */
async function ValidateUser(message, client, Permission){
    let GameSettings = client.settings.GAME
    if(GameSettings.Host.filter(el => el.Guild == message.guild.id && el.Permission.toLowerCase() == "BLOCKED").map(hostRole => hostRole.Role).some(blocked => message.member.roles.cache.has(blocked)) == true) return 201
    if(GameSettings.Host.filter(el => el.Guild == message.guild.id && (el.Permission == Permission || el.Permission == "ADMIN")).map(hostRole => hostRole.Role).some(allowed => message.member.roles.cache.has(allowed)) == false) return 201
    return 200
}


/**
 * 
 * @param message Discord Message objesi, metin kanalı kontrolü. 
 * @param client Discord Client'i
 * @returns Oyun başlatma durumu.
 */
async function StartGame(message, client){
    let channel = client.settings.GAME.Lobbies.find(el => el.TextChannel == message.channel.id)

    let gameCache = client.cache.GAME_CACHE
    if(gameCache.find(a => a.ServerID === message.guild.id && a.State === "on")){
        return {
            status: 201,
            message: "Bu lobi için devam eden bir oyun bulunmakta. Oyunu bitirip tekrardan başlatmayı deneyiniz."
        }
    }

    let Buffer = new database({
        _id: new mongoose.Types.ObjectId,
        Host: message.author.id,
        Roles: new Map([]),
        LiveMembers: [],
        DeadMembers: [],
        LobbyID: channel.TextChannel,
        VoiceID: channel.VoiceChannel,
        GameID: client.cache.GAME_CACHE.length + 1,
        ServerID: message.guild.id,
        State: "on",
        IGNState: "awaiting-players",
        Start: new Date(),
        End: new Date()
    })

    await Buffer.save()

    client.cache.GAME_CACHE.push(Buffer)

    return {
        status: 200,
        game: Buffer
    }

}


/**
 * 
 * @param message Discord Message objesi, metin kanalı kontrolü. 
 * @param client Discord Client'i
 * @returns Devam eden oyun durumu.
 */
async function GetCurrentGame(message, client){

    let gameCache = client.cache.GAME_CACHE
    let CurrentGame = gameCache.find(a => a.ServerID === message.guild.id && a.State === "on")
    if(!CurrentGame) return 404
    return CurrentGame
}


async function updateGame(client, game){
    let CurrentGame = client.cache.GAME_CACHE.find(a => a.GameID === game.GameID)
    client.cache.GAME_CACHE.splice(client.cache.GAME_CACHE.indexOf(CurrentGame), 1)
    client.cache.GAME_CACHE.push(game)

}


/**
 * 
 * @returns Oyun bitirme kontrol noktası
 */
 async function endGame(message, client){

    let current = await GetCurrentGame(message, client)
    if(current == 404){
        return {
            status: 201,
            message: "Bu lobi için devam eden bir oyun bulunmamakta."
        }
    }

    current.State = "off"
    current.IGNState = "game-ended"
    await current.save()

    let returntext = "Oyun Rolleri:\n\n"
    for(let [k,v] of current.Roles){returntext += `🔸 <@${k}> (${v})\n`}
    return {
        status: 200,
        message: returntext,
        game: current
    }

}



/**
 * 
 * @returns Oyun bitirme kontrol noktası
 */
 async function kill(message, client, member){

    let current = await GetCurrentGame(message, client)
    if(current == 404){
        return {
            status: 201,
            message: "Bu lobi için devam eden bir oyun bulunmamakta."
        }
    }

    if(!current.Roles.has(member.user.id)){
        return {
            status: 201,
            message: "Bu üye oyuna dahil değil. Üyeyi oyuna dahil etmek için `ekle` komutunu kullanın."
        }
    }

    if(current.IGNState !== "roles-given"){
        return {
            status: 201,
            message: "Bu oyunda henüz roller dağıtılmamış. Roller dağıtılmadan bu işlemi gerçekleştiremezsiniz."
        }
    }

    if(!current.LiveMembers.includes(member.user.id)){
        return {
            status: 201,
            message: "Bu oyuncu hayatta değil."
        }
    }

    current.LiveMembers.splice(current.LiveMembers.indexOf(member.user.id), 1)
    current.DeadMembers.push(member.user.id)
    await current.save()


    return {
        status: 200,
        message: `<@${member.user.id}> başarıyla öldürüldü!`,
        game: current
    }




}


/**
 * 
 * @returns Oyuncu canlandırma kontrol noktası
 */
 async function revive(message, client, member){

    let current = await GetCurrentGame(message, client)
    if(current == 404){
        return {
            status: 201,
            message: "Bu lobi için devam eden bir oyun bulunmamakta."
        }
    }

    if(!current.Roles.has(member.user.id)){
        return {
            status: 201,
            message: "Bu üye oyuna dahil değil. Üyeyi oyuna dahil etmek için `ekle` komutunu kullanın."
        }
    }

    if(current.IGNState !== "roles-given"){
        return {
            status: 201,
            message: "Bu oyunda henüz roller dağıtılmamış. Roller dağıtılmadan bu işlemi gerçekleştiremezsiniz."
        }
    }

    if(!current.DeadMembers.includes(member.user.id)){
        return {
            status: 201,
            message: "Bu oyuncu ölü değil."
        }
    }

    current.DeadMembers.splice(current.LiveMembers.indexOf(member.user.id), 1)
    current.LiveMembers.push(member.user.id)
    await current.save()


    return {
        status: 200,
        message: `<@${member.user.id}> başarıyla canlandırıldı!`,
        game: current
    }




}

module.exports = {LoadGames,ValidateUser,StartGame, GetCurrentGame, updateGame, endGame, kill, revive}

