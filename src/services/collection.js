import axios from 'axios'
/**
 * @export
 * @param {any} params 
 * 根据类型存入不同的表
 */
export function collectItem(params){
    const {type,to} = params;
    if(type==='genius'){
        return axios.get('/user/collect-company',{params:{...params}})
    }else{
        return axios.get('/user/collect-genius',{params:{...params}})
    }
}
