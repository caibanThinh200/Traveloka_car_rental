const carSchema = () => `create table Car (
    id varchar(255) primary key,
    idSaler varchar(255) not null,
    quantity int,
    HiredCount int default 0,
    HiringCount int default 0,
    Seat int,
    idManufactor varchar(255) not null,
    avatar varchar(255) ,
    typeCar nvarchar(255) not null,
    self_drive_price int,
    driver_price int,
    insurance nvarchar(255),
    created_at varchar(255),
    updated_at varchar(255)
   )`
 
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
   
const getCarByIdManufactor = idManufactor => {
    let listCar = '';
    idManufactor.forEach((id, index) => {
        if (index === 0) {
            listCar = `idManufactor = '${id}'`
        }
        else listCar += ` OR idManufactor = '${id}'`
    });
    return `SELECT * FROM Car WHERE ${listCar}`
}

const getCarsByIdDistrict = idDistrict => `SELECT * FROM AvailableCar WHERE idDistrict = '${idDistrict}'`;

const getDistrictsByIdCity = idCity => `SELECT * FROM District WHERE idCity = '${idCity}'`;

const addDistrictAvailable = (idCar,idDistrict) => `INSERT INTO  AvailableCar(idCar,idDistrict) VALUES ('${idCar}','${idDistrict}')`;

const getCarByIdsDistrict = idDistrict => {
    let listIds = '';
    if(idDistrict.length > 0) {
        idDistrict.forEach((id,index) => {
            console.log(`${id} --- ${index}`)
            if (index === 0) {
                listIds = `id = '${id}'`
            }
            else listIds += ` OR id = '${id}'` 
        });
        console.log(`SELECT * FROM Car WHERE ${listIds}`);
        return `SELECT * FROM Car WHERE ${listIds}`
    }
}

module.exports = {
    addCar,
    getCars,
    getCarById,
    getCarByIdManufactor,
    updateCarById,
    carSchema,
    addDistrictAvailable,
    getCarsByIdDistrict,
    getDistrictsByIdCity,
    getCarByIdsDistrict
}