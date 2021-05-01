const getUsers = () => "SELECT * FROM UserAccount";

const addUser = ({ id, fullname, phoneNum, gmail, password, role, company, created_at }) =>
    `INSERT INTO UserAccount (id, fullname, phoneNum, gmail, password, role, company, created_at) values (
        '${id}',
        '${fullname}',
        '${phoneNum}',
        '${gmail}',
        '${password}',
        '${role}',
        '${company}',
        '${created_at}'
    )`;

const getUserByGmail = (gmail) =>
    `SELECT * FROM UserAccount WHERE gmail = '${gmail}'`

const getUserById = (id) =>
    `SELECT * FROM UserAccount WHERE id = '${id}'`


module.exports = {
    getUsers,
    addUser,
    getUserByGmail,
    getUserById
}