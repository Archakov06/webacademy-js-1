function getUsers(){

  $.ajax({
    url: 'http://59300a1ca2a45f0011b0727f.mockapi.io/users'
  })
  .done(function(data) {
    people = data;
    createTable();
  });

}

function removeItem(i){
  var result = [];

  if (confirm('Вы действительно хотите удалить?')) {
    $('#item-' + i).remove();

    // DELETE запрос к серверу
    // <<< тут

    people.forEach(function(elem, index){
      if (i != index) result.push(elem);
    });

  }

  people = result;
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

function addItem(){

  var first_name = $('div' + ' input[name="first_name"]').val();
  var last_name = $('div'+ ' input[name="last_name"]').val();
  var email = $('div'+ ' input[name="email"]').val();
  var phone = $('div'+ ' input[name="phone"]').val();

  var add =  {
    "first_name": first_name,
    "last_name": last_name,
    "phone": email,
    "email": phone
  }

  $('div input').val('');

  people.push(add);

  createTable();

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
    '  <td>'+ i +'</td>',
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
  $('tbody > tr').remove();
  var count = people.length;
  for (var i = 0; i < count; i++) {
    var man = people[i];
    createItem(man, i);
  }
}

$(document).ready(function(){

	getUsers();

});
