import database from '../../database/connection'

class CarService {
    async getAllCars() {
        const cars = await database.fetchAll('SELECT * FROM cars');
        return cars
    }

    async getSingleCar(carId: number) {
        const car = await database.fetchAll('SELECT * FROM cars WHERE car_id= $1', [carId]);
        return car
    }

    async createCar(car_name: string, car_color: string, car_img: string, car_desc: string, car_year: Date, car_cost: number, company_id: number) {
        const car = await database.fetchAll('INSERT INTO cars(car_name, car_color, car_img, car_desc, car_year, car_cost, company_id) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', [car_name, car_color, car_img, car_desc, car_year, car_cost, company_id])
        return car
    }

    async updateCar(carId: number, car_name: string, car_color: string, car_img: string, car_desc: string, car_year: Date, car_cost: number, company_id: number) {
        const cars = await this.getAllCars();
        interface carQuery {
            car_id: number,
            car_name: string, 
            car_color: string, 
            car_img: string, 
            car_desc: string, 
            car_year: Date, 
            car_cost: number, 
            company_id: number
        }
        const foundCar = cars.find((c: carQuery) => c.car_id == carId)

        const car = await database.fetchAll('UPDATE cars SET car_name = $1, car_color = $2, car_img = $3, car_desc = $4, car_year = $5, car_cost = $6, company_id = $7 WHERE car_id = $8 RETURNING *', 
        [car_name? car_name : foundCar.car_name, car_color? car_color : foundCar.car_color, car_img? car_img : foundCar.car_img, car_desc? car_desc : foundCar.car_desc, car_year? car_year : foundCar.car_year, car_cost? car_cost : foundCar.car_cost, company_id? company_id : foundCar.company_id, carId])
        return car
    }

    async deleteCar (carId: number){
        const car = await database.fetchAll('DELETE FROM cars WHERE car_id = $1 RETURNING *', [carId])
        return car
    }
}

export default new CarService();