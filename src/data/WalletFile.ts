import {WebDAVClient, WebDAVClientOptions} from "webdav/dist/node/types";
import {DataModel} from "./DataModel";
import {createClient} from "webdav";

export class WalletFile {
    private client: WebDAVClient | null = null;
    private connectionConfig: [string, WebDAVClientOptions] | null = null;
    protected data: DataModel = {};

    constructor() {
        try {
            this.connectionConfig = JSON.parse(localStorage.myWalletConfig);
        } catch(e) {}
    }

    async load() {
        if(this.connectionConfig == null) throw new Error("no_config");

        this.client = createClient(this.connectionConfig[0], this.connectionConfig[1]);
        if(await this.client.exists(".my_wallet.json")) {
            this.data = JSON.parse(await this.client.getFileContents(".my_wallet.json", {
                format: "text"
            }) as string);
        }
    }

    async save() {
        if(!this.client) throw new Error("Not loaded");
        await this.client.putFileContents(".my_wallet.json", JSON.stringify(this.data));
    }

    async configure(url: string, user: string, password: string) {
        this.connectionConfig = [url, {
            username: user,
            password: password,
        }];

        // Check config
        this.client = createClient(this.connectionConfig[0], this.connectionConfig[1]);
        await this.client.getDirectoryContents("/");

        localStorage.myWalletConfig = JSON.stringify(this.connectionConfig);
    }

    isConnectionConfigured(): boolean {
        return this.connectionConfig != null;
    }
}