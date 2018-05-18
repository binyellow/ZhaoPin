import axios from 'axios'

export function getRedirectPath({type, avatar}){
	// 根据用户信息 返回跳转地址
	// user.type /boss /genius
	// user.avatar /bossinfo /geniusinfo 
	// console.log(type)
	let url = (type==='boss')?'/boss': '/genius'
	if (!avatar) {
		url += '-info'
	}
	return url
}

export function getMaxNumber(params){
	const hash = {};
	for (let i = 0; i < params.length; i++) {
		const ele = params[i];
		if (!hash[ele]) {
			hash[ele] = 1;
		} else {
			hash[ele]++;
		}
	}
	console.log(hash);
	let arr = [];
	for (const key in hash) {
		arr.push(hash[key])
	}
	let max = 0;
	for(let i=0;i<arr.length;i++){
		if(arr[i]>arr[i-1]){
			max = arr[i]
		}else{
			max = arr[i-1]
		}
	}
	return max
}