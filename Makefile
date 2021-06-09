test:
	@cat str_to_num.js > _.js
	@cat test.js >> _.js
	@echo 'test(5000,1e15)' >> _.js
	@node _.js
	@rm _.js
