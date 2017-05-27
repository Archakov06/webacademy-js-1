var peoples = [
   {
     "first_name": "Вася",
     "last_name": "Пупкин",
     "phone": "+7 (999) 999-99-99",
     "email": "moy@pochta.ru"
   },
   {
     "first_name": "Mackeen",
     "last_name": "Freeman",
     "phone": "+7 (999) 111-11-11",
     "email": "moy@pochta.ru"
   },
   {
     "first_name": "Choma",
     "last_name": "Andree",
     "phone": "+7 (999) 222-22-33",
     "email": "moy@pochta.ru"
   },
   {
     "first_name": "Arnn",
     "last_name": "Ronna",
     "phone": "+7 (999) 333-33-33",
     "email": "moy@pochta.ru"
   },
   {
     "first_name": "Lofstead",
     "last_name": "Ossie",
     "phone": "+7 (999) 444-44-44",
     "email": "moy@pochta.ru"
   },
   {
     "first_name": "Sipler",
     "last_name": "Paige",
     "phone": "+7 (999) 555-55-55",
     "email": "moy@pochta.ru"
   }
];

$(document).ready(function(){

	function createItem(man){
		$('tbody').append('<tr id="item-0"><td>' + man.first_name + '</td><td>' + man.last_name + '</td><td>' + man.phone + '</td><td>' + man.email + '</td><td><button class="ui inverted red button">Удалить</button></td></tr>');
	}

	function createTable(){
		var count = peoples.length;
		for (var i = 0; i < count; i++) {
			var man = peoples[i];
			createItem(man);
		}
	}

	createTable();

});
