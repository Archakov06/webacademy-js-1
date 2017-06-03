var people = [
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

function removeItem(i){
  if (confirm('Вы действительно хотите удалить?')) {
    $('#item-' + i).remove();
  }
}

function saveItem(index){

  var count = people.length;

  for (var i = 0; i < count; i++) {
    if ( i == index ) {

      var first_name = $('#item-'+ index + ' input[name="first_name"]').val();
      var last_name = $('#item-'+ index + ' input[name="last_name"]').val();
      var email = $('#item-'+ index + ' input[name="email"]').val();
      var phone = $('#item-'+ index + ' input[name="phone"]').val();

      people[index].first_name = first_name;
      people[index].last_name = last_name;
      people[index].email = email;
      people[index].phone = phone;

    }
  }

}

function editItem(i){
  var text = $('#edit-' + i).text(); // Редактировать
  var editable = text == 'Редактировать' ? true : false;
  text = editable ? 'Сохранить' : 'Редактировать';

  $('#item-' + i).find('input').each(function(){
    if (editable) $(this).removeAttr('readonly'); else $(this).attr('readonly', '');
  });

  if (!editable) {
    saveItem(i);
  }

  $('#edit-' + i).text(text);
}

function createItem(man, i){

  var first_name = man.first_name;
  var last_name = man.last_name;
  var email = man.email;
  var phone = man.phone;

  var arr = [
    '<tr id="item-'+ i +'">',
    '  <td><input name="first_name" readonly value="'+ first_name +'"></td>',
    '  <td><input name="last_name" readonly value="'+ last_name +'"></td>',
    '  <td><input name="email" readonly value="'+ email +'"></td>',
    '  <td><input name="phone" readonly value="'+ phone +'"></td>',
    '  <td>',
    '    <button id="remove-'+ i +'" onClick="removeItem('+ i +')" class="ui inverted red button">Удалить</button>',
    '    <button id="edit-'+ i +'" onClick="editItem('+ i +')" class="ui inverted blue button">Редактировать</button>',
    '  </td>',
    '</tr>'
  ];

  var html = arr.join('');

  $('tbody').append(html);

}

function createTable(){
  var count = people.length;
  for (var i = 0; i < count; i++) {
    var man = people[i];
    createItem(man, i);
  }
}

$(document).ready(function(){

	createTable();

});
