import MyTable from  "../../components/MyTable"
import MyModal from "../../components/MyModal"
import {Button,LocaleProvider,Input,Popconfirm,message,Modal} from 'antd';
import React from 'react';
import axios from 'axios';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
const inputs = [
    {name:"name",type:"user",label:"姓名",span:12,labelcol:6,wrappercol:14,option:{rules:[{required:true,message:'请输入姓名'}]}},
    {name:"des",type:"gift",placeholder:"年龄",label:"年龄",span:12,labelcol:6,wrappercol:14,option:{}},
    // {name:"idcardnum",placeholder:"身份证号码",label:"身份证号码",span:24,labelcol:5,wrappercol:17},
    // {name:"phonenum",placeholder:"电话号码",label:"电话号码",span:12,labelcol:7,wrappercol:10},
    // {name:"school",placeholder:"学校",span:12,label:"学校",labelcol:5,wrappercol:10},
    // {name:"xuehao",placeholder:"学号",span:24},
    {name:"url",label:"地址",span:24,labelcol:3,wrappercol:18,option:{}},
];

var search='';
var page_size=20;
var selectedid=[];
export default class Analysis extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tabShuju:null,
            total:0,
            page:1
        };
    }
    biaotou = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'des',
            key: 'des',
        },
        {
            title: '住址',
            dataIndex: 'url',
            key: 'url',
        },
        {
            title:'操作',
            dataIndex:'operation',
            key:'operation',
            width: 200,
            render:(text,record,index)=>(
                <span>
                    <MyModal inputs={inputs}
                             title={'编辑记录'}
                             data={record}
                             oncreate={(values)=>this.addList(values,record.id)}>
                        <a style={{marginRight:10}} >编辑</a>
                    </MyModal>
                    <Popconfirm title={'你确定要删除吗'} cancelText={'取消'} okText={'确定'} onConfirm={()=>this.delList(record.id)}>
                        <a href={'javascript:;'}>删除</a>
                    </Popconfirm>
                 </span>
            )
        }
    ];
    getList=(page,rows)=>{
        axios({
            method:'post',
            url:getlist,
            data:{
                page:page,
                rows:rows
            },
            headers: {
                'Content-Type': 'application/json'
                //'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response)=>{
            for(var i=0;i<response.data.rows.length;i++){
                response.data.rows[i].key=response.data.rows[i].id;
            }
            this.setState({
                tabShuju:[...response.data.rows],
                total:parseInt(response.data.total),
                page:page
            });
        });
    };
    addList=(values,id)=>{
        axios({
            method:'post',
            url:addlist,
            data:{
                value:values,
                id:id
            },
            headers: {
                'Content-Type': 'application/json'
                //'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response)=>{
            console.log('123');
            console.log(response.data.msg);
            var msg=response.data.msg;
            if(msg=='success'){
               this.getList(this.state.page,page_size);
                console.log('234');
               message.success('添加成功',1);
            }else{
               message.error('添加失败',1);
            }
        });
    };
    delList=(id)=>{
        let ids=[];
        if(!Array.isArray(id)){
            ids.push(id);
        }else{
            ids=id;
        }
        axios({
            method:'post',
            url:dellist,
            data:{
                id:ids,
            },
            headers: {
                'Content-Type': 'application/json'
                //'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response)=>{
            var msg=response.data.msg;
            if(msg=='success'){
                // this.getList(this.state.page,page_size);
                // console.log('234');
                message.success('删除成功',1);
            }else{
                message.error('删除失败',1);
            }
            location.reload();  //如果利用上面的方式，selectedRowKeys的值始终会保留上一次的值。
        });
    };
    delLists=()=>{
        if(selectedid.length>0){
            this.delList(selectedid);
        }else{
            Modal.info({
                okText:'确定',
                content:'请至少选择一个要删除的行'
            });
        }
    };
    selectedHandle=(selectedRowKeys, selectedRows)=>{
        selectedid=selectedRowKeys;
        console.log('kkk');
        console.log(selectedRowKeys);
    };
    searchList=(value)=>{
        search=value;
        this.props.getList(1,20);
    };
    componentDidMount(){
        this.getList(1,page_size);
    }
    render(){
        return(
            <LocaleProvider locale={zh_CN}>
                <div style={{height:750}}>
                    <div style={{padding:20}}>
                        <Input.Search placeholder={'输入查询内容'}
                                      style={{width:200,marginRight:20}}
                                      onSearch={this.searchList}/>
                        <MyModal inputs={inputs}
                                 title={'添加记录'}
                                 data={{}}
                                 oncreate={(values)=>this.addList(values,0)}
                        >
                            <Button type="primary"  style={{float:'right'}}>添加</Button>
                        </MyModal>
                        <span style={{marginLeft:20}}><Button type="primary" onClick={this.delLists}>删除</Button></span>
                    </div>
                    <MyTable
                        biaotou={this.biaotou}
                        tabShuju={this.state.tabShuju}
                        total={this.state.total}
                        onchange={this.getList}
                        sizechange={this.getList}
                        rowselection={{onChange:this.selectedHandle}}
                    />
                </div>
            </LocaleProvider>
        )
    }
}