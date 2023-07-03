-- admins
CREATE TABLE admin (
    admin_id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(32) NOT NULL,
    password VARCHAR(32) NOT NULL
);

INSERT INTO admin(username, password) VALUES('sabina', '12345678');

-- companies
CREATE TABLE company (
    company_id SERIAL NOT NULL PRIMARY KEY,
    company_name VARCHAR(32) NOT NULL,
    company_img VARCHAR(256) NOT NULL
);

INSERT INTO company(company_name, company_img) VALUES('chevrolet', 'chevrolet.png');


-- cars
CREATE TABLE cars (
    car_id SERIAL NOT NULL PRIMARY KEY,
    car_name VARCHAR(32) NOT NULL,
    car_color VARCHAR(32) NOT NULL,
    car_img VARCHAR(256) NOT NULL,
    car_desc  TEXT NOT NULL,
    car_year timestamp NOT NULL,
    car_cost INT NOT NULL,
    company_id INT REFERENCES company(company_id) 
);

INSERT INTO cars(car_name, car_color, car_img, car_desc, car_year, car_cost, company_id) VALUES('spark', 'red', 'spark.png', 'nice car', '2022/12/02', 100000, 1 );
INSERT INTO cars(car_name, car_color, car_img, car_desc, car_year, car_cost, company_id) VALUES('nexia', 'white', 'nexia.png', 'nice car', '2022/12/02', 100000, 1 );
INSERT INTO cars(car_name, car_color, car_img, car_desc, car_year, car_cost, company_id) VALUES('matiz', 'black', 'matiz.png', 'nice car', '2022/12/02', 500000, 1 );
