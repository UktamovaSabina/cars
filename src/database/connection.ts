import { Pool } from 'pg';

class Database {
    private pool: Pool

    constructor() {
        this.pool = new Pool({
            user: 'postgres',
            password: 'sa12bi05na02Postgres',
            host: 'localhost',
            database: 'cars',
            port: 5432
        })
    }

    public async fetchAll(SQL: string, params: any[] = []): Promise<any> {
        const client = await this.pool.connect()
        try {
            const { rows } = await client.query(SQL, params)
            return rows
        } catch (error) {
            console.log(error);
        }
        finally {
            client.release()
        }
    }
}

export default new Database();