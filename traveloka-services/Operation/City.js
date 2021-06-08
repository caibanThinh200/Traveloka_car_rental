const AddCity = city => `insert into City (id,name,code,idCountry) values('${city.id}','${city.name}','${city.code}','${city.idCountry}')`;

const GetCityByCode = code => `SELECT * FROM City WHERE code='${code}'`;

const GetCity = () => 'SELECT * FROM City';
module.exports = {
    AddCity,
    GetCity,
    GetCityByCode
}