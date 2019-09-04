import React from 'react'
import axios from 'axios'
import ReactDom from 'react-dom';
import {Form, Input, Button, message,Modal} from 'antd'
import {Redirect} from 'react-router-dom';

export default class LoginLayout extends React.Component{
    render(){
        return(
            <div>
                <div style={{fontSize:'14px'}}>欢迎！</div>
                <LoginForm/>
            </div>
        )
    }
}

class LoginForm extends React.Component{
    componentDidMount(){
        errors?Modal.error({
            content:errors
        }):''
    }
    checkUsername=(rule,value,callback)=>{
        if(!value){
            callback('请输入用户名');
        }else{
            callback()
        }
    };
    checkPassword=(rule,value,callback)=>{
        if(!value){
            callback('请输入密码');
        }else{
            callback()
        }
    };
    handleSubmit = (e)=> {
        e && e.preventDefault();
        const _this = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                var formValue = _this.props.form.getFieldsValue();
                axios({
                    method:'post',
                    url:logincheck,
                    data: 'username='+formValue.username+'&password='+formValue.password
                }).then((response)=>{
                    // if(response.data.msg=="success"){
                    //     window.location=response.data.url;
                    // }
                    console.log('123');
                    console.log(response);
                    window.location=response.data.url;
                    //location.href=response.request.responseURL;
                    // if(response.request.responseURL=='http://localhost/myreact-project/public/index.php/app'){
                    //     console.log('234');
                    //     window.location=response.request.responseURL;
                    //     // return <Redirect to='/app' />
                    // }else{
                    //     console.log('456');
                    //     window.location=response.request.responseURL;
                    //     // return <Redirect to='/login' />
                    // }
                });
            }
        });
    };
    render(){
        const {form} = this.props;
        return(
            <div style={{width:300,height:300}}>
                {/*{errors?message.error(errors,1):''}*/}
                {/*{errors?Modal.error({*/}
                    {/*content:errors*/}
                {/*}):''}*/}
              <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {form.getFieldDecorator('username',{
                        initialValue:lastname,
                        validateTrigger:'onBlur',
                        rules:[{validator:this.checkUsername}]
                        }
                    )(
                        <Input placeholder={'用户名'}/>
                    )}
                </Form.Item>
                <Form.Item>
                    {form.getFieldDecorator('password',{
                            validateTrigger:'onBlur',//失去焦点时的验证
                            rules:[{validator:this.checkPassword}]
                        }
                    )(
                        <Input placeholder={'密码'}/>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button htmlType={'submit'} type="primary">登录</Button>
                </Form.Item>
              </Form>
            </div>
        )
    }
}
LoginForm=Form.create()(LoginForm);
