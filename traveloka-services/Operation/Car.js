const addCar = ({
    id,
    idSaler,
    quantity,
    Seat,
    idManufactor,
    //avatar,
    typeCar,
    self_drive_price,
    driver_price,
    insurance,
    created_at,
    
}) => { 
    const insertData = `'${id}','${idSaler}','${quantity}',
    '${Seat}','${idManufactor}','${typeCar}','${self_drive_price}','${driver_price}','${insurance}','${created_at}'`;
    return `INSERT INTO Car (id,idSaler,quantity,Seat,idManufactor,typeCar,self_drive_price,driver_price,insurance,created_at) VALUES (${insertData})`
}

const getCars = () => "SELECT * FROM Car ";
const getCarById = (id) => `SELECT * FROM Car WHERE id = '${id}'`;
const updateCarById = (id,{car}) => {
    return `UPADATE Car SET name = ${car.name} quantity = ${car.quantity}, Seat = ${car.Seat}, idManufactor = ${car.idManufactor}, typeCar = ${car.typeCar}, self_drive_price = ${car.self_drive_price}, driver_price = ${car.driver_price}, insurance = ${car.insurance} WHERE id = ${id}`
}
const getCarByIdManufactor = (idManufactor) =>{
    idManufactor = [];
    let query = '';
    let queryStr = '';
    idManufactor.forEach(element => {
        query = `OR idManufactor = ${element} `
        queryStr = queryStr.concat(query)
    });
    return `SELECT * FROM Car WHERE  ${queryStr}.replace('OR','')`
}
module.exports = {
    addCar,
    getCars,
    getCarById,
    getCarByIdManufactor,
    updateCarById,
}