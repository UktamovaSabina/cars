import database from '../../database/connection'

class CompanyService {
    async getAllCompany (){
        const companies = await database.fetchAll('SELECT * FROM company');
        return companies
    }

    async getSingleCompany (companyId: number){
        const company = await database.fetchAll('SELECT * FROM company WHERE company_id= $1', [companyId]);
        return company
    }

    async createCompany (company_name: string, company_img: string){
        const company = await database.fetchAll('INSERT INTO company(company_name, company_img) VALUES($1, $2) RETURNING *', [company_name, company_img])
        return company
    }

    async updateCompany (companyId: number, company_name: string, company_img: string){
        const companies = await this.getAllCompany();
        interface companyQuery {
            company_id: number,
            company_name: string,
            company_img: string
        }
        const foundCompany = companies.find((c: companyQuery) => c.company_id == companyId)
        
        const company = await database.fetchAll('UPDATE company SET company_name = $1, company_img = $2 WHERE company_id = $3 RETURNING *', [company_name? company_name : foundCompany.company_name, company_img? company_img : foundCompany.company_img, companyId])
        return company
    }

    async deleteCompany (companyId: number){
        const company = await database.fetchAll('DELETE FROM company WHERE company_id = $1 RETURNING *', [companyId])
        return company
    }
}

export default new CompanyService();