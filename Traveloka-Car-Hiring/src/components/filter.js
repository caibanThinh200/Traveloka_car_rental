import { Menu, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import '../css/filter.css';
import axios from 'axios';
const { SubMenu } = Menu;

const Category = ({getFilter, showAll}) =>{
    const [category, setCategory] = useState({
        categorys: []
    })
    const [sort, setSort] = useState(true)
    const [idCategory, setIdcategory] = useState()
    const onCheck = (e) =>{
        getFilter(idCategory, e.target.value)
        setSort(e.target.value)
    }
    useEffect(()=>{
        try {
            axios.get("https://mighty-meadow-74982.herokuapp.com/cate")
                .then(response=>{
                    setCategory({
                        categorys: response.data.data
                    })
                })
                .then(console.log(category.categorys))
        } catch (error) {
            console.log(error)
        }
    },[])
    return(
        <Menu
        defaultOpenKeys={['sub1','sub2','sub4']}
        mode="inline"
      >
          <div className="filter-title">
              <p><i class="far fa-sliders-h"></i>Bộ lọc</p>
          </div>
            <SubMenu key="sub1"  title="Số hành khách tối đa">
                <Menu.Item onClick={()=>showAll(sort)}>Tất cả</Menu.Item>
                {category.categorys.map(cate=>(
                    <Menu.Item onClick={()=>{getFilter(cate.idCategory, sort); setIdcategory(cate.idCategory)}} key={cate.idCategory}> Xe {cate.nameCate} chỗ </Menu.Item>
                ))}
            </SubMenu>
        
            <SubMenu key="sub2"  title="Số xe">
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4"  title="Sắp xếp">
                <Menu.Item key="10" style={{height: '100%', paddingLeft:'20px'}}>
                    <Radio.Group defaultValue={true} onChange={onCheck} >
                        <Radio value={true}>Giá từ thấp đến cao</Radio>
                        <Radio value={false}>Giá từ cao đến thấp</Radio>
                    </Radio.Group>
                </Menu.Item>
            </SubMenu>
      </Menu>
    );
}
export default Category