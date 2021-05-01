import '../css/admin.css'
import { Menu } from 'antd';
import {
  AppstoreAddOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import {Link} from 'react-router-dom'
const { SubMenu } = Menu;

const Dashboard = () =>{
    return(
        <Menu
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          style={{height: '100%', minHeight:'100vh'}}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Option 3
          </Menu.Item>
          <SubMenu className="submenu" key="sub1" icon={<i style={{color:'white'}} class="fas fa-cars"></i>} title="Quản lý xe">
            <Menu.Item key="5" icon={<EyeOutlined />}> <Link to="/admin/vehicles"> Xem danh sách xe</Link></Menu.Item>
            <Menu.Item key="6" icon={<AppstoreAddOutlined/>}><Link to="/admin/add-vehicles"> Thêm xe mới</Link></Menu.Item>
            <Menu.Item key="7" icon={<DeleteOutlined />}>Xoá xe</Menu.Item>
            <Menu.Item key="8" icon={<EditOutlined />}>Cập nhật thông tin xe</Menu.Item>
          </SubMenu>
            <SubMenu key="sub2" icon={<i style={{color: 'white'}} class="fal fa-ballot-check"></i>} title="Quản lý đơn hàng">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
          </SubMenu>
        </Menu>
    );
}
export default Dashboard