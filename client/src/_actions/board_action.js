import axios from 'axios'
import {BOARD_LIST, BOARD_SAVE} from './types'
export function boardlist(dataToSubmit) {
    //서버에서 받은데이터 저장 
    const request =  axios.get('/api/board/list', dataToSubmit)
    .then(response => response.data)

    //리듀셔로 리턴해준다
    return{
        type: BOARD_LIST,
        payload: request
    }
}

export function boardsave(dataToSubmit) {
    //서버에서 받은데이터 저장 
    const request =  axios.post('/api/board/write', dataToSubmit)
    .then(response => response.data)

    //리듀셔로 리턴해준다
    return{
        type: BOARD_SAVE,
        payload: request
    }
}