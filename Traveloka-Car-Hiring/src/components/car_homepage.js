import '../css/carRental.css'
import { DatePicker, Select, TimePicker } from 'antd'
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { image } from "./dummy"
import axios from 'axios';
function Imglink() {

    return (
        <Fragment>
            {image.imageBrand.map(item => (
                <div className="img-box">
                    <img src={item} alt="" key={1} />
                </div>
            ))}
        </Fragment>
    );
}
const dateFormat = 'YYYY/MM/DD';

function CarHomePage() {
    const { Option } = Select
    const [city, setCity] = useState("");
    const [idCity, setIdCity] = useState([]);
    const [cities, setCities] = useState([]);
    const onDateStartChange = (date, dateString) => {
        localStorage.setItem('DateStart', dateString)
    }
    const onDateEndChange = (date, dateString) => {
        localStorage.setItem('DateEnd', dateString)
    }
    const onPlaceChange = value => {
        console.log(value);
        //localStorage.setItem('City', value)
        setCity(value[0]);
        setIdCity(value[1]);
    }
    const carFilter = () => {
        const idCityBody = {
            idCity:idCity
        }
        axios.post("https://mighty-meadow-74982.herokuapp.com/vehicle/available/place",idCityBody)
        .then(res=>localStorage.setItem("vehicle",JSON.stringify(res.data.vehicles)))
    }
    useEffect(() => {
        axios.get("https://mighty-meadow-74982.herokuapp.com/city")
            .then(res => {
                if (res.data) {
                    setCities(res.data.cities)
                }
            })
    }, [])
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="banner">

                </div>
            </div>
            <div className="container main">
                <div className="form-container">
                    <form className="find-car-form">
                        <div className="form-header">
                            <label htmlFor="select">Có tài xế hay xe tự lái?</label>
                            <select name="driver" id="select">
                                <option value="noDriver">Tự lái</option>
                                <option value="Diver">Có tài xế</option>
                            </select>
                        </div>
                        <div className="form-body">
                            <label htmlFor="place">Địa điểm thuê xe của bạn</label>
                            <Select
                                style={{ width: 400 }}
                                onChange={onPlaceChange}
                                placeholder="Điền thành phố, sân bay hoặc khách sạn">
                                {
                                    cities.length > 0 ? cities.map((city, index) =>
                                        <Option 
                                            key={city.idCity} 
                                            value={[city.name,city.idCity]}>{city.name}
                                        </Option>
                                    ) : <div>loading....</div>
                                }
                            </Select>
                            <div className="container-fluid bg-white">
                                <div className="row">
                                    <div className="col-6 col-md-3">
                                        <label htmlFor="startDate">Ngày bắt đầu</label>
                                        <DatePicker onChange={onDateStartChange} id="startDate" format={dateFormat} />
                                    </div>
                                    <div className="col-6 col-md-2">
                                        <label htmlFor="timeStart">Giờ bắt đầu</label>
                                        <TimePicker />
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <label htmlFor="startDate">Ngày kết thúc</label>
                                        <DatePicker onChange={onDateEndChange} id="startDate" format={dateFormat} />
                                    </div>
                                    <div className="col-6 col-md-2">
                                        <label htmlFor="timeStart">Giờ kết thúc</label>
                                        <TimePicker />
                                    </div>
                                    <div className="col-6 col-md-2 form-btn">
                                        <Link to="/vehicles" onClick={carFilter}>Tim xe</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="introduction">
                            <h4>Các đối tác cho thuê xe</h4>
                            <h5>Các đối tác cho thuê xe yêu thích của bạn</h5>
                            <p>Chúng tôi hợp tác với các đối tác cho thuê xe uy tín trên toàn thế giới để đưa bạn đến bất kỳ nơi nào bạn muốn</p>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="brands">
                            <Imglink />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CarHomePage