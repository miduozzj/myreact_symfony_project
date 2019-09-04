import React from 'react'
import {LocaleProvider, Table, Button, Input, Icon, DatePicker} from 'antd'
import {Link} from 'react-router-dom'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import './../../css/AlbumManage.less'
 // import SvgTime from './../../images/time.svg'

const { RangePicker } = DatePicker;
const data=[
    {
        key:1,
        number:1,
        name:'毕业相册',
        scale_name:'A4',
        class_name:'毕业季',
        price:20.00,
        bind_name:'铆钉',
        release_time:'2019-04-23',
        status:'待发布'
    },{
        key:2,
        number:2,
        name:'儿童相册',
        scale_name:'B3',
        class_name:'儿童',
        price:27.00,
        bind_name:'纽扣',
        release_time:'2018-05-12',
        status:'已发布'
    }
];
export default class AlbumManage extends React.Component{
    constructor(props){
        super(props);
    }
    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({selectedKeys,setSelectedKeys,confirm, clearFilters}) => {
            var input;
            if(dataIndex=='name'){
                input= <Input
                    placeholder="输入名称"
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(confirm)}
                    style={{width: 208, marginBottom: 8, display: 'block'}}
                />;
            }else{
                input= <RangePicker
                    style={{width: 208, marginBottom: 8 ,display: 'block'}}
                    value={selectedKeys[0]}
                    onChange={dates => setSelectedKeys(dates.length>0 ? [dates] : [])}
                />;
            }
            return (
                <div style={{padding: 8}}>
                    {input}
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(confirm)}
                        icon="search"
                        size="small"
                        style={{width: 100, marginRight: 8}}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{width: 100}}
                    >
                        Reset
                    </Button>
                </div>)
        },
        filterIcon:filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        // filterIcon: filtered =>  {
        //     if(dataIndex=='name'){
        //         return  <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />;
        //     }else{
        //         return  <Icon component={SvgTime}  />;
        //     }
        // },
        onFilter: (value, record) => {
            function checkTime(i){
                if(i<10){
                    i = '0'+i
                }
                return i
            }
            if(dataIndex=='name'){
                return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());
            }else{
                var start=value[0]._d.getFullYear()+'-'+checkTime(value[0]._d.getMonth()+1)+'-'+checkTime(value[0]._d.getDate());
                var end=value[1]._d.getFullYear()+'-'+checkTime(value[1]._d.getMonth()+1)+'-'+checkTime(value[1]._d.getDate());
                //console.log('time123',value[0]._d.getFullYear()+'-'+(value[0]._d.getMonth()+1)+'-'+value[0]._d.getDate());
                return record[dataIndex]>start && record[dataIndex]<end;
            }
        }});
    handleSearch = (confirm) => {
        confirm();
    };

    handleReset = (clearFilters) => {
        clearFilters();
    };

    handleAdd=()=>{
        console.log('添加相册');
    };
    render(){
        const columns=[
            {
                title:'序号',
                dataIndex:'number',
                key:'number'
            },{
                title:'名称',
                dataIndex:'name',
                key:'name',
                ...this.getColumnSearchProps('name')
            },{
                title:'尺寸',
                dataIndex:'scale_name',
                key:'scale_name',
                filters:[{ text: 'A4', value: 'A4' },{text: 'A3', value: 'A3' }],
                onFilter: (value, record) => record.scale_name.includes(value),
            },{
                title:'分类',
                dataIndex:'class_name',
                key:'class_name',
                filters:[{ text: '毕业季', value: '毕业季' },{text: '结婚', value: '结婚' }],
                onFilter: (value, record) => record.class_name.includes(value),
            },{
                title:'价格',
                dataIndex:'price',
                key:'price',
                sorter: (a, b) => a.price - b.price,
                sortDirections: ['descend', 'ascend'],
            },{
                title:'装帧',
                dataIndex:'bind_name',
                key:'bind_name',
                filters:[{ text: '铆钉', value: '铆钉' },{text: '纽扣', value: '纽扣' }],
                onFilter: (value, record) => record.bind_name.includes(value),
            },{
                title:'发布时间',
                dataIndex:'release_time',
                key:'release_time',
                ...this.getColumnSearchProps('release_time')
            },{
                title:'状态',
                dataIndex:'status',
                key:'status',
                filters:[{ text: '待发布', value: '待发布' },{text: '已发布', value: '已发布' }],
                onFilter: (value, record) => record.status.includes(value),
                render:(text, record, index)=>{
                    if(text=='待发布'){
                        return <div>
                                   <div className="box box_daifabu"></div>
                                   <span>{text}</span>
                               </div>
                    }else{
                        return <div>
                                   <div className="box box_yifabu"></div>
                                   <span>{text}</span>
                               </div>
                    }
                }
            },{
                title:'操作',
                dataIndex:'operate',
                key:'operate',
                render:(text, record, index)=>(
                    <span>
                        <a style={{marginRight:5}}>修改</a>
                        <a style={{marginRight:5}}>删除</a>
                        {record['status']=='待发布'? <a style={{marginRight:5}}>发布</a>:<a style={{marginRight:5}}>撤销发布</a>}
                        <a style={{marginRight:5}}>详情</a>
                    </span>
                )
            },
        ];
        return(
            <LocaleProvider locale={zh_CN}>
                <div className={'album_container'}>
                    <div className='album_add'>
                        <Button type='primary'><Link to={'/app/addalbum'}>新增</Link></Button>
                    </div>
                    <Table
                        dataSource={data}
                        columns={columns}
                        bordered={true}
                        rowSelection={{}}
                    />
                </div>
           </LocaleProvider>
        )
    }
}

