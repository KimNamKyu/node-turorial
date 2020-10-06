import { BOARD_LIST, BOARD_SAVE } from '../_actions/types'
export default function (state = {}, action) {
    switch (action.type) {
        case BOARD_LIST:
            return { ...state, boardlistData: action.payload }
        case BOARD_SAVE:
            return { ...state, save: action.payload }
        default:
            return state
    }
}