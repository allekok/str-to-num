test:
	@cat str_to_num.js > _.js
	@cat test.js >> _.js
	@echo 'test()' >> _.js
	@node _.js
	@rm _.js
