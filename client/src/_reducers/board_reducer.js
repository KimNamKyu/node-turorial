import { BOARD_LIST } from '../_actions/types'
export default function (state = {}, action) {
    switch (action.type) {
        case BOARD_LIST:
            return { ...state, boardlistData: action.payload }
        default:
            return state
    }
}