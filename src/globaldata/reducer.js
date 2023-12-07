import {UPDATE_TITLE} from './constants'

const initState = {
    title: []
}
const reducer = (state, action)=>{
    switch (action.type){
        case UPDATE_TITLE:
            return {
                title: action.data
            }
        default:
            throw new Error('Invalid action')
    }
}
export {initState};
export default reducer;