import '../css/admin.css'
import Dashboard from './dashboard'
import {Dropdown} from 'antd';

const menu=(
    <div className="sub-menu">
        <p className="option">Đổi mật khẩu</p>
        <p className="option">Đăng xuất</p>
    </div>
);
const Admin = ({com}) =>{
    return(
        <div className="container-fluid" style={{backgroundColor: '#eee', padding:'0'}}>
            <div className="container-fluid navbar-admin">
                        <div className="row">
                            <div className="col-9">
                                <div className="menu-title">
                                    <h4>Dashboard</h4>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="admin-infor">
                                    <p id="hello-text">Chào Danny</p>
                                    <Dropdown overlay={menu} placement="bottomRight" arrow>
                                        <p className="user-icon"><i class="fad fa-user-circle"></i></p>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
            <div className="d-flex" >
                <div className="dashboard" style={{width:'20%'}}>
                    <Dashboard/>
                </div>
                <div className="main" style={{width:'80%'}}>
                    {com}
                </div>
            </div>
        </div>
    );
}
export default Admin