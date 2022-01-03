const Discord = require("discord.js");
const fs = require("fs");
const mongoose = require("mongoose");
const moment = require("moment-timezone");

const client = new Discord.Client({disableEveryone: true});
moment.locale('tr');
moment.tz.setDefault("Europe/Istanbul");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.settings = require("./settings")
client.cache = {
    GAME_CACHE: []
}
client.isReady = false

try {
    fs.readdir("./src/cmds/", (err, cmds) => {
        cmds.forEach(cmdFile => {
            const cmdClass = require(`./src/cmds/${cmdFile}`);
            const cmd = new cmdClass;
            client.commands.set(cmdFile.split(".")[0], cmd);
            cmd.aliases.forEach(a => {
                client.aliases.set(a, cmd);
            })
        });

    })



    fs.readdir("./src/events/", (err, events) => {
        events.forEach(eventFile => {
            const event = require(`./src/events/${eventFile}`);
            client.on(eventFile.split(".")[0], event.bind(null, client))
            delete require.cache[require.resolve(`./src/events/${eventFile}`)]
        });
    })

} catch (err) {
    console.error(err);

}

client.login(client.settings.MANAGEMENT.Token)
mongoose.connect(client.settings.MANAGEMENT.MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

