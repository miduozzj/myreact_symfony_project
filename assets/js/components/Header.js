import React from 'react';
import './header.less'
import {connect} from 'react-redux'
import {Modal} from 'antd'
class Header extends React.Component{
    logoutHandle=()=>{
        Modal.confirm({
            content:'你确定要退出系统吗?',
            okText:'确定',
            cancelText:'取消',
            onOk:()=>{
                location.href='logout';
            }
        });
    };
    render(){
        console.log('hhhh');
        console.log(this.props.name);
        return(
            <div className={'header'}>
                <div className={'header-top'}>
                    <span style={{marginRight:15}}>您好，xxx!</span>
                    <a onClick={this.logoutHandle}>注销</a>
                    {/*<a href={logout}>注销</a>*/}
                </div>
                <div className={'header-content'}>
                    {this.props.name}
                </div>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        name:state.name
    }
};
export default connect(mapStateToProps)(Header);