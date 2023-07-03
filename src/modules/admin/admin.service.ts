import database from '../../database/connection';

class AdminService{

    async login(username: string, password: string){
        const [admin] = await database.fetchAll('SELECT * FROM admin WHERE username = $1 and password = $2', [username, password])
        return admin
    }
}

export default new AdminService();