// Selectors

var body          = document.querySelector('body');
var navList       = document.querySelector('#nav-list');
var viewList      = document.querySelector('#view-list');
var btnOpenAddNew = document.querySelector('#btn-open-add-new');
var formAddNew    = document.querySelector('#form-add');

var tplNavList    = document.querySelector('#tpl-nav-list');
var tplViewList   = document.querySelector('#tpl-view-list');

// Variables

var pbPrefs = {
  urls: [],
  views: [
    {
      id: '32d45cd4-145a-3cf4-ddc1-cc3855ce64f9',
      title: 'iPhone',
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
navList.addEventListener('click', itemClicked);
viewList.addEventListener('click', viewClicked);
btnOpenAddNew.addEventListener('click', toggleAddNewWindow);

// Functions

function toggleAddNewWindow() {
  btnOpenAddNew.classList.toggle('is-active');
  body.classList.toggle("add-new-active");
}


function itemClicked(e) {
  // If deleting an element
  if (e.target.closest('.icon-delete')) {
    var itemToDelete = e.target.closest('.nav-list__item');
    var deletedID = itemToDelete.dataset.id;
    deleteItem(deletedID)
  }
}

function viewClicked(e) {
  // If deleting an element
  if (e.target.closest('.icon-delete')) {
    var itemToDelete = e.target.closest('.view-list__item');
    var deletedID = itemToDelete.dataset.id;
    deleteItem(deletedID)
  }
}

function deleteItem(deletedID) {
  var itemToDelete = document.querySelector('#nav-list [data-id="'+deletedID+'"]');
  var viewToDelete = document.querySelector('#view-list [data-id="'+deletedID+'"]');
  
  navList.removeChild(itemToDelete);
  viewList.removeChild(viewToDelete);
  
  pbPrefs.views.forEach(function(item, index){
    if ( deletedID == item.id ) {
      pbPrefs.views.splice(index,1);
    }
  });

  refreshViewOrder();
  savePreferences();
}

function refreshViewOrder() {
  var navListItems  = document.querySelectorAll('#nav-list .nav-list__item');
  var distance = 0;
    
  navListItems.forEach(function(item){
    var view = document.querySelector('#view-list [data-id="'+item.dataset.id+'"]');
    view.style.transform = 'translateX(' + distance + 'px)';
    distance = 20 + distance + parseFloat(item.dataset.width);
  });
}

function savePreferences() {
  var navListItems = document.querySelectorAll('#nav-list .nav-list__item');
  pbPrefs.views = [];

  navListItems.forEach(function(el){
      pbPrefs.views.push({
        id: el.dataset.id,
        title: el.dataset.title,
        width: el.dataset.width,
        height: el.dataset.height
      })
  });
    
  // var string = JSON.stringify(pbPrefs);
  // localStorage.setItem('pbPrefs', string);
}


// Onload and libraries

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function init() {
  var storedPrefs = localStorage.getItem('pbPrefs');
  if (storedPrefs != null) {
    pbPrefs = JSON.parse(storedPrefs);
  }
  renderNavList();
  renderViewList();
  refreshViewOrder();
}

function renderNavList(data) {
  if (!data) {
    var data = pbPrefs.views;
  }
  var template = Handlebars.compile(tplNavList.textContent);
  var html = template(data);
  navList.innerHTML = html;
}

function renderViewList(data) {
  if (!data) {
    var data = pbPrefs.views;
  }
  var template = Handlebars.compile(tplViewList.textContent);
  var html = template(data);
  viewList.innerHTML = html;
}

// Drag and drop

var drake = dragula([navList]);
drake.on('drop', function(){
  refreshViewOrder();
  savePreferences();
});
