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

     $.ajax({
        url: 'http://59300a1ca2a45f0011b0727f.mockapi.io/users/' + i,
        method: 'DELETE',
      }).done(function() {

        people.forEach(function(elem, index){
          if (i != index) result.push(elem);
        });

        people = result;

      });

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

function addItem(){

  if ($('div input.error').length) {
    alert('Одно из полей указано с ошибкой!');
    return;
  }

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

function createItem(man){

  var first_name = man.first_name;
  var last_name = man.last_name;
  var email = man.email;
  var phone = man.phone;
  var i = man.id;

  var arr = [
    '<tr id="item-'+ i +'">',
    '  <td>'+ i +'</td>',
    '  <td><input name="first_name" readonly value="'+ first_name +'"><span style="display:none">'+ first_name +'</span></td>',
    '  <td><input name="last_name" readonly value="'+ last_name +'"><span style="display:none">'+ last_name +'</span></td>',
    '  <td><input name="email" readonly value="'+ email +'"><span style="display:none">'+ email +'</span></td>',
    '  <td><input name="phone" readonly value="'+ phone +'"><span style="display:none">'+ phone +'</span></td>',
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

  $('input[name="phone"]').mask("+7 (999) 999-9999");

  $('input[name="email"]').validex({
    pattern: 'email',
    onValid: function(input, target) {
      $(target).removeClass('error');
    },
    onNotValid: function(input, target) {
      $(target).addClass('error');
    }
  });

  $('#search-input').jSearch({
	    selector  : 'table tbody',
	    child : 'td span',
	    Found : function(elem){
	        $(elem).parent().parent().show();
	    },
	    NotFound : function(elem){
          $(elem).parent().parent().hide();
	    },
      After: function(){
        if (!$('#search-input').val()) {
          $('table tbody tr').show();
        }
      }
	});

	getUsers();

});
