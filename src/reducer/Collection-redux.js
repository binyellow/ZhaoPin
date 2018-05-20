import axios from 'axios'
const COLLECTION_LIST = 'COLLECTION_LIST'
const initState = {
    collectionList:[]
}
export function CollectionList(state=initState,action){
    switch(action.type){
        case COLLECTION_LIST:
            return {
                ...state,
                collectionList:action.payload
            }
        default:
            return state;
    }
}
function collectionList(params){
    return {
        type: COLLECTION_LIST,
        payload:params
    }
}
export function getCollectionList(type){
    return (dispatch,getState)=>{
        const returnData = type==='genius'?axios.get('/user/get-company-collection'):axios.get('/user/get-genius-collection')
        returnData.then(res=>{
            if(res.status===200 && res.data.success){
                console.log(res.data);
                dispatch(collectionList(res.data.doc||[]))
            }
        })
    }
}