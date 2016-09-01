// Selectors

var viewsList = document.querySelector('#viewsList');
var views     = document.querySelector('#views');


// Variables

var pointbreakPrefs = {
  url: 'http://atomeye.com',
  views: [
    {
      id: '32d45cd4-145a-3cf4-ddc1-cc3855ce64f9',
      title: 'Apple iPhone',
      width: 230,
      height: 400
    },
    {
      id: 'a57cb33b-817a-1a5e-5bfa-14b996b60c0c',
      title: 'Custom',
      width: 250,
      height: 450
    },
    {
      id: 'a017f948-2226-4ea5-b81d-1bdef63a5375',
      title: 'Custom',
      width: 300,
      height: 470
    }
  ]
}


// Listeners

window.addEventListener('load', init);
viewsList.addEventListener('click', editItem);


// Drag and drop

var drake = dragula([viewsList]);
drake.on('drop', reordered);


//Functions

function editItem(e) {
  if (e.target.closest('.delete')){
    var sizeItem = e.target.closest('.sizes__item');
    viewsList.removeChild(sizeItem);
    reordered();
  }
}

function init() {
  var prefs = localStorage.getItem('pointbreakPrefs');
  if (prefs != null) {
    pointbreakPrefs = JSON.parse(prefs);
  }
  renderViewsList();
  renderViews();
}

function renderViewsList() {
  var data = pointbreakPrefs.views;
  var template = Handlebars.compile(tplViewsList.textContent);
  var html = template(data);
  viewsList.innerHTML = html;
}

function renderViews() {
  var data = pointbreakPrefs.views;
  var template = Handlebars.compile(tplViews.textContent);
  var html = template(data);
  views.innerHTML = html;
}

function reordered() {
  updateViewOrder();
  save();
}

function updateViewOrder() {
  var viewItems = document.querySelectorAll('#viewsList .sizes__item');
  viewItems.forEach(function(item){
    console.log(item.dataset.id);
  })
}

function save() {
  var string = JSON.stringify(pointbreakPrefs);
  localStorage.setItem('pointbreakPrefs', string);
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
