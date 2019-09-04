import React from 'react';
import desert from './../../images/Desert.jpg'
export default class HelloWorld extends React.Component{
    constructor(props){
        super(props);
    }
    drop=()=>{
        console.log('ddd');
        console.log(this.props);//有路由组件传过来的props 属性（history,match.....）
        this.props.history.push('app/dashboard/analysis');//只是前台路由触发了
        //location.href='app/dashboard/analysis';//前面不能/  触发后台路由，请求页面，刷新
    };
    render(){
        console.log('7777');
        console.log(this.props.location);
        console.log(this.props.match);
        console.log(this.props.history);
        return(
            <div>hello world
                <button onClick={this.drop}>123</button>
                <br/>
                <img src={desert} />
            </div>
        )
    }
}