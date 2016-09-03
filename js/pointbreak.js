// Selectors

var body          = qs('body');
var navList       = qs('#nav-list');
var viewList      = qs('#view-list');
var btnOpenAddNew = qs('#btn-open-add-new');
var formAddNew    = qs('#form-add');

// Form data
var newWidth      = qsa('#form-add [name="add-width"]');
var newHeight     = qsa('#form-add [name="add-height"]');
var newTitle      = qsa('#form-add [name="add-title"]');

// Handlebars templates
var tplNavList          = qs('#tpl-nav-list');
var tplViewList         = qs('#tpl-view-list');
var tplViewListSingle   = qs('#tpl-view-list-single');


// Listeners

window.addEventListener('load', init);
navList.addEventListener('click', itemClicked);
viewList.addEventListener('click', viewClicked);
btnOpenAddNew.addEventListener('click', toggleAddNewWindow);
formAddNew.addEventListener('submit', addNewItem);

// Functions

function addNewItem(e) {
  e.preventDefault();
  var newItem = {
    id: guid(),
    title: newTitle[0].value,
    width: newWidth[0].value,
    height: newHeight[0].value
  };
    
  pbPrefs.views.push(newItem);
  
  renderNavList();
  renderViewSingle(newItem);
  refreshViewOrder();
  savePreferences();
}

function toggleAddNewWindow() {
  btnOpenAddNew.classList.toggle('is-active');
  body.classList.toggle("add-new-active");
}

function itemClicked(e) {
  // If deleting an element
  if (e.target.closest('.icon-delete')) {
    var deletedID = e.target.closest('.nav-list__item').dataset.id;
    deleteItem(deletedID)
  }
}

function viewClicked(e) {
  // If deleting an element
  if (e.target.closest('.icon-delete')) {
    var deletedID = e.target.closest('.view-list__item').dataset.id;
    deleteItem(deletedID)
  }
}

function deleteItem(deletedID) {
  // Get all items that match the ID
  var itemsToDelete = qsa('[data-id="'+deletedID+'"]');
  
  // Delete all items that match on ID
  itemsToDelete.forEach(function(node){
    node.parentNode.removeChild(node);
  })
  
  // Remove deleted item from preferences object
  pbPrefs.views.forEach(function(item, index){
    if ( deletedID == item.id ) {
      pbPrefs.views.splice(index,1);
    }
  });

  refreshViewOrder();
  savePreferences();
}

function refreshViewOrder() {
  var navListItems  = qsa('#nav-list .nav-list__item');
  var distance = 0;
    
  navListItems.forEach(function(item){
    var view = qs('#view-list [data-id="'+item.dataset.id+'"]');
    view.style.transform = 'translateX(' + distance + 'px)';
    distance = 20 + distance + parseFloat(item.dataset.width);
  });
}

function savePreferences() {
  var navListItems = qsa('#nav-list .nav-list__item');
  pbPrefs.views = [];

  navListItems.forEach(function(el){
      pbPrefs.views.push({
        id: el.dataset.id,
        title: el.dataset.title,
        width: el.dataset.width,
        height: el.dataset.height
      })
  });
    
  var string = JSON.stringify(pbPrefs);
  localStorage.setItem('pbPrefs', string);
}


// Onload and libraries

function init() {
  var storedPrefs = localStorage.getItem('pbPrefs');
  if (storedPrefs != null) {
    pbPrefs = JSON.parse(storedPrefs);
  }
  renderNavList();
  renderViewList();
  refreshViewOrder();
  savePreferences();
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

function renderViewSingle(data) {
  var template = Handlebars.compile(tplViewListSingle.textContent);
  var html = template(data);
  viewList.innerHTML = viewList.innerHTML + html;
}

function removeLocalStorage() {
  localStorage.removeItem('pbPrefs');
}

// Drag and drop

var drake = dragula([navList]);
drake.on('drop', function(){
  refreshViewOrder();
  savePreferences();
});

// Helpers

function qs(i){
  return document.querySelector(i);
}

function qsa(i){
  return document.querySelectorAll(i);
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
