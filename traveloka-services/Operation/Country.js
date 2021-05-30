const AddCountry = country => `insert into Country (id,name,code) values('${country.id}','${country.name}','${country.code}')`;

const GetCountry = () => 'SELECT * FROM Country';

const GetCountryById = id => `SELECT * FROM Country WHERE id = '${id}'`
module.exports = {
    AddCountry,
    GetCountry,
    GetCountryById
}