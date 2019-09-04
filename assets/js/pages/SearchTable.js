import React from 'react'
import {
    Table, Input, Button, Icon, DatePicker
} from 'antd';
const { RangePicker } = DatePicker;

const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    time: '2019-03-12',
}, {
    key: '2',
    name: 'Joe Black',
    age: 42,
    time: '2019-03-10',
}, {
    key: '3',
    name: 'Jim Green',
    age: 32,
    time: '2019-04-12',
}, {
    key: '4',
    name: 'Jim Red',
    age: 32,
    time: '2019-02-15',
}];

export default  class SearchTable extends React.Component {
    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({selectedKeys,setSelectedKeys,confirm, clearFilters}) => {
            var input;
            if(dataIndex=='name'){
                input= <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(confirm)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />;
            }else{
                input= <RangePicker
                    style={{width: 200, display: 'block'}}
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
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{width: 90}}
                >
                    Reset
                </Button>
            </div>)
        },
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        //onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      //   onFilter: (value, record) => {
      //       function checkTime(i){
      //           if(i<10){
      //               i = '0'+i
      //           }
      //           return i
      //       }
      //   if(dataIndex=='name'){
      //       return record[dataIndex].toString().toLowerCase().includes(value.toLowerCase());
      //   }else{
      //       var start=value[0]._d.getFullYear()+'-'+checkTime(value[0]._d.getMonth()+1)+'-'+checkTime(value[0]._d.getDate());
      //       var end=value[1]._d.getFullYear()+'-'+checkTime(value[1]._d.getMonth()+1)+'-'+checkTime(value[1]._d.getDate());
      //       //console.log('time123',value[0]._d.getFullYear()+'-'+(value[0]._d.getMonth()+1)+'-'+value[0]._d.getDate());
      //       return record[dataIndex]>start && record[dataIndex]<end;
      //   }
      // }
        onFilter:(value,record)=>{
            
        }
    });
    handleSearch = (confirm) => {
        console.log('search123');
        confirm();
        // this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = (clearFilters) => {
        clearFilters();
        // this.setState({ searchText: '' });
    };

    render() {
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...this.getColumnSearchProps('name'),
        }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: '20%',
        }, {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
            ...this.getColumnSearchProps('time'),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        }];
        return <Table columns={columns} dataSource={data} />;
    }
}


