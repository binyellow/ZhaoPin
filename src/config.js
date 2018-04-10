import axios from 'axios';
import {Toast} from 'antd-mobile'

axios.interceptors.request.use(config=>{
    Toast.loading('加载中',500)
    return config
})

axios.interceptors.response.use(config=>{
    Toast.hide()
    return config
})