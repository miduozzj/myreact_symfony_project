import React from 'react';
import {NavLink} from 'react-router-dom'
import {Icon,Menu} from 'antd'
import {switchMenu} from './../redux/action'
import {connect} from 'react-redux'
const SubMenu=Menu.SubMenu;
const Item=Menu.Item;

class NvaLeft extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentKeys:'/app',
            openKeys:''
        };
    }
    //只执行一次
    componentWillMount(){
        console.log('aaa');
        console.log(location.pathname);
        const path=location.pathname.replace(/myreact-project\/public\/index.php\//,'');
        console.log(path);
        console.log(path.search('dashboard'));
        if(path.search('dashboard')!=-1){
            this.setState({
                currentKeys:path,
                openKeys:'dashboard'
            });
        }else{
            this.setState({
                currentKeys:path,
                openKeys:''
            });
        }
    }
    handleClick=({item,key,keypath})=>{
        console.log('123');
        console.log(item);//key不是props内的一部分
        console.log(key);
        if(key.search('dashboard')!=-1){
            this.setState({
                currentKeys:key
            });
        }else{
            this.setState({
                currentKeys:key,
                openKeys:''
            });
        }
        const {dispatch} = this.props;
        dispatch(switchMenu(item.props.title));
        // console.log(item.props.title);
        // return  <Header name={item.props.title}/>
    };
    handleChange=(openkeys)=>{
        console.log('456');
        console.log(openkeys);
        this.setState({
            openKeys:openkeys[1]
        });
    };
    render(){
        return(
            <div>
                <div style={{margin:10,textAlign:'center',backgroundColor:'rgba(255, 255, 255, 0.2)'}}>
                    <NavLink to={'/app'}>
                       <Icon type="slack" style={{fontSize:30}}/>
                       <span style={{fontSize:25,margin:15,color:'white'}}>Ant design</span>
                    </NavLink>
                </div>
                <Menu theme={'dark'} mode={'inline'}
                      selectedKeys={[this.state.currentKeys]}
                      openKeys={[this.state.openKeys]}
                      onOpenChange={this.handleChange}
                      onClick={this.handleClick}>
                    <Item key={'/app'} title={'首页'}><NavLink to={'/app'}>home</NavLink></Item>
                    <SubMenu key={'dashboard'} title={'dashboard'}>
                        <Item key={'/app/dashboard/analysis'} title={'analysis'}><NavLink to={'/app/dashboard/analysis'}>analysis</NavLink></Item>
                        <Item key={'/app/dashboard/monitor'} title={'monitor'}><NavLink to={'/app/dashboard/monitor'}>monitor</NavLink></Item>
                    </SubMenu>
                    <Item key={'/app/puzzlecards'} title={'system'}><NavLink to={'/app/puzzlecards'}>system</NavLink></Item>
                    <Item key={'/app/workplace'} title={'workplace'}><NavLink to={'/app/workplace'}>workplace</NavLink></Item>
                    <Item key={'/app/searchtable'} title={'searchtable'}><NavLink to={'/app/searchtable'}>searchtable</NavLink></Item>
                    <Item key={'/app/albummanage'} title={'albummanage'}><NavLink to={'/app/albummanage'}>相册管理</NavLink></Item>
                </Menu>
            </div>
        )
    }
}
export default connect()(NvaLeft);