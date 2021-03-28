'use strict';

// constructor

const Note = function (title, noteText, isPinned, background, label) {
  this.title = title;
  this.noteText = noteText;
  this.isPinned = isPinned;
  this.background = background;
  this.label = label;
  if (isPinned === 'true') {
    Note.pinned.push(this);
  } else {
    Note.other.push(this);
  }
};
Note.other = [];
Note.pinned = [];
Note.prototype.addToLocalStorage = function () {
  localStorage.setItem('pinned', JSON.stringify(Note.pinned));
  localStorage.setItem('other', JSON.stringify(Note.other));
};

if (localStorage.getItem('pinned')) {
  Note.pinned = JSON.parse(localStorage.getItem('pinned'));
}
if (localStorage.getItem('other')) {
  Note.other = JSON.parse(localStorage.getItem('other'));
}

$('#form').on('submit', function (event) {
  event.preventDefault();
  console.log(event.target);
  let title = $('#title').val();
  let text = $('#note').val();
  let pin = $('#pin').attr('clicked');
  let background = $('.inpt--ctr').css('background-color');
  let labelTemp = $('#labels').children().text().split('X');
  let labels = labelTemp.slice(0, labelTemp.length - 1);
  console.log(title, text, pin, background, labels);
  $('#form').trigger('reset');
  let note = new Note(title, text, pin, background, labels);
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
function addLabels(index) {
  if (Note.pinned[index].label.length != '0') {
    for (let i = 0; i < Note.pinned[index].label.length; i++) {
      $('.labels-area').append(
        `<div class="label-item"><h1>${Note.pinned[index].label[i]}</h1></div>`
      );
    }
  }
}

console.log(Note.pinned);
function renderPinned() {
  for (let index = 0; index < Note.pinned.length; index++) {
    $('#pinnedCards').append(`<div class="note-card">
    <div class="heading"><h2>${Note.pinned[index].title}</h2></div>
    <div class="content">${Note.pinned[index].noteText}</div>
    <div class="labels-area">${addLabels(index)}</div>
    <div class="trashed">
                    <ion-icon name="trash-outline" size="large" id="trashed" role="img" class="md icon-large hydrated" aria-label="trash outline"></ion-icon>
                  </div>
    </div>`);
  }
}
renderPinned();
