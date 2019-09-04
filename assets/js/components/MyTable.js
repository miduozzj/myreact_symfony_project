import React,{Component} from "react";
import {Table,LocaleProvider} from "antd";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
export default class MyTable extends Component{
    render() {
        const paginations={total:this.props.total,
            defaultPageSize:20,
            pageSizeOptions:['20','30','40'],
            showQuickJumper:true,
            showSizeChanger:true,
            onChange:this.props.onchange,//页码改变的回调，参数是改变后的页码及每页条数
            onShowSizeChange:this.props.sizechange//页大小改变的回调，参数是改变后的页码及每页条数
        };
        var flag=this.props.tabShuju==null?true:false;
        console.log('11111111  ',flag);
        console.log('111111112  ',this.props.tabShuju);
        return(
            <LocaleProvider locale={zh_CN}>
                <div style={{padding:20}}>
                    <Table
                        loading={{tip:'loading...',spinning:flag}}
                        dataSource={this.props.tabShuju}
                        columns={this.props.biaotou}
                        pagination={paginations}
                        bordered={true}
                        rowSelection={this.props.rowselection}
                    />
                    {/*<Pagination style={{float:'right'}}*/}
                    {/*total={this.props.total}*/}
                    {/*defaultPageSize={20}*/}
                    {/*pageSizeOptions={['20','30','40']}*/}
                    {/*showQuickJumper={true}*/}
                    {/*showSizeChanger={true}*/}
                    {/*onChange={this.props.onchange}//页码改变的回调，参数是改变后的页码及每页条数*/}
                    {/*onShowSizeChange={this.props.sizechange}*/}
                    {/*/>*/}
                </div>
            </LocaleProvider>
        )
    }
}