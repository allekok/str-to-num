const num_to_str = function convert(n, lev=0) {
	/* From: https://github.com/allekok/num-to-str */
	const zero = 'سفر'
	const ones = ['یەک', 'دوو', 'سێ', 'چوار', 'پێنج',
		      'شەش', 'حەوت', 'هەشت', 'نۆ']
	const ten = ['دە', 'یازدە', 'دوازدە', 'سێزدە', 'چاردە',
		     'پازدە', 'شازدە', 'حەڤدە', 'هەژدە', 'نۆزدە']
	const tens = ['بیست', 'سی', 'چل', 'پەنجا', 'شەست',
		      'حەفتا', 'هەشتا', 'نەوەد']
	const hundreds = ['سەد', 'دوو سەد', 'سێ سەد', 'چوار سەد',
			  'پێنج سەد', 'شەش سەد', 'حەوت سەد',
			  'هەشت سەد', 'نۆ سەد']
	const thousandWord = 'هەزار'
	const millionWord = 'ملیۆن'
	const billionWord = 'ملیارد'
	const trillionWord = 'تریلیۆن'
	const thousand = ` ${thousandWord}`
	const million = ` ${millionWord}`
	const billion = ` ${billionWord}`
	const trillion = ` ${trillionWord}`
	
	const negWord = 'مەنفی'
	const andWord = 'و'
	const neg = `${negWord} `
	const and = ` ${andWord} `
	
	const I = parseInt
	
	if(n === null)
		return ''
	if(n == 0)
		return lev == 0 ? zero : ''
	if(n < 0)
		return neg + convert(-n, lev)

	let result = ''
	
	if(lev > 0) {
		result += and
		lev--
	}
	
	if(n < 10)
		result += ones[n - 1]
	else if(n < 20)
		result += ten[n - 10]
	else if(n < 1e2)
		result += tens[I(n / 10) - 2] +	convert(n % 10, lev + 1)
	else if(n < 1e3)
		result += hundreds[I(n / 1e2) - 1] + convert(n % 1e2, lev + 1)
	else if(n < 1e6) {
		const t = n / 1e3 < 2 ? '' : convert(I(n / 1e3), lev)
		result += t + thousand + convert(n % 1e3, lev + 1)
	}
	else if(n < 1e9) {
		const m = convert(I(n / 1e6), lev)
		result += m + million +	convert(n % 1e6, lev + 1)
	}
	else if(n < 1e12) {
		const b = convert(I(n / 1e9), lev)
		result += b + billion +	convert(n % 1e9, lev + 1)
	}
	else if(n < 1e15) {
		const t = convert(I(n / 1e12), lev)
		result += t + trillion + convert(n % 1e12, lev + 1)
	}
	
	return result
}
function test(n, limit) {
	for(let l = 10; l <= limit; l *= 10) {
		for(let i = 0; i < n; i++) {
			const num = parseInt(Math.random() * l)
			const F = num_to_str(num)
			const T = str_to_num(F)
			const test = T == num
			if(!test) {
				console.log(`${test} => num: ${num}`)
				console.log(`num_to_str: ${F}`)
				console.log(`str_to_num: ${T}`)
				return
			}
		}
		console.log(`n: ${n}, limit: ${l} => Passed.`)
	}
}
