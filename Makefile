install: #установка зависимостей
	npm ci
lint: #проверка кода на соответствие стандарту
	npx eslint .
vite: #запуск сервера разработки
	npx vite
asc: #запись экрана asciinema и отправка на сайт
	asciinema rec demo.cast
	asciinema upload demo.cast