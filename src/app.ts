import express, {Application, Router} from 'express';

class App {
    private app: Application

    constructor(router: Router){
        this.app = express()

        this.Middlewares()
        this.Routers(router)
    }

    get server(){
        return this.app
    }
    private Middlewares(){
        this.app.use(express.json())
    }
    private Routers(router: Router){
        this.app.use('/', router)
    }
}

export default App;