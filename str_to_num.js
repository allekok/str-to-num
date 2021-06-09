const dict = {
	'و' :
	'+',
	'سفر' :
	0,
	'یەک' :
	1,
	'دوو' :
	2,
	'سێ' :
	3,
	'چوار' :
	4,
	'پێنج' :
	5,
	'شەش' :
	6,
	'حەوت' :
	7,
	'هەشت' :
	8,
	'نۆ' :
	9,
	'دە' :
	10,
	'یازدە' :
	11,
	'دوازدە' :
	12,
	'سێزدە' :
	13,
	'چاردە' :
	14,
	'پازدە' :
	15,
	'شازدە' :
	16,
	'حەڤدە' :
	17,
	'هەژدە' :
	18,
	'نۆزدە' :
	19,
	'بیست' :
	20,
	'سی' :
	30,
	'چل' :
	40,
	'پەنجا' :
	50,
	'شەست' :
	60,
	'حەفتا' :
	70,
	'هەشتا' :
	80,
	'نەوەد' :
	90,
	'سەد' :
	100,
	'هەزار' :
	1e3,
	'ملیۆن' :
	1e6,
	'ملیارد' :
	1e9,
	'تریلیۆن' :
	1e12,
}
const max_tok_len = max_token_len(dict)
function calc(A) {
	let N = 1, i = 0
	for(; i < A.length && A[i] != '+'; i++)
		N *= A[i]
	A = A.slice(i + 1)
	if(!i) N = i
	return A.length ? N + calc(A) : N
}
function max_token_len(d) {
	let max = 0
	for(const k in d)
		if(k.length > max)
			max = k.length
	return max
}
function next_token(str) {
	for(let i = Math.min(max_tok_len, str.length); i > 0; i--) {
		const t = str.substr(0, i)
		if(t in dict)
			return [dict[t], str.substr(i)]
	}
	return null
}
function normalize(str) {
	return str.replace(/\s+/g, '')
}
function str_to_num(str) {
	str = normalize(str)
	let tokens = []
	while(str.length) {
		const T = next_token(str)
		if(T === null) {
			str = str.substr(1)
			continue
		}
		const token = T[0]
		str = T[1]
		if(token == 100 && tokens[TOP(tokens)] < token)
			tokens[TOP(tokens)] *= token
		else if(token < 100 &&
			tokens[TOP(tokens)] == '+' &&
			tokens[TOP(tokens) - 1] < 1000)
		{
			tokens[TOP(tokens) - 1] += token
			tokens.pop()
		}
		else
			tokens.push(token)
	}
	return calc(tokens)
}
function TOP(A) {
	return A.length - 1
}
