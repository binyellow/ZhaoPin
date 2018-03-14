
const ADD_NOTE = 'ADD_NOTE';
const DELETE_NOTE = 'DELETE_NOTE';
export function note(state=[],action){
    switch(action.type){
        case ADD_NOTE:
            return [
                ...state,
                {
                    text:action.text
                }
            ]
        case DELETE_NOTE:
            return state.filter((item,index)=>
                action.index!==index
            )
        default:
            return state;
    }
}

export function addAction(text){
    return {
        type:'ADD_NOTE',
        text
    }
}
export function deleteAction(index){
    return {
        type:'DELETE_NOTE',
        index
    }
}