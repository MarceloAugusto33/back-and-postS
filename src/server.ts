import 'dotenv/config'
import express from 'express';
import cors from 'cors'

export class Server {
    private server = express()

    constructor() {
        this.server = express();

        this.server.listen(process.env.SERVER_PORT, () => {
            console.log("Server running in port" + process.env.SERVER_PORT)
        })
    }
}