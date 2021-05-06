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

}) => {
    const insertData = `'${id}','${idSaler}','${quantity}',
    '${Seat}','${avatar}','${idManufactor}','${typeCar}','${self_drive_price}','${driver_price}','${insurance}','${created_at}'`;
    return `INSERT INTO Car (id,idSaler,quantity,Seat,avatar,idManufactor,typeCar,self_drive_price,driver_price,insurance,created_at) VALUES (${insertData})`
}

const getCars = () => "SELECT * FROM Car ";

const getCarById = (id) => `SELECT * FROM Car WHERE id = '${id}'`;

const getSalerInfo = (id) => `SELECT * FROM UserAccount WHERE id='${id}'`;

module.exports = {
    addCar,
    getCars,
    getCarById,
    getSalerInfo
}