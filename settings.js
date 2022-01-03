module.exports = {
    MANAGEMENT: {
        /**
         * @BotOwners Bot sahiplerinin kullanıcı ID listesi.
         * @AllowedServers Bot komutlarını çalıştırmaya izni olan sunucu ID listesi. 
         * @Prefix Bot prefixi.
         * @Token Bot tokeni.
         * @MongoURI MongoDB bağlantı anahtarı.
         */
        BotOwners: [],
        AllowedServers: ["670600220589031424"], // !! Burada olmayan bir sunucuda komutlar cevap vermez. !!
        Prefix: "vk!",
        Token: "NtKKDXkacvb238vasv.XSgynw.8cvnx9asmc9vzc9vbb0q2cavsedgf", // Örnek token istersen dene :D
        MongoURI: "mongodb+srv://kedi:kedi@kedi-eorpn.mongodb.net/kedi?retryWrites=true" // Örnek URI istersen dene :D
    },


    LOGS: {
        /**
         * @GameLogs Biten oyunların oyun bilgisinin loglanacağı kanal ID'si.
         * @ChatLogs Biten oyunların metin kayıtlarının loglanacağı kanal ID'si.
         */
        GameLogs: true,
        ChatLogs: true
    },

    GAME: {
        /**
         * Botun eşleşeceği oyun lobileri, her bir metin kanalı yanındaki ses kanalına ait bir lobi olur.
         */
        Lobbies: [
            {TextChannel: "916875735036199002", VoiceChannel: "920596475749232681"}
        ],

        /**
         * Bot komutunu kullanabilecek rolleri belirtiniz, burada tanımlanmamış roldeki üyeler sadece "Durum" komutunu kullanabilir.
         * @ADMIN Tüm oyunları yönetebilir, bitirebilir. Her komutta tam izine sahiptir.
         * @MODERATOR Sadece kendi başlattığı oyunu yönetebilir.
         * @BLOCKED Komutlardan engellenen roldür, hiçbir komutu kullanamaz.
         * 
         * @param Guild Belirtilen rolün sunucu ID'si.
         * @param Role Belirtilen rolün ID'si.
         * @param Permission Belirtilen rolün sahip olduğu izin. İzinler hakkıında bilgi için biraz üste bakınız.
         */

        Host: [
            {Guild: "670600220589031424", Role: "900507157655613521", Permission: "ADMIN"},
            {Guild: "", Role: "", Permission: "MODERATOR"},
            {Guild: "", Role: "", Permission: "BLOCKED"},

        ],        
    }
}

