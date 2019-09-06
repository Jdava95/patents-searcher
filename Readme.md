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