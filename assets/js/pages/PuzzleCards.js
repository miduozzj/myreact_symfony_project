import React from 'react';
import {Link} from 'react-router-dom'
import {Breadcrumb} from 'antd'
export default class PuzzleCards extends React.Component{
    render(){
        return(
            <div>
                PuzzleCards
                <button><Link to={'/app/helloworld'}>helloworld</Link></button>
                <p>面包屑</p>
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={'/app/puzzlecards/1'}>www1</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to={'/app/puzzlecards/2'}>www2</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    {this.props.children}
                </div>
            </div>
        )
    }
}