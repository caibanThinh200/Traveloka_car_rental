const AddManufactor = 
    ({ id, name, code, created_at }) => 
        `INSERT INTO Manufactor(id ,name ,code , created_at) VALUES 
        (
            '${id}',
            '${name}',
            '${code}',
            '${created_at}'
        )`
        
const GetManufactor = () => 'SELECT * FROM Manufactor';

module.exports = {
    AddManufactor,
    GetManufactor
}