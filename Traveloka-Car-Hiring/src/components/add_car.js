import { Form, Input, InputNumber, Select, Modal } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios'
const { Option } = Select
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const AddCar = () => {
    const [category, setCategory] = useState([])
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [idCategory, setIdCategory] = useState('')
    const [idManufactor, setIdManufactor] = useState('')
    const [brand,setBrand] = useState([])
    useEffect(()=>{                                                         
        try {
            axios.get("https://mighty-meadow-74982.herokuapp.com/cate")
                .then(response=>{
                    setCategory(response.data.data)
                    console.log(category)
                })
        } catch (error) {
            console.log(error)
        }
    },[])
    useEffect(()=>{
        try {
            axios.get("https://mighty-meadow-74982.herokuapp.com/manufactor")
            .then(response=>{
                setBrand(response.data.data)
                console.log(response.data.data)
            })
        } catch (error) {
            console.log(error)
        }
    },[])
    const onIdManufactorChange = (value) =>{
        setIdManufactor(value.value)
        console.log(value.value)
    }
    const onIdCategoryChange = (value) =>{
        setIdCategory(value.value)
        console.log(value.value)
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
    const handleCreateCar = () =>{
        try {
            const data = {
                name: name,
                price: price,
                quantity: quantity,
                idCategory: idCategory,
                idManufactor: idManufactor,
            }
            axios.post('https://mighty-meadow-74982.herokuapp.com/vehicle', data)
                .then(response=>{
                    Modal.success({
                        content: response.data.result,
                        onOk: ()=>{
                            document.querySelectorAll(Input).value = null
                        }
                    })
                    console.log(response)
                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container-fluid component">
            <div className="row" >
                <div className="form">
                    <Form
                        {...layout}
                        name="basic"
                        style={{backgroundColor: '#fff', boxShadow:'1px 5px 15px rgba(0, 0, 0, 0.2)', borderRadius:'7px', overflow:'hidden',margin:'auto', maxWidth:'700px'}}
                        initialValues={{ remember: false }}
                        onFinish={handleCreateCar}
                    >
                        <Form.Item className="form-header"><h5>Thêm xe mới</h5></Form.Item>
                        <Form.Item
                            label="Tên xe"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên xe' }]}
                        >
                            <Input name="name" value={name} onChange={onNameChange} placeholder="Nhập tên xe"/>
                        </Form.Item>

                        <Form.Item
                            label="Giá"
                            name="price"
                            rules={[{ required: true, message: 'Vui lòng nhập giá tiền' }]}
                        >
                            <InputNumber placeholder="Nhập giá tiền" name="price" value={price} style={{width:'40%'}} onChange={onPriceChange}/>
                        </Form.Item>
                        <Form.Item
                            label="Số lượng"
                            name="quantity"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng xe' }]}
                        >
                            <InputNumber placeholder="Nhập số lượng xe" name="quantity" value={quantity} style={{width:'40%'}} onChange={onQuantityChange} />
                        </Form.Item>
                        <Form.Item
                            label="Số chỗ ngồi"
                            name="idCategory"
                            rules={[{ required: true, message: 'Vui lòng chộn số chỗ ngồi' }]}
                        >
                            <Select
                                labelInValue
                                placeholder="Số chỗ"
                                onChange={onIdCategoryChange}
                                name="idCategory"
                                value={idCategory}
                            >
                                {category.map((idCategory, index)=>(
                                    <Option key={index} value={idCategory.idCategory}>{idCategory.nameCate} chỗ</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        
                        <Form.Item
                            label="Hãng sản xuất"
                            name="idManufactor"
                            rules={[{ required: true, message: 'Vui lòng chọn hãng xe' }]}
                        >
                            <Select
                                labelInValue
                                placeholder="Hãng sản xuất"
                                onChange= {onIdManufactorChange}
                                name="idManufactor"
                                value={idManufactor}
                            >
                                {brand.map((id, index)=>(
                                    <Option key={index} value={id.idManufactor}> {id.name} </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <button className="btn-add"><i class="fal fa-plus-circle"></i>Thêm xe</button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}
export default AddCar