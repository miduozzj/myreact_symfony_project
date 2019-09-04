import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux'
import store from './redux/store'
import BasicLayout from './layouts/BasicLayout'
import HelloWorld from './pages/HelloWorld'
import Analysis from './pages/Dashboard/Analysis'
import Monitor from './pages/Dashboard/Monitor'
import PuzzleCards from './pages/PuzzleCards'
import Workplace from './pages/Workplace'
import SearchTable from './pages/SearchTable'
import AlbumManage from './pages/AlbumManage'
import AddAlbum from './pages/AddAlbum'
import drag from './pages/drag'
// import './../css/index.less';

const storage=store();
ReactDom.render(
    <Provider store={storage}>
       <BrowserRouter basename="/myreact-project/public/index.php">
         <BasicLayout>
            <Switch> 
                <Route exact path={'/app'} component={HelloWorld}/>
                <Route path={'/app/dashboard/analysis'} component={Analysis}/>
                <Route path={'/app/dashboard/monitor'} component={Monitor}/>
                {/*<Route path={'/app/puzzlecards'} component={PuzzleCards}/>*/}
                <Route path={'/app/puzzlecards'} render={()=>
                    <PuzzleCards>
                        <Route path={'/app/puzzlecards/1'} component={HelloWorld}/>
                        <Route path={'/app/puzzlecards/2'} component={Analysis}/>
                    </PuzzleCards>}>
                </Route>
                <Route exact path={'/app/helloworld'} component={HelloWorld}/>
                <Route exact path={'/app/workplace'} component={Workplace}/>
                <Route exact path={'/app/searchtable'} component={SearchTable}/>
                <Route exact path={'/app/albummanage'} component={AlbumManage}/>
                <Route exact path={'/app/addalbum'} component={AddAlbum}/>
                <Route exact path={'/app/drag'} component={drag}/>
            </Switch>
          </BasicLayout>
       </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);