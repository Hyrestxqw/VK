

module.exports = async (client, message) => {
    const prefix = client.settings.MANAGEMENT.Prefix

    if(!message.guild || message.author.bot) return

    if(!client.settings.MANAGEMENT.AllowedServers.includes(message.guild.id)) return
    if(!client.settings.GAME.Lobbies.find(el => el.TextChannel == message.channel.id)) return

    if(!message.content.toLowerCase().startsWith(prefix)) return 

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();

    const cmd = client.commands.get(cmdName) || client.aliases.get(cmdName);
    if(!cmd) return

    return cmd.execute(client, message, args);

    

}

