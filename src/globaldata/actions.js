import {UPDATE_TITLE} from './constants'
export const updateTitle = (data)=>{
    return {
        type: UPDATE_TITLE,
        data
    }
}