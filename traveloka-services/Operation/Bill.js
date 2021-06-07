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