import React from 'react'
import { Steps, Button, message } from 'antd';
import './../../css/AddAlbum.less'
const Step = Steps.Step;

const steps = [{
    title: '添加详情',
    content: 'First-content',
}, {
    title: '选择模板',
    content: 'Second-content',
}, {
    title: '选择封面',
    content: 'Last-content',
},{
    title: '完成',
    content: 'Last-content',
}];

export default class AddAlbum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render() {
        const { current } = this.state;
        return (
            <div className={"container"}>
                <div className="steps-header">
                    <Steps current={current}>
                        {steps.map(item => <Step key={item.title} title={item.title}/>)}
                    </Steps>
                    {(current==1||current==2)? <button>123</button>:''}
                </div>
                <div className="steps-content">{steps[current].content}</div>
                <div className="steps-action">
                    {
                        current < steps.length - 1
                        && <Button type="primary" onClick={() => this.next()}>Next</Button>
                    }
                    {
                        current === steps.length - 1
                        && <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                    }
                    {
                        current > 0
                        && (
                            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                Previous
                            </Button>
                        )
                    }
                </div>
            </div>
        );
    }
}

