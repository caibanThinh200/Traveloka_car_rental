const AddCountry = country => `insert into Country (id,name,code) values('${country.id}','${country.name}','${country.code}')`;

const GetCountry = () => 'SELECT * FROM Country';
module.exports = {
    AddCountry,
    GetCountry
}