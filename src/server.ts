import http from 'http';
import App from './app';
import router from './routes';

const app = new App(router);

const server = http.createServer(app.server);

server.listen(5500, ()=> {console.log('port is running in 5500')})