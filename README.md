# Project Management

# 🚀 Запуск проекта

## 📦 Требования

Перед началом убедитесь, что у вас установлено:

- **Node.js** версии **20** или выше  
- **Docker** 

---

## 🛠️ Установка и запуск

### 1. Склонируйте репозиторий

Команда:
"git clone https://github.com/ivakho/project_management.git"

Перейдите в корневую папку проекта:
"cd project_management"

### 2. Поднимите backend и базу данных

Перейдите в папку server:
"cd server"

Следуйте инструкции из README.md, расположенного в папке server, чтобы развернуть сервер и базу данных через Docker

Сервер будет доступен по адресу http://127.0.0.1:8080 

Адрес указан в .env файле в папке frontend и вынесен в переменную окружения как "VITE_BACKEND_MAIN_URL=http://localhost:8080/api/v1" для удобства написания запросов и смены адреса при необходимости

### 3. Установите зависимости и запустите frontend

Перейдите в папку frontend:
"cd ../frontend" или "cd frontend" (если вызываете из корневой папки)

Установите зависимости:
"npm install"

Запустите проект:
"npm run dev"

По умолчанию фронтенд доступен по адресу http://localhost:5173

## 📝 Примечания

При создании новой задачи было принято решение не отображать поле "статус" в форме, т.к. swagger и backend не ожидают поля "статус" при создании новой задачи

Поэтому по умолчанию, при создании новой задачи ей устанавливается статус со значением "Backlog" (To do) и сменить его можно при последующем редактировании задачи

Было соблюдено требование из тз, поэтому при переходе на страницу доски из модального окна задачи с заполненной формой, модальное окно остается открытым и не закрывается, хотя был произведен переход на другую страницу

Полное описание требования из тз:
"При клике на задачу открывается modal/drawer с заполненной формой. Все параметры задачи можно обновить. Есть кнопка, кликнув на которую можно перейти на доску, к которой прикреплена задача. Должна открыться страница доски и modal/drawer с предзаполными полями задачи"

Из корневого пути "/" происходит редирект на "/issues", т.к. есть всего три роута и отображать один header не хочется. Решил сделать так, чтобы сразу было отображение списка всех задач из роута "/issues"