import {createStore} from 'redux'
import {reducer} from './reducer'

const state={
    name:'首页'
};

const store=()=>createStore(reducer,state);
console.log('ppp');
console.log(store);
export default store;


