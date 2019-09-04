import React from 'react';
import {HashRouter,BrowserRouter,Route,Switch} from 'react-router-dom';
import ReactDom from 'react-dom';
import BasicLayout from './layouts/BasicLayout';
import HelloWorld from './pages/HelloWorld';
import Monitor from './pages/Dashboard/Monitor';
import Analysis from './pages/Dashboard/Analysis';
import Workplace from './pages/Workplace';
import PuzzleCards from './pages/PuzzleCards';
console.log('www');
console.log(keys);
ReactDom.render(
    <BrowserRouter basename="/myreact-project/public/index.php">
        <BasicLayout data={keys} >
            <Switch>
                <Route exact path={'/app'} component={HelloWorld}/>
                {/*<Route  path={'/helloworld'} component={HelloWorld}/>*/}
                <Route exact path={'/app/analysis'} component={Analysis}/>
                <Route exact path={'/app/monitor'} component={Monitor}/>
                <Route exact path={'/app/workplace'} component={Workplace}/>
                <Route exact path={'/app/puzzlecards'} component={PuzzleCards}/>
            </Switch>
        </BasicLayout>
    </BrowserRouter>,
    document.getElementById('root')
);