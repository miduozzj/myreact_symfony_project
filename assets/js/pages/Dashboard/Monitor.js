// import React from 'react';
// import axios from 'axios';
// //高阶组件的使用
// const enhance=(key)=>(Wrappercomponent)=>{
//     return class extends React.Component{
//         constructor(props){
//             super(props);
//             this.state={
//                 data:'hello everyone,Monitor'
//             };
//         }
//         render(){
//             const {wrapperComponentref,...rest}=this.props;
//             return (
//               <Wrappercomponent data={this.state.data} ref={wrapperComponentref} {...rest}/>//ref属性不会传递给被包装组件
//              // <Wrappercomponent data={this.state.data} {...rest}/>
//             )
//         }
//     }
// };
// class Monitor1 extends React.Component{
//     constructor(props){
//         super(props);
//         this.state={
//             shuju:'wewe'
//         };
//     }
//     render(){
//         return(
//             <div>
//                <input style={this.props.color} />
//                 {/*<input style={this.props.color} ref={this.props.wrapperComponentref}/>*/}
//             </div>
//         )
//     }
// }
// const MonitorEn=enhance()(Monitor1);
// export default class Monitor extends React.Component{
//     componentDidMount(){
//         console.log('rrrr');
//         console.log(this.pref);
//         console.log(this.pref.props.data);
//         console.log(this.pref.state.shuju);
//     }
//     handleClick=()=>{
//         axios({
//             method:'get',
//             url: download
//         }).then((response)=>{
//             console.log(response);
//         })
//     };
//     render(){
//         return(
//             <div>
//                {/* <MonitorEn color={{color:'red'}} ref={(pref)=>{this.pref=pref}}/>//直接用ref获取到的是高阶组件的实例对象 */}
//                <MonitorEn color={{color:'red'}} wrapperComponentref={(pref)=>{this.pref=pref}}/>//this.pref获取包裹组件的实例对象，，，
//                <a onClick={this.handleClick}>图片下载</a>
//             </div>
//         )
//     }
// }
import React from 'react'


class SubCounter extends React.Component {
    constructor(props){
        console.log('80、子组件挂载constructor',props);//首次渲染该组件时
        super(props);
        this.state={
            number:props.number,
            age:'121'
        }
    }
    componentWillMount() {
        console.log('81、子组件挂载之前',this.state);//首次渲染时，调用该方法，可以改变成状态，只调用用一次,然后执行render()
    }

    componentDidMount() {
        console.log('82、子组件挂载完成');//首次渲染时，组件挂载完成调用该方法，只执行一次
    }
    componentWillReceiveProps(nextprops) {
        console.log('9、子组件将要接收到新属性',nextprops,this.props);//不是首次渲染，父组件重新渲染或者接收到新属性时
        if(nextprops.number!=this.props.number){
            this.setState({
                number:nextprops.number,
                name:'zzjjjj'
            });
        }
    }

    shouldComponentUpdate(newProps, newState) {//不是首次渲染，组件接收到新属性或者状态改变时调用该方法
        console.log('10、子组件是否需要更新',newProps, this.props,newState,this.state);
        if (JSON.stringify(newState)!=JSON.stringify(this.state)) {
            console.log('前后state不相等');
            return true;
        }
        return false
    }

    componentWillUpdate() {//组件每次要更新都会调用该方法，然后执行render()
        console.log('11、子组件将要更新');
        this.setState({
            name:'you nihao'
        });
    }

    componentDidUpdate() {//组件每次更新完都会调用该方法
        console.log('13、子组件更新完成');
    }

    componentWillUnmount() {
        console.log('14、子组件将卸载');//执行一次，当页面显示其他组件内容，组件卸载
    }
    handleClick = () => {
        this.setState({
            age: this.state.age - 1
        })
    };

    render() {
        console.log('12、子组件挂载中',this.props,this.state);
        return (
            <div>
                <p>{this.state.number}</p>
                <p>{this.state.name}</p>
                <button onClick={this.handleClick}>-</button>
                <p>{this.state.age}</p>
            </div>
        )
    }
}

export default class Counter extends React.Component {
    static defaultProps = {
        //1、加载默认属性
        name: 'sls',
        age:23
    };

    constructor(props) {
        super(props);
        //2、加载默认状态
        this.state = {number: 0}
        console.log('1、父组件将要挂载constructor',props);
    }
    componentWillReceiveProps(nextprops) {
        console.log('2、父组件将要接收到新属性',nextprops,this.props);
        }
    componentWillMount() {
        console.log('3、父组件挂载之前');
    }

    componentDidMount() {
        console.log('5、父组件挂载完成');
    }

    shouldComponentUpdate(newProps, newState) {
        console.log('6、父组件是否需要更新');
        if (newState.number<15) return true;
        return false
    }

    componentWillUpdate() {
        console.log('7、父组件将要更新');
    }

    componentDidUpdate() {
        console.log('8、父组件更新完成');
    }

    handleClick = () => {
        this.setState({
            number: this.state.number + 1
        })
    };

    render() {
        console.log('4、render(父组件挂载)');
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={this.handleClick}>+</button>
                {this.state.number<10?<SubCounter number={this.state.number}/>:null}
            </div>
        )
    }
}

