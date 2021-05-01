import '../css/carRental.css';
import 'antd/dist/antd.css';

import React, { useEffect, useState } from 'react';
import Car from './car';
import axios from 'axios';
import Category from './filter';

function CarRental(){
    const [listCar, setListCar] = useState({
        cars: [],
    })
    const [newListCar, setNewListCar] = useState({
        cars: listCar.cars,
    })
    const [dateStart, setDateStart] = useState()
    const [dateEnd, setDateEnd] = useState()
    const [city, setCity] = useState()
    useEffect(()=>{
        const date1 = localStorage.getItem('DateStart')
        setDateStart(date1)
        const date2 = localStorage.getItem('DateEnd')
        setDateEnd(date2)
        const place = localStorage.getItem('City')
        setCity(place)
    },[])
    
     const getFilter = (idCate, sort) =>{
        const newArr = [];
        listCar.cars.forEach(newCar=>{
            if(idCate === newCar.idCategory){
                newArr.push(newCar);
                if(sort == true){
                    newArr.sort((a,b)=>{
                        return a.price - b.price;
                    })
                    setNewListCar({cars: [...newArr]})
                }
                if(sort == false){
                    newArr.sort((a,b)=>{
                        return b.price - a.price;
                    })
                    setNewListCar({cars: [...newArr]})
                }
            }
            else{
                setNewListCar({cars: [...newArr]})
            }
        })
    }
    const showAll = () =>{
        setNewListCar({cars: listCar.cars})
    }
    useEffect(()=>{
        try {
            console.log(listCar);
            axios.get(`https://mighty-meadow-74982.herokuapp.com/vehicle/`)
            .then(response =>{
                setListCar({
                    cars: response.data.data
                })
                setNewListCar({
                    cars: response.data.data
                })
            })
        } catch (error) {
            console.log(error)
        }       
    },[])

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="banner">
                </div>
            </div>
            <div className="container main">
                <div className="row">
                    <div className="form-container infor">
                        <p>Thuê xe / Thuê xe tự lái</p>
                        <h5>Thuê xe tự lái</h5>
                        <p style={{fontWeight:'bold', marginTop: '15px', color:'grey'}}><span style={{marginRight:'10px', fontSize: '20px'}}>Thành phố {city}</span> <span>{dateStart} đến {dateEnd} </span> </p>
                    </div>
                </div>
                <div className="row">
                <div className="col-3">
                    <Category showAll = {showAll} getFilter = {getFilter}/>
                </div>
                <div className="col-9">
                    <h6>Tìm thấy {newListCar.cars.length} loại xe</h6>
                    {newListCar.cars.map(items=>(
                        items?<Car key={listCar.cars.idVehicle} car = {items}/>: <p>Không tìm thấy xe</p>
                    ))}
                </div>
            </div>    
            </div>
        </div>
    );
}
export default CarRental