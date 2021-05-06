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

module.exports = {
    addCar,
    getCars,
    getCarById
}