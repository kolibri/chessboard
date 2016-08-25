build: npm-install gulp

npm-install:
	npm install

gulp:
	./node_modules/.bin/gulp

publish:
	npm publish
