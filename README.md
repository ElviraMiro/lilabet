# Задача #

Создание блога по спортивным пронозам средствами Meteor.js

## Описание задачи ##

Пользователи, заходя на сайт, могут просматривать прогнозы, осуществлять поиск прогноза на интересующий нас матч, получать статистику по правильности прогнозов ("проходимости ставок") в разрезе направлений прогнозов (по виду спорта, по команде, по чемпионату).

### Необходимое программное обеспечение ###

Операционная система: Linux или MacOS.

### Первый этап. Подготовка программной среды ###

1. Установить mongodb и mongodv-server: http://www.mongodb.org/downloads

2. Установить Node.js: http://nodejs.org/

3. Установить Meteor.js:

```
curl https://install.meteor.com/ | sh
```

и установить Meteorite:

```
npm install -g meteorite
```

### Второй этап. Разворачивание тестового приложения ###

Чтобы не вспоминать, что куда надо записывать воспользуемся Yeoman - помощником для быстрого разворачивания структуры приложения с генератором для Meteor.js (подробнее можно прочитать: http://yeoman.io/ и https://github.com/Pent/generator-meteor).

```
npm install -g yo
npm install -g generator-meteor
```

Создаем директорию для нашего проекта Lilabet, переходим в нее и запускаем наш помощник:

```
mkdir lilabet
cd lilabet
yo meteor
```

В процессе выполнения последней команды будут два вопроса, на которые рекомендую ответить YES.

```
[?] Shall we include Iron Router? Yes
[?] Shall we include Bootstrap with LESS? Yes
```

Необходимо обновить пакеты проекта:

```
mrt update
```

На этом этапе можно запустить уже проект и получить уже результат - в папке проекта запустить:

```
mrt
```

В браузере по адресу: http://localhost:3000/ можно посмотреть результат.

### Третий этап. Определение структуры данных проекта ###

Воспользуемся Yeoman для создания коллекций Tags и Posts:

```
yo meteor:collection tags
yo meteor:collection posts
```

Данные шаги создадут по три файла для каждой из коллекций в следующих папках нашего проекта:

* lib

*Соотнесение переменных в Node.js с коллекциями баз данных.*

```
Tags = new Meteor.Collection("tags");
```

Для того, чтобы нам потом при работе с дальнейшими модернизациями не приходилось каждый раз вспоминать, какие же поля есть в нашей коллекции, рекомендую использовать пакет для Meteor: **simple-schema**. Установим такой пакет (https://github.com/aldeed/meteor-simple-schema) в наш проект:

```
mrt add simple-schema
```

Изменим код на:

```
TagSchema = new SimpleSchema({
	title: {
		type: String,
		label: "Title",
		max: 100
	},
	tagType: {
		// 0 - sport, 1 - tournament, 2 - team, 3 - other
		type: Number,
		label: "Tag's type"
	}
});

Tags = new Meteor.Collection("tags", {schema: TagSchema});
```

Также в этом файле необходимо определить условия разрешения на изменения данных в базе:

```
Tags.allow({
	insert: function(userId, doc) {
		return isUserAdmin(userId);
	},
	update: function(userId, doc, fields, modifier) {
		return isUserAdmin(userId);
	},
	remove: function(userId, doc) {
		if (isUserAdmin(userId)) {
			var posts = Posts.find({tags: doc.title}).fetch();
			if (posts.length > 0) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
});
```

В нашем случае работу с коллекцией Tags будет осуществлять только администратор. Для оптимизации кода для проверки является ли пользователь администратором напишем функцию:

Файл: **lib/helpers/users.js**

```
isUserAdmin = function(uid) {
	var user = Meteor.users.findOne(uid);
	if (user && user.isAdmin) {
		return true;
	} else {
		return false;
	}
};
```

* server

*Описание структуры публикации данных со стороны сервера*. Это позволяет нам не отправлять на клиент всю базу данных, а определять куски информации, которые могут быть необходимы пользователю в каждый конкретный момент.

```
Meteor.publish('tags', function() {
	return Tags.find();
});
```

При необходимости как-то ограничить данные - изменяется запрос к коллекции, который возвращается.

* client/lib

*Подключение данных с сервера в локальную базу клиента*.

```
Meteor.subscribe('tags');
```


Плюс в этом шаге я еще и определяю при каких условиях могут изменяться данные в базе - в нашем случае - у пользователя должен стоять флаг isAdmin

Такая проверка - является ли пользователем администратором мне будет необходима достаточно часто, поэтому рекомендую создать соответствующий helper: для этого в lib/helpers я создам файл users.js с следующей информацией:

	isUserAdmin = function(uid) {
		var user = Meteor.users.findOne(uid);
		if (user && user.isAdmin) {
			return true;
		} else {
			return false;
		}
	};

Пример указания разрешающих соответствующие изменения условий - в данном случае нельзя будет удалить теги, которые уже задействованы для каких-либо постов:

	Tags.allow({
		insert: function(userId, doc) {
			return isUserAdmin(userId);
		},
		update: function(userId, doc, fields, modifier) {
			return isUserAdmin(userId);
		},
		remove: function(userId, doc) {
			if (isUserAdmin(userId)) {
				var posts = Posts.find({tags: doc.title}).fetch();
				if (posts.length > 0) {
					return false;
				} else {
					return true;
				}
			} else {
				return false;
			}
		}
	});


2-й шаг. Инструкции серверу о публикации данных коллекций на клиент - файлы, лежащие в папке server нашего проекта

В нашем случае я создаю два файла: posts.js и users.js

posts.js с описанием публикации двух видов постов (postsForStatistics - облегченная версия для статистики по тегам и результат (без контента) для облегчения загружаемой на клиент информации, и workingPost - еще не отработанные посты (у которых результата игр пока нету) - те, что будут отображаться на главной страницы для изучения посетителями) и tags (которые я публикую все)

users.js с описанием публикации коллекции пользователей - тоже облегченный вариант - только необходимая нам информация, без служебной

пример частичной публикации:

	Meteor.publish('postsForStatistics', function() {
	  return Posts.find({isTrue: {$ne: null}}, {fields: {title: 1, tags: 1, isTrue: 1}});
	});

3-й шаг. В клиентской части я описываю на какие (определенные в предыдущем шаге) публикации я подписываюсь. Возможно сделать отдельные подписки для разных ссылок. Но в нашем случае достаточно определить их для всего клиента - файлы, лежащие в папке client/lib нашего проекта.

Сделаем два файла - posts.js (для подписок postsForStatistics, workingPosts, tags) и user.js (для подписки users)

Практически предыдущую работу можно сделать также с помощью генератора yeoman - для этого достаточно набрать в командной строке:

	yo meteor:collection yourCollectionName

Однако в таком случае получим упрощенный вариант - будет выставлена полная подписка на коллекцию, без расписывания структуры данных и прав на добавление/редактирование - это все равно придется делать вручную. Зато будут автоматом созданы в нужных местах необходимые файлы.

Теперь будем определять собственно клиентскую часть, что показывается пользователю.

Начнем с административной части для заполнения новых и редактирования существующих тегов, статей. Отладку визуальной части проще делать при наличии данных в базе.

Пропишем инструкцию для клиентской части нашего блога по обработке ссылки /admin

Рабочий файл, описывающий обработку url сервером - client/routes.js

Добавим описание новой ссылки в Router.map

	Router.map(function() {
		...
		this.route('admin', {
			path: '/admin', // ссылка сайта, которая обрабатывается
			template: 'admin' // название шаблона, который будет подставляться в заглавный html файл нашего проекта
		});
	});

Соответственно нам необходимо будет создать в директории client/views - файл, содержащий шаблон по имени "admin"

Небольшое отступление:

Мы будем работать с текстом, который не должен смотреться слишком скучно, желательна возможность "обвязка" наших постов всяческими красивостями. Поэтому сделаем следующее:

Добавим в директорию public нашего проекта ckeditor - загрузить код на сайте: http://ckeditor.com

Для доступа к нему добавим в заголовок файла client/views/layout.html две строчки:

	<script type="text/javascript" src="ckeditor/ckeditor.js"></script>
	<script type="text/javascript" src="ckeditor/adapters/jquery.js"></script>

Переходим собственно к нашему фронтенду. Создадим два файла в папке client/views - admin.html (в котором разместим шаблон административной панели "admin") и admin.js (в котором будем описывать helpers и events для шаблонов) - воспользуемся для этого нашим помощником Yeoman:

	yo meteor:view admin

И, да, нам же придется вводить в формах даты и время матча, чего bootstrap по умолчанию не может - поэтому рекомендую для фронтенда использовать (загрузить код с сайта: http://tarruda.github.io/bootstrap-datetimepicker/ в каталог public нашего проекта)

Добавим соответственно две строчки в layout.html

	<link rel="stylesheet" type="text/css" media="screen" href="bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css">
	<script type="text/javascript" src="ootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>

Также есть смысл добавить библиотеку для парсинга, валидации и манипуляций с датами:
	
	mrt add moment

Приступим к структурированию нашей административной панели.
Шаблон "admin" будет содержать - сверху меню (шаблон "adminNavigation") и, собственно, рабочую зону, которую пользователь может увидеть только, если он залогинен и является администратором: client/views/admin.html

	<template name="admin">
		{{> adminNavigation}}
		{{#if currentUser}}
			{{#if isUserAdmin}}
				<div class="container-fluid">
					{{> adminPanel}}
				</div>
			{{/if}}
		{{/if}}
	</template>

Переменная currentUser предопределена, а вот isUserAdmin нам необходимо определить. Это мы сделаем в файле client/views/admin.js:

	Template.admin.helpers({
		isUserAdmin: function() {
			return isUserAdmin(Meteor.userId());
		}
	});

В навигационном меню добавим шаблон loginButtons из установленного пакета accounts-ui - не будем заморачиваться с написанием отдельной формы для входа/выхода/регистрации пользователя в/из системы.

Подробнее описывать не буду: docs.meteor.com в помощь. Замечу только, что в шаблоне editPostPanel у нас появится форма для ввода данных поста, где будут поля с датой и временем игры и содержимого поста - вышеуказанные красоты мы добавим по окончанию рендеринга этого шаблона:

	Template.editPostPanel.rendered = function() {
		$('textarea.editable').ckeditor();
		$('#datetimepicker').datetimepicker({
			format: 'dd-MM-yyyy hh:mm'
		});
	};

Ах, да. Как же компьютер определит, что зарегистрированный мною пользователь является администратором. Для этого добавим команду при старте (файл server/server.js):

	Meteor.startup(function () {
		Meteor.users.update({"emails.address": "karashistka@yandex.ru"}, {$set: {isAdmin: true}});
	});

