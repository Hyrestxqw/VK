class baseCmd {
    constructor(args = {}) {
        this.name = args.name || "";
        this.usage = args.usage || "";
        this.info = args.info || "";
        this.aliases = args.aliases || [];
    }
    get isCmd() {
        return true;
    }

    execute(client, message, args) {

    }

}

module.exports = baseCmd;
