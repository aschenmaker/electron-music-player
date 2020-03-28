exports.$ = (id) => {
	return document.getElementById(id);
};

exports.convertDuration = (time) => {
	// 计算分钟 '01' '012'
	const min = '0' + Math.floor(time / 60);
	// seconds '01' , '021'
	const sec = '0' + Math.floor(time - min * 60);
	return min.substr(-2) + ':' + sec.substr(-2);
};
