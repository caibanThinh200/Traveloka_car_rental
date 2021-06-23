const GetBillById = (id) => `SELECT * FROM Bill WHERE id = ${id}`;

const AddBill = ({id, idUser, idSaler, total , address, startDate, endDate, status, idCar, phone,gmail, created_at}) => {
    return `INSERT INTO Bill (id,idUser,id_saler,status,total,address,phone,gmail,startDate,endDate,created_at,idCar) values 
        (
            '${id}',
            '${idUser}',
            '${idSaler}',
            '${status}',
            '${total}',
            '${address}',
            '${phone}',
            '${gmail}',
            '${startDate}',
            '${endDate}',
            '${created_at}',
            '${idCar}'
        )`;
    }

const UpdateBillStatus = (id,status, payment, idStripe) => { 
    return `UPDATE Bill 
    SET status = '${status}'
    ${payment ? `,payment='${payment}'
    ,id_stripe='${idStripe}'` : ""}
    WHERE id = '${id}' `;
}

const DeleteBill = (id) => `DELETE FROM Bill WHERE id='${id}'`; 

const GetListBill = () => 'SELECT Bill.id as idBill,Car.id as idCar FROM Bill,Car WHERE Car.id=Bill.idCar';

const GetBillByIdSaler = id => `SELECT Bill.id as idBill,Car.id as idCar, idUser, idSaler, id_saler, total, startDate, endDate, status, Bill.address,Bill.gmail,Bill.created_at,payment,id_stripe ,name FROM Bill,Car WHERE id_saler='${id}' AND Car.id = Bill.idCar`;

const GetBillByIdUser = id => `SELECT * FROM Bill,Car WHERE idUser='${id}' AND Car.id = Bill.idCar`

const AddNewKPI = ({id, month, year, total, result, target, idSaler}) => 
    `INSERT INTO KPI(id, month, year, total, result, target, idSaler) VALUES (
        '${id}',
        '${month}',
        '${year}',
        '${total}',
        '${result}',
        '${target}',
        '${idSaler}'
    )`;

const GetMonthKPIByYear = (year, saler) => `SELECT * FROM KPI WHERE year=${year} AND idSaler = ${saler}`;
 
module.exports = {
    GetBillById,
    AddBill,
    GetListBill,
    UpdateBillStatus,
    GetBillByIdSaler,
    GetBillByIdUser,
    AddNewKPI,
    GetMonthKPIByYear,
    DeleteBill
}