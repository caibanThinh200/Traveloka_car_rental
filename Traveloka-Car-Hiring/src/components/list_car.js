import { useEffect, useState } from 'react';
import '../css/admin.css'
import React from 'react'
import axios from 'axios'
import { Modal, message, Form, Input, InputNumber, Skeleton } from 'antd'
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 15 },
};
const ListCar = () => {
    const [listCar, setListCar] = useState([])
    const [brand, setBrand] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [idVehicle, setIdVehicle] = useState('')
    const [idCategory, setIdCategory] = useState('')
    const [idManufactor, setIdManufactor] = useState('')
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isVisible, setIsvisible] = useState(false);
    const [idDelete, setIdDelete] = useState('')

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleClose = () => {
        setIsvisible(false);
    };
    const confirmDelete = (id) => {
        setIsModalVisible(true);
        setIdDelete(id)
    }
    const handleEditVehicle = (idVehicle, name, price, quantity, idCategory, idManufactor) => {
        setIdVehicle(idVehicle)
        setName(name)
        setPrice(price)
        setQuantity(quantity)
        setIdCategory(idCategory)
        setIdManufactor(idManufactor)
        setIsvisible(true)
    }
    const onNameChange = (e) =>{
        setName(e.target.value)
        console.log(name)
    }
    const onPriceChange = (value) =>{
        setPrice(value)
        console.log(price)
    }
    const onQuantityChange = (value) =>{
        setQuantity(value)
        console.log(quantity)
    }
    const onEdit = ()=>{
        const data = {
            idVehicle: idVehicle,
            name: name,
            price: price,
            quantity: quantity,
            idCategory: idCategory,
            idManufactor: idManufactor,
        }
        console.log(data)
        try {
            axios.put(`https://mighty-meadow-74982.herokuapp.com/vehicle/${idVehicle}`)
            .then(response=>{
                console.log(response)
                setIsvisible(false)
                message.success('Cập nhật thành công')
            })
        } catch (error) {
            console.log(error)
        }
    }
    const onDelete = (id) => {
        console.log(id)
        try {
            axios.delete(`https://mighty-meadow-74982.herokuapp.com/vehicle/${id}`)
                .then(response => {
                    console.log(response)
                    message.success('Đã xoá thành công!')
                })
        } catch (error) {
            console.log(error)
        }
        handleCancel()
    }
    useEffect(() => {
        try {
            axios.get("https://mighty-meadow-74982.herokuapp.com/vehicle/")
                .then(response => {
                    setListCar(response.data.data)
                })
            axios.get("https://mighty-meadow-74982.herokuapp.com/manufactor")
                .then(response => {
                    setBrand(response.data.data)
                })
        } catch (error) {
            console.log(error)
        }
    }, [JSON.stringify(listCar)])
    return (
        <div className="container-fluid component">
            <div className="row">
                <div className="col-12">
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Stt</th>
                                <th scope="col">Tên xe</th>
                                <th scope="col">Hãng xe</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Modal footer={null} title="Bạn có chắc muốn xoá?" visible={isModalVisible} onOk={handleCancel} onCancel={handleCancel}>
                                <p> {idDelete} </p>
                                <div className="modal-btn">
                                    <button className="btn-delete" onClick={() => onDelete(idDelete)}>ĐỒNG Ý</button>
                                </div>
                            </Modal>
                            <Modal footer={null} title="Sửa thông tin xe" visible={isVisible} onOk={handleClose} onCancel={handleClose}>
                                <div className="car-infor shadow rounded-3" style={{padding:'10px 20px', marginBottom:'15px', background:'orange', color:'white'}}>
                                    <h5 className="text-light">Thông tin hiện tại:</h5>
                                    <ul>
                                        <li><b>Tên xe: </b> {name} </li>
                                        <li><b>Giá:</b> {price} </li>
                                        <li><b>Số lượng: </b> {quantity} </li>
                                    </ul>
                                </div>
                                <Form
                                    {...layout}
                                    className="edit-form"
                                    name="basic"
                                    style={{ backgroundColor: '#fff', boxShadow: '1px 5px 15px rgba(0, 0, 0, 0.2)', borderRadius: '7px', overflow: 'hidden' }}
                                    initialValues={{ remember: true}}
                                    onFinish={onEdit}
                                >
                                    <Form.Item
                                        label="Tên xe"
                                        name="name"
                                        rules={[{ required: true, message: 'Vui lòng nhập tên xe' }]}
                                        style={{marginTop:'30px'}}
                                    >
                                        <Input name="name" onChange={onNameChange} placeholder="Nhập tên xe" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Giá"
                                        name="price"
                                        rules={[{ required: true, message: 'Vui lòng nhập giá tiền' }]}
                                    >
                                        <InputNumber placeholder="Nhập giá tiền" name="price" value={price} style={{ width: '100%' }} onChange={onPriceChange} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Số lượng"
                                        name="quantity"
                                        rules={[{ required: true, message: 'Vui lòng nhập số lượng xe' }]}
                                    >
                                        <InputNumber placeholder="Nhập số lượng xe" name="quantity"  value={quantity} style={{ width: '100%' }} onChange={onQuantityChange} />
                                    </Form.Item>
                                    <Form.Item  {...tailLayout}>
                                        <button style={{ float:'right', backgroundColor:'orange', color:'white'}} type="submit" className="btn">Chỉnh sửa</button>
                                    </Form.Item>
                                </Form>
                            </Modal>
                            {listCar.length > 0 ? listCar.map((car, index) => {
                                return (
                                    <tr>
                                        <th scope="row"> {index} </th>
                                        <td> {car.name}</td>
                                        {brand.map(br => {
                                            if (car.idManufactor === br.idManufactor) {
                                                return (<td>{br.name}</td>);
                                            }
                                        })}
                                        <td> ${car.price} / Ngày</td>
                                        <td> {car.quantity}</td>
                                        <td>
                                            <button onClick={() => { confirmDelete(car.idVehicle) }} className="btn-delete"><i class="fal fa-trash-alt"></i></button>
                                            <button onClick={() => { handleEditVehicle(car.idVehicle, car.name, car.price, car.quantity, car.idCategory, car.idManufactor) }} className="btn-edit"><i class="fal fa-edit"></i></button>
                                        </td>
                                    </tr>
                                );
                            }):
                            <Skeleton width={700} style={{backgroundColor:"black"}} active/>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default ListCar