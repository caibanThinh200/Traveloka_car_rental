const AddManufactor = 
    (insertData) => {
        const {id, name, code, created_at} = insertData
        return `INSERT INTO Manufactor(id ,name ,code , created_at) VALUES 
        (
            '${id}',
            '${name}',
            '${code}',
            '${created_at}'
        )`}
        
const GetManufactor = () => 'SELECT * FROM Manufactor';

const GetManufactorByCode = code => `SELECT * FROM Manufactor WHERE code='${code}'`;

module.exports = {
    AddManufactor,
    GetManufactor,
    GetManufactorByCode
}