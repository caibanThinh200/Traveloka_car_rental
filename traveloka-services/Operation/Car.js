const addCar = ({
    id,
    idSaler,
    quantity,
    Seat,
    idManufactor,
    avatar,
    typeCar,
    self_drive_price,
    driver_price,
    insurance,
    created_at,
    name

}) => {
    const insertData = `'${id}','${idSaler}','${quantity}','${name}',
    '${Seat}','${avatar}','${idManufactor}','${typeCar}','${self_drive_price}',
    '${driver_price}','${insurance}','${created_at}'`;
    return `INSERT INTO Car 
        (id,idSaler,quantity,name,Seat,avatar,idManufactor,typeCar,self_drive_price,driver_price,insurance,created_at) 
        VALUES (${insertData})`
}

const getCars = () => "SELECT * FROM Car ";

const getCarById = (id) => `SELECT * FROM Car WHERE id = '${id}'`;

const updateCarById = (id, car) =>
    `UPDATE Car SET 
       name = '${car.name}',
       quantity = '${car.quantity}', 
       Seat = '${car.Seat}', 
       idManufactor = '${car.idManufactor}', 
       typeCar = '${car.typeCar}', 
       self_drive_price = '${car.self_drive_price}',
       driver_price = '${car.driver_price}', 
       insurance = '${car.insurance} '
    WHERE id = '${id}'`
   
const getCarByIdManufactor = (idManufactor) => {
    let listCar = '';
    idManufactor.forEach((id, index) => {
        if (index === 0) {
            listCar = `idManufactor = '${id}'`
        }
        else listCar += ` OR idManufactor = '${id}'`
    });
    return `SELECT * FROM Car WHERE ${listCar}`
}

module.exports = {
    addCar,
    getCars,
    getCarById,
    getCarByIdManufactor,
    updateCarById,
}