import React from 'react'
import {Col,Row} from 'antd'
import NvaLeft from './../components/NvaLeft'
import Header from './../components/Header'
import Foter from './../components/Foter'
import './../../css/BasicLayout.less'
export default class Admin extends React.Component{
    render(){
        return(
            <div>
                <Row>
                    <Col span={3} className={'nva-left'}>
                        <NvaLeft/>
                    </Col>
                    <Col span={21} className={'nva-right'}>
                        <Header/>
                        <Row className={'content'}>
                            {this.props.children}
                        </Row>
                        <Foter/>
                    </Col>
                </Row>
            </div>
        )
    }
}
