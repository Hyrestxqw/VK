
## Vampir Köylü Eğlence Botu

Kendi sunucum olan [Atlantis'te](https://discord.gg/atl) 3 yıl boyunca oynatılan Vampir köylü botunu birkaç ufak düzenleme sonucunda herkese açık yapmaya karar verdim. Bu bot sayesinde sunucularda Vampir Köylü oynatılabilir, hızlı bir şekilde bot kurulup yeniden geliştirilebilir. Yazılım dili olarak `Javascript` ve kütüphane olarak `discord.js` kullandım.


### Bot Kurulumu

- Botu kullanmak için `BİR BOTA` ve `BİR MONGODB` anahtarına sahip olmanız gerekiyor.
- Kodu ZIP olarak indirin ve klasör olarak çıkarın.
- Herhangi bir terminal veya konsol açarak `npm install` komutunu kullanın.
- `settings.js` dosyasını (ana kaynaktaki) açın ve yönergelere göre düzenleyin.
- Kısacası, ayarlar dosyanızda bunların olması zorunludur.
```js
module.exports = {

MANAGEMENT: {
        BotOwners: ["USER_ID"],
        AllowedServers: ["SUNUCU_ID"],
        Prefix: "BOT_PREFIXI",
        Token: "BOT_TOKENI",
        MongoURI: "MONGO_URI_ANAHTARI"
},

LOGS: {
        GameLogs: true,
        ChatLogs: true
},

GAME: {
        Lobbies: [
            {TextChannel: "VK LOBISI METIN KANALI", VoiceChannel: "VK LOBISI SES KANALI"}
        ],
        Host: [
            {Guild: "SUNUCU ID", Role: "ROL ID", Permission: "YETKİ DÜZEYİ"},
            {Guild: "", Role: "", Permission: "ADMIN"},
            {Guild: "", Role: "", Permission: "MODERATOR"},
            {Guild: "", Role: "", Permission: "BLOCKED"},
        ],      
}

}
```


- Ufak bir örneği kodun içinde bıraktım, bu sadece göstermeliktir!!


### Komutlar ve Örnek Kullanımları

| Komut Adı    	| Syntax                             	| Örnek                                       	|
|--------------	|------------------------------------	|---------------------------------------------	|
| Başlatma     	| vk!baslat                          	| vk!baslat                                   	|
| Rol Dağıtma  	| vk!roller [<ÜyeSayısı><RolAdı>...] 	| vk!roller 8Köylü 3Vampir 1Arsonist 1Doktor  	|
| Öldürme      	| vk!olu <@user/id>                  	| vk!olu @Toasty#0001                         	|
| Canlandırma  	| vk!hayatta <@user/id>              	| vk!hayatta @Toasty#0001                     	|
| Oyun Durumu  	| vk!durum                           	| vk!durum                                    	|
| Oyun Bitirme 	| vk!bitir                           	| vk!bitir                                    	|

### Başka Sorunuz Varsa?
Atlantis'te VK oynayarak botu öğrenebilirsiniz <3 :)

### Aptal Değilsen
Botu ben yaptım wow diye gezme 3 senedir Atlantis'te oynatılan bot kimse seni alkışlamayacak paşalar gibi sunucunda botunu oynat eğlen az