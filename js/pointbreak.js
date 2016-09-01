// Selectors

var navList       = document.querySelector('#nav-list');
var viewList      = document.querySelector('#view-list');

var tplNavList    = document.querySelector('#tpl-nav-list');
var tplViewList   = document.querySelector('#tpl-view-list');

// Variables

var pbPrefs = {
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
navList.addEventListener('click', editItem);


// Drag and drop

var drake = dragula([navList]);
drake.on('drop', reordered);


//Functions

function editItem(e) {
  if (e.target.closest('.delete')){
    var sizeItem = e.target.closest('.sizes__item');
    navList.removeChild(sizeItem);
    reordered();
  }
}

function init() {
  var storedPrefs = localStorage.getItem('pbPrefs');
  if (storedPrefs != null) {
    pbPrefs = JSON.parse(storedPrefs);
  }
  renderNavList();
  renderViewList();
}

function renderNavList() {
  var data = pbPrefs.views;
  var template = Handlebars.compile(tplNavList.textContent);
  var html = template(data);
  navList.innerHTML = html;
}

function renderViewList() {
  var data = pbPrefs.views;
  var template = Handlebars.compile(tplViewList.textContent);
  var html = template(data);
  viewList.innerHTML = html;
}

function reordered() {
  updateViewOrder();
  save();
}

function updateViewOrder() {
  
  var navListItems  = document.querySelectorAll('#nav-list .nav-list__item');
  var viewListItems = document.querySelectorAll('#view-list .view-list__item');
  
  var viewItemsIDs = [];
  var newOrder = [];
  
  navListItems.forEach(function(item){
    viewItemsIDs.push(item.dataset.id);
  });
      
  viewListItems.forEach(function(item){
    var orderNum = viewItemsIDs.indexOf(item.dataset.id);
    newOrder.push(orderNum);
  });
  
  newOrder.forEach(function(value, index){
    viewListItems[index].style.order = value;
  });

}

function save() {
  var string = JSON.stringify(pbPrefs);
  localStorage.setItem('pbPrefs', string);
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
