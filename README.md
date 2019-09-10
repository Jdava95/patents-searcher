# Patents-searcher
Сервис предназначен для поиска, парсинга и последующего добавления в mongodb, файла csv с сайта РОСПАТЕНТ.


## Как настроить

### Конфигурация
В сервисе предусмотрены конфигурационные файлы, которые хранят в себе информацию о сервере и базе данных.

!ВАЖНО.
Не нужно удалять файлы из папки дефолт, так как это может привести к ошибке в сервисе

Если вас не устраивает дефолтная конфигурация `default/config.js` и `default/storage.js`
вам стоит создать свои конфигурационные файлы (с такими же имененами) в папке
`config`

Файл *config.js* отвечает за конфигурацию сервера по дефолту в нем установлены значения

```json
  port: 3000,
  bind: localhost
```

А так же файл *storage* который описывает конфигурацию для подключения к Mongo.
```json
  bind: 'mongodb://localhost',
  port: 27017,
  database: 'PatentInformation'
```

## База данных и платформа
Для использования сервиса вам потребуется MongoDB, а так же Node.JS.

## Запуск
Запуск программы осуществляется с помощью команды

```sh
node app.js
```
## Методы
Для загрузки файла из файловой системы стоит использовать функцию
`uploadLocalFile()`

```javascript
  await uploadLocalFile();
```
Принимает переменные окружения, передавая их в fileHandler.
Для запуска нужно ввести:
```sh
  Name="model_name" Path="path_to_file" node scripts/uploadLocalFile.js
```

Сервис так же содержит в себе скрипт который принимает переменный аргумент и запускает загрузку со страницы РОСПАТЕНТА.
Для запуска нужно:

```sh
node scripts/networkUpdate.js Parametr
```
Вместо слова `Parametr` передаете название данных которые хотите обновить.

```javascript
  await networkUpdate();
```

# Routing

В сервисе присутствует роутинг для запросов:

```javascript
  app.post('/rpc', async (req, res) => {
    const action = await rpc.call({}, req.body);
    res.send(action);
  });
```

## Request
Входные параметры и их типы:
- number (Number) - целочисленный
- name (String) - строка
- limit (Number) - целочисленый - является не обязательным. Limit - это число которое ограничивает количество записей за единицу запроса. То есть, если мы поставим число 7, то нам придет ответ с 7ю записями. Если количества записей меньше чем введенное вами число, то просто происходит вывод записей, если записей больше, то происходит ограничение. Если вы хотите получить остальные записи вам стоит добавить аргумент lastId. По умолчанию задано 10, максимально 20 и минимально 1. Данное действие делается для того чтобы не нагружать сервер.
- lastId (objectId) - id - является обязательным при пагинации, если записей более 10 вам нужно прислать последний id записи, чтобы продолжить просмотр подбора.


# Построение запроса

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

## Patent - патенты

В поле *module* ставится Patent (далее соответственно названию).

Для поля *methods* доступны следущие методы:
- getByRegNumber - number - получение информации по регистрационному номеру.
- getByInventionName - name, limit, lastId - получение записей по имени изобретения
- getByAuthors - name, limit, lastId - поиск записей по авторам

## Trademark - логотипы

- getByRegNumber - number - олучение информации по регистрационному номеру.
- getByRightHolders - name, limit, lastId - поиск записей по названию компании

## ProgramRegistry - реестр программ для эвм

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
