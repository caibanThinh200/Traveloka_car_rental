const GetBillById = (id) => `SELECT * FROM Bill WHERE id = ${id}`;

const AddBill = ({id, idUser, idSaler, total , rentalTime, status, listCar, created_at}) => 
    `INSERT INTO Bill (id,idUser,id_saler,status,total,seconds,created_at,car) values 
        (
            '${id}',
            '${idUser}',
            '${idSaler}',
            '${status}',
            '${total}',
            '${rentalTime}',
            '${created_at}',
            '${listCar}'
        )`;

const UpdateBillStatus = (id,status) => `UPDATE Bill 
    WHERE id = '${id}' 
    SET status = '${status}' `;

const GetListBill = () => 'SELECT * FROM Bill';
module.exports = {
    GetBillById,
    AddBill,
    GetListBill,
    UpdateBillStatus
}