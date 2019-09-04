import React from 'react'
import {Row} from 'antd'
import './../../css/workplace.less'

class  DraggleComponent extends React.Component{
    constructor(props){
        super(props);
    }
    // 拖动事件
    domdrugstart(sort, code, ee) {
        console.log('domdrugstart',sort,ee);
        ee.dataTransfer.setData("code", code);
        ee.dataTransfer.setData("sort", sort);
    }
    // 拖动后鼠标进入另一个可接受区域
    dragenter(ee) {
        console.log('dragenter',ee);
        ee.target.style.border = '2px dashed red';
        //ee.target.style.boxShadow = '2 2 8px red';
    }
    // a拖到b，离开b的时候触发
    dragleave(ee) {
        ee.target.style.border = '';
        ee.target.style.boxShadow = '';
    }
    // 对象排序
    compare(key) {
        return (obj1, obj2) => {
            if (obj1[key] < obj2[key]) {
                return -1;
            } else if (obj1[key] > obj2[key]) {
                return 1;
            }
            return 0
        }
    }
    // 当一个元素或是选中的文字被拖拽释放到一个有效的释放目标位置时
    drop(dropedSort, data, sortKey, ee) {
        console.log('dropedSort',dropedSort);
        ee.preventDefault();
        ee.target.style.border = '';
        const code = ee.dataTransfer.getData("code");
        const sort = ee.dataTransfer.getData("sort");
        data.map(item=>{
            if(item[sortKey]==dropedSort){
                item[sortKey]=parseInt(sort);
            }
            if(item.code==code){
                item[sortKey] = dropedSort;
            }
        });
        this.props.onChange(data);
        console.log('dropedSort',data);
    }
    allowDrop(ee) {
        ee.preventDefault();
    }
    createDraggleComponent(data, sortKey, style) {
        console.log('style',style.content);
        return data.sort(this.compare(sortKey)).map((item) => {
            return (
                <div
                    className={'Box'}
                    key={item.code}
                    draggable={true}
                    onDragEnter={this.dragenter.bind(this)}
                    onDragLeave={this.dragleave.bind(this)}
                    onDragStart={this.domdrugstart.bind(this, item[sortKey], item.code)}
                    onDrop={this.drop.bind(this, item[sortKey], data, sortKey)}
                    onDragOver={this.allowDrop.bind(this)}
                    >{item.content}</div>
            )
        })
    }
    render() {
        const { value, sortKey, style } = this.props;
        return (
            <Row>
                <div>
                    {this.createDraggleComponent(value, sortKey, style)}
                </div>
            </Row>
        )
    }
}

export default class drag extends React.Component{
    constructor(props){
        super(props);
        this.state={
            value: [
                {
                    content: 'div1',
                    code: '01',
                    sort: 0,
                },
                {
                    content: 'div2',
                    code: '02',
                    sort: 1
                },
                {
                    content: 'div3',
                    code: '03',
                    sort: 2
                },
                {
                    content: 'div5',
                    code: '05',
                    sort: 4
                },
                {
                    content: 'div4',
                    code: '04',
                    sort: 3
                }]
        }
    }
    handleChange=(data)=>{
        this.setState(
            {value:data}
        );
        console.log('1',data);
    };
    render(){
        return(
            <DraggleComponent
               value={this.state.value}
               sortKey={'sort'}
               style={{content:'Box'}}
               onChange={(data)=>this.handleChange(data)}
            />
        )
    }
}



