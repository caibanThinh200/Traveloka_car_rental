const GetBillById = (id) => `SELECT * FROM Bill WHERE id = ${id}`;

const AddBill = ({id, idUser, idSaler, total , address, startDate, endDate, status, idCar, created_at}) => {
    return `INSERT INTO Bill (id,idUser,id_saler,status,total,address,startDate,endDate,created_at,idCar) values 
        (
            '${id}',
            '${idUser}',
            '${idSaler}',
            '${status}',
            '${total}',
            '${address}',
            '${startDate}',
            '${endDate}',
            '${created_at}',
            '${idCar}'
        )`;
    }

const UpdateBillStatus = (id,status) => { 
    return `UPDATE Bill 
    SET status = '${status}'
    WHERE id = '${id}' `;
}

const GetListBill = () => 'SELECT * FROM Bill,Car WHERE Car.id=Bill.idCar';

const GetBillByIdSaler = id => `SELECT * FROM Bill,Car WHERE id_saler='${id}' AND Car.id = Bill.idCar`;

const GetBillByIdUser = id => `SELECT * FROM Bill,Car WHERE idUser='${id}' AND Car.id = Bill.idCar`

module.exports = {
    GetBillById,
    AddBill,
    GetListBill,
    UpdateBillStatus,
    GetBillByIdSaler,
    GetBillByIdUser
}