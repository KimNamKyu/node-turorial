import {combineReducers} from 'redux';
// import user from './use_reducer';

//여러개의 리듀서가 존재 가능 (여러개의 State가 존재 가능)
// combineReducers  이거를 이용해 루트에서 하나로 합쳐준다.
const rootReducer = combineReducers({
    //user,
})

export default rootReducer;