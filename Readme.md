# Patents-searcher
Сервис предназначен для поиска, парсинга и последующего добавления в mongodb, файла csv с сайта РОСПАТЕНТ.
<hr>

## Как настроить

### Конфигурация
В сервисе предусмотрены конфигурационные файлы, которые хранят в себе информацию о сервере и базе данных.

!ВАЖНО.
Не нужно удалять файлы из папки дефолт, так как это может привести к ошибке в сервисе

Если вас не устраивает дефолтная конфигурация
>../default/config.js <br> ../default/storage.js

Вам стоит создать свои конфигурационные файлы (с такими же имененами) в папке
>config

Файл *config.js* отвечает за конфигурацию сервера по дефолту в нем установлены значения

```json
  port: 3000,
  bind: localhost
```

А так же файл *storage* который описывает клнфигурацию для подключения к Mong.
```json
  bind: 'mongodb://localhost',
  port: 27017,
  database: 'PatentInformation'
```

### MongoDB
Для использования сервиса вам потребуется MongoDB не ниже версии 4.2

### Node.JS
Для запуска и работы проекта вам понадобится Node.JS версии не ниже 10.16


<hr>

## Запуск
Запуск программы осуществляется с помощью команды

```sh
node app.js
```
## Методы
Для загрузки файла из файловой системы стоит использовать функцию
> fileHandler()

```javascript
  await fileHandler(Model, parserOptions, {name, path});
```
fileHandler принимает на вход 4 параметра:
  - *Model* - ссылка на схему модели
  - *parserOptions* опции для парсинга
  - *name* - имя модели
  - *path* - путь к csv файлу

<hr>

Для парсинга информации с официального сайта стоит использовать фукнцию 

>uploadData()

```javascript
await uploadData(url, Model, name, parserOptions);
```

Для парсинга вам потребуется: 
- ссылка конкретно на расположение файла, 
- схема модели Mongoose, 
- имя Модели 
- опции для парсинга (пример имеется в *storage/parseOptions*)
<hr>

Для выведения ссылки на файл вы можете воспользоваться функцией
>urlHandler()

Данный метод возвращает ссылку на файл

```javascript
  await urlHandler(url);
```
<hr>

Сервис так же содержит в себе скрипт который запускает 
- Выведение нормальной url
- Парсинг и запись в базу данных

>checkUpdate();

```javascript
  await checkUpdate(url, Model, name, parseOptions);
```

# Routing

В сервисе присутствует роутинг для запросов:

```javascript
  app.post('/rpc', async (req, res) => {
    const action = await rpc.call({}, req.body);
    res.send(action);
  });
```

## API / Methos

Входные параметры и их типы:
- number (Int) - целочисленный
- name (String) - строка
- limit (Int) - целочисленый - является не обязательным так как по умолчанию стоит 10 записей на 1 запрос. Минимальным количеством является 1, а максимальным 20.
- lastId (objectId) - id - является обязательным при пагинации, если записей более 10 вам нужно прислать последний id записи, что бы продолжить просмотр подбора.

## Request

### Построение запроса

Обращение к сервису:

- module - Модуль rpc
- method - используемый метод
- arguments - аргументы которые мы передаем для поиска

  Пример запроса
  ```json
  {
    "module": "ProgramRegistry",
    "method": "getByAuthors",
    "arguments": { 
      "name": "Иванов"
    }
  }
  ```

#### Patent - патенты

В поле *module* ставится Patent (далее соответственно названию).

Для поля *methos* доступны следущие методы:
- getByRegNumber - number - получение информации по регистрационному номеру.
- getByInventionName - name, limit, lastId - получение записей по имени изобретения
- getByAuthors - name, limit, lastId - поиск записей по авторам

#### Trademark - логотипы

- getByRegNumber - number - олучение информации по регистрационному номеру.
- getByRightHolders - name, limit, lastId - поиск записей по названию компании

#### ProgramRegistry - реестр программ для эвм

 - getByHolders - name, limit, lastId - поиск по названию компании
 - getByProgram - name, limit, lastId - поиск по названию программы
 - getByAuthors - name, limit, lastId - поиск по авторам регистрации
 - getByRegNumber - number - поиск по регистрационному номеру

 ## Response

 В ответ вам приходит JSON содержащую в себе информацию по запросу 
 пример ответа:
 ```json
  {
    "payload": [
        {
          "_id": "5d6e204c33e508ffac38fea5",
          "registrationNumber": 000000,
          "__v": 0,
          "actual": true,
          "applicationDate": null,
          "applicationNumber": 00000,
          "authors": "Иванов И. И.",
          "authorsCount": 1,
          "contactToThirdParties": "",
          "creationYear": null,
          "programName": "Система учета данных",
          "publicationURL": "http://www1.fips.ru/",
          "registrationDate": "1970-01-01T05:32:20.711Z",
          "registrationPublishDate": "1970-01-01T05:32:21.220Z",
          "registrationPublishNumber": 4,
          "rightHolders": "ООО Иванов",
          "createdAt": "2019-09-07T08:44:00.212Z",
          "updatedAt": "2019-09-07T08:44:00.212Z"
      }
    ]
  }
 ```