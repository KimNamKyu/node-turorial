import axios from 'axios'
import {BOARD_LIST} from './types'
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
