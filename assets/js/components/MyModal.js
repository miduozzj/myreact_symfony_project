import React from 'react';
import {Modal,Form,Input,Icon,Col,Row} from 'antd';

const FormItem=Form.Item;

class MyModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:false
        };
    }
    showModal=()=>{
        const {resetFields} = this.props.form;
        resetFields();
        this.setState({visible:true});
    };
    handleok=()=> {
        const {oncreate} = this.props;
        const {validateFields} = this.props.form;
        validateFields((errors,values)=>{
            if(errors){return}
            else{
                oncreate(values);//向父组件对应属性传参数
                this.setState({visible:false});
            }
        });
    };
    handleCancel=()=>{
        this.setState({visible:false});
    };
    render(){
        const {getFieldDecorator} = this.props.form;
        const {title,inputs,data} = this.props;
        const newinputs=inputs.map((item,index)=>{
            if(item.type){
                var input = <Input prefix={<Icon type={item.type}  />}  placeholder={item.placeholder}/>;
            }else{
                var input =  <Input placeholder={item.placeholder} />;
            }
            if(data!={}){
                item.option.initialValue = data[item.name];
            }
            return (
                <Col span={item.span} key={index}>
                    <FormItem  label={item.label}
                               labelCol={{ span:item.labelcol }}
                               wrapperCol={{ span: item.wrappercol }}>
                        {getFieldDecorator(item.name, item.option)(
                            input
                        )}
                    </FormItem>
                </Col>
            )
        });
        return(
            <span>
                <span onClick={this.showModal}>
                {this.props.children}
                </span>
                <Modal title={title}
                       visible={this.state.visible}
                       onOk={this.handleok}
                       onCancel={this.handleCancel}
                       okText={'确定'}
                       cancelText={'取消'}>
                    <Form>
                        <Row>
                            {newinputs}
                        </Row>
                    </Form>
                </Modal>
            </span>
        )
    }
}

export default Form.create()(MyModal);