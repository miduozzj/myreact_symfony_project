import {type} from './action'

export const reducer=(state,action)=>{
    switch(action.type){
        case type.switchMenu:
            return {...state,name:action.payload};
        default:
            return {...state};
    }
};