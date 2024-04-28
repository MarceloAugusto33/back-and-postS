import 'dotenv/config'
import express, { urlencoded } from 'express';
import cors from 'cors'
import { router } from './routes';

export class Server {
    private server = express()

    constructor() {
        this.server = express();

        this.configuredServer()
        this.setRoutes()

        this.server.listen(process.env.SERVER_PORT, () => {
            console.log("Server running in port" + process.env.SERVER_PORT)
        })
    }

    configuredServer() {
        this.server.use(express.json({ limit: "1mb" }))
        this.server.use(urlencoded({ extended: true }))
        this.server.use(cors())
    }

    setRoutes() {
        this.server.use(router)
    }    
}