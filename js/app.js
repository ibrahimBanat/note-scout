'use strict';

// constructor

const Note = function (title, noteText, isPinned, background) {
  this.title = title;
  this.noteText = noteText;
  this.isPinned = isPinned;
  this.background = background;
  Note.all.push(this);
};
Note.all = [];
Note.prototype.addToLocalStorage = function () {
  localStorage.setItem('Notes', JSON.stringify(Note.all));
};

if (localStorage.getItem('Notes')) {
  Note.all = JSON.parse(localStorage.getItem('Notes'));
}

$('#form').on('submit', function (event) {
  event.preventDefault();
  console.log(event.target);
  let title = $('#title').val();
  let text = $('#note').val();
  let pin = $('#pin').attr('clicked');
  let background = $('.inpt--ctr').css('background-color');
  console.log(title, text, pin, background);
  $('#form').trigger('reset');
  let note = new Note(title, text, pin, background);
  console.log(Note.all);
  note.addToLocalStorage();
});

$('#pin').click(function () {
  console.log('clicked');
  if ($('#pin').attr('clicked') === 'false') {
    $('#pin').attr('name', 'pin');
    $('#pin').attr('clicked', 'true');
  } else {
    $('#pin').attr('name', 'pin-outline');
    $('#pin').attr('clicked', 'false');
  }
});

$('#trash').click(function () {
  $('#form').trigger('reset');
  $('#pin').attr('name', 'pin-outline');
  $('.inpt--ctr').css('background-color', '#dddddc');
  $('#labels').html('');
});

$('.span1, .span2, .span3, .span4').click(function (event) {
  let cardBackground = $(this).css('background-color');
  $('.inpt--ctr').css('background-color', cardBackground);
});
$('.label').on('click', function () {
  let label = $(this).children('.labelInner').text();
  $('#labels').append(
    `<div class="added"><div class="added--text">${label}</div><span class="remove">X</span></div>`
  );
  $('.remove').on('click', function () {
    $(this).parent().remove();
  });
});

$('#inputLabel').keypress(function (event) {
  var keycode = event.keyCode ? event.keyCode : event.which;
  if (keycode == '13') {
    let content = $(this).val();
    $(`<div class="label1">
    <ion-icon name="ticket-outline"></ion-icon>
    <span class="labelInner">${content}</span></div>`).insertAfter(this);
    $(this).val('');
    $('.label1').on('click', function () {
      let label = $(this).children('.labelInner').text();
      $('#labels').append(
        `<div class="added"><div class="added--text">${label}</div><span class="remove">X</span></div>`
      );
    });
  }
});
console.log('line82');
function render() {}
