const AddDistrict = district => `insert into District (id,name,code,idcity) values('${district.id}','${district.name}','${district.code}','${district.idcity}')`;
const GetDistrictsByIdCar = (id) => `SELECT idDistrict FROM AvailableCar WHERE idCar='${id}'`;
const GetDistrict = () => 'SELECT * FROM District';
const GetDistrictById = (ids) => {
    let districts = '';
    if(ids.length > 0) {
        ids.map((id, index) => {
            if(index === 0) {
                districts += `id ='${id}'`
            }
            else districts += ` OR id ='${id}'`
        })
        return `SELECT * FROM District WHERE ${districts}`;
    }    
}

const GetDistrictByCode = code => `SELECT * FROM District WHERE code='${code}'`;

module.exports = {
    AddDistrict,
    GetDistrict,
    GetDistrictsByIdCar,
    GetDistrictById,
    GetDistrictByCode
}