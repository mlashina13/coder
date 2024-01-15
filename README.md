## Web-приложение "Coder" (Секретный код)
### Данное web-приложение представляет из себя логическую игру, целью которой является разгадать за отведенное время и количество попыток цветовую комбинацию, загаданную кодировщиком

### Ссылка на проект в vercel:
https://coder-client-6n91mv57q-coder-fa425394.vercel.app/

### Установка и запуск проекта
1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните следующую команду, это обязательный шаг, без него ничего работать не будет :)
```
yarn bootstrap
```


— запуск проекта 
```
yarn dev
```

— запуск только клиентской части
```
yarn dev --scope=client
```

— запуск только серверной части
```
yarn dev --scope=server
```

— установка стабильной версии:
```
yarn
```

— сборка проекта:
```
yarn build
```

— предпросмотр проекта:
```
yarn preview
```

— запуск проверки кодстайла typescript:
```
yarn lint
```

— запуск форматирования prettier
```
yarn format
```

— запуск тестов:
```
yarn test
```


### Добавление зависимостей
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


### Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Чтобы пропустить проверки, используйте `--no-verify` (но не злоупотребляйте)

### Production окружение в докере
Перед первым запуском выполните `node init.js`

`docker compose up` - запустит три сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

### SSR
Для запуска проекта с SSR необходимо
- Перейти в пакет клиента cd .\packages\client\ и выполнить команду yarn link
- Перейти в пакет сервера cd .\packages\server\ и выполнить команду yarn link client
- Выполнить скрипт на клиенте: build:ssr
- Выполнить скрипт на сервере, в соответствии с системой: build:unix или build:win  
- Для запуска проекта в режиме разработки выполнить на сервере скрипт: dev 
- Для запуска проекта в режиме продакшена выполнить на сервере скрипт: preview

### Серверная инфраструктура для форума
Для запуска серверной инфраструктуры необходимо:
- установить docker
- выполнить команды docker-compose pull
                    docker-compose up -d
- для остановки контейнера команда docker-compose down
- Для локальной разработки, необходимо в .env установить переменные со своими портами, например
    CLIENT_PORT=3000
    SERVER_PORT=3001
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres
    POSTGRES_DB=coder
    POSTGRES_PORT=5432
    PGADMIN_EMAIL=admin@admin.ru
    PGADMIN_PASSWORD=admin
    PGADMIN_PORT=5050
                   
### Реализованный функционал:
- Реализован роутинг с помощью React Router и React Router DOM
- Добавлен UI Kit- Material UI
- Реализованы страницы: 
    1) Логин (сверстана, реализована логика авторизации)
    2) Регистрация (сверстана, реализована логика регистрации)
    3) Страница игры (Главная) с разделами: "правила", "игра", "Результаты", "Интересные факты" (разделы сверстаны и добавлена логика)
    4) Страница лидерборда (сверстана, реализована базовая логика)
    4) Страница форума (сверстана, реализована базовая логика, API будет реализовано позднее)
    5) Страница профиля пользователя (сверстана, реализована логика просмотра и изменения данных пользователя)
    6) Страница 400-х ошибок
    7) Страница 500-х ошибок
- Добавлена валидация на все формы: formik + yup
- Реализован рабочий прототип игры на Canvas, проработана визуальная часть игры
- Добавлена логика проверки авторизации через отдельный hook в связке с HOC
- Добавлены Service Workers
- Добавлен механизм взаимодействия с серверным API посредством Axios 
- Добавлено Redux-хранилище с использованием Redux toolkit 
- Добавлены Slice'ы для пользователя и глобальных ошибок
- Добавлена логика изменения состояния из асинхронных запросов- createAsyncThunk
- Добавлен ErrorBoundary и страница-заглушка для Runtime errors
- Добавлена обработка ошибок асинхронных запросов: try-catch + errorSlice + система всплывающих уведомлений
- Покрыты тестами игровой движок и часть UI
- Добавлены Fullscreen API, Geolocation API
- Добавлена поддержка API лидерборда 
- Добавлена авторизация с помощью OAuth
- Настроен Express для SSR
- Добавлены настройки серверной инфраструктуры для форума, эмодзи и темизации
- Добавлен SSR с поддержкой роутинга и redux
- Добавлен Web API форума
- Добавлен Web API для эмодзи
- Добавлен механизм переключения тем
