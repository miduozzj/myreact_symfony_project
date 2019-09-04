import React from 'react';
import { Layout,Menu,Icon } from 'antd';//从antd引入Layout布局组件，Menu菜单组件，Icon图标组件
import {NavLink} from 'react-router-dom';//使用link组件（相当于<a>）实现路由的跳转
//使得能在点击导航时，触发 URL 刷新，路由根据配置返回和当前 URL 匹配的内容.
const { Header, Footer, Sider, Content } = Layout;
//引入子菜单组件
const SubMenu=Menu.SubMenu;

export default class BasicLayout extends React.Component {
    render() {
        console.log('eee');
        console.log(this.props.data);
        return (
            <Layout>
                <Sider width={256} style={{ minHeight: '100vh', color: 'white' }}>
                    <div style={{height:'32px',background:'rgba(255,255,255,.2)',margin:'16px'}}>
                        <Icon type={'ant-design'} style={ {fontSize: '30px', color: '#08c'} }/>
                        <span style={{margin:'20px', fontSize:'23px'}}>Ant Design</span>
                    </div>
                    <Menu theme={'dark'} mode={'inline'} defaultSelectedKeys={[this.props.data['key1']]} defaultOpenKeys={[this.props.data['key2']]}>
                        <Menu.Item key={'1'}>
                            <NavLink exact to={"/app"}>
                                <Icon type={'pie-chart'} />
                                <span>Helloworld</span>
                            </NavLink>
                        </Menu.Item>
                        <SubMenu key={'sub1'}
                                 title={<span><Icon type={'dashboard'}/><span>Dashboard</span></span>}>
                            <Menu.Item key={'2'}><NavLink to={"/app/analysis"}>分析页</NavLink></Menu.Item>
                            <Menu.Item key={'3'}><NavLink to={"/app/monitor"}>监控页</NavLink></Menu.Item>
                            <Menu.Item key={'4'}><NavLink to={"/app/workplace"}>工作台</NavLink></Menu.Item>
                        </SubMenu>
                        <Menu.Item key={'5'}>
                            <NavLink  exact to={"/app/puzzlecards"}>
                                <Icon type={'book'} />
                                <span>puzzlecards</span>
                            </NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout >
                    <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>Header</Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 500 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design </Footer>
                </Layout>
            </Layout>
        )
    }
}
