const AddDistrict = district => `insert into District (id,name,code,idcity) values('${district.id}','${district.name}','${district.code}','${district.idcity}')`;
const GetDistricts = () => {}

const GetDistrict = () => 'SELECT * FROM District';
module.exports = {
    AddDistrict,
    GetDistrict
}