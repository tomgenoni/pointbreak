// Selectors

var body          = qs('body');
var navList       = qs('#nav-list');
var viewList      = qs('#view-list');
var btnOpenAddNew = qs('#btn-open-add-new');
var formAddNew    = qs('#form-add');
var formAddError  = qs('#form-add-error');
var urlInput      = qs('#url');
var formURL       = qs('#form-url');

// Form data
var newWidth      = qsa('#form-add [name="add-width"]');
var newHeight     = qsa('#form-add [name="add-height"]');
var newTitle      = qsa('#form-add [name="add-title"]');

// Handlebars templates
var tplNavList          = qs('#tpl-nav-list');
var tplViewList         = qs('#tpl-view-list');
var tplViewListSingle   = qs('#tpl-view-list-single');

var data = [];

// Listeners

window.addEventListener('load', init);
navList.addEventListener('click', itemClicked);
viewList.addEventListener('click', viewClicked);
formURL.addEventListener('submit', loadURL);
btnOpenAddNew.addEventListener('click', toggleAddNewWindow);
formAddNew.addEventListener('submit', addNewItem);

// Functions

function addNewItem(e) {
  e.preventDefault();
  
  var error = false;
  
  var inputsToCheck = [
    newWidth[0].value,
    newHeight[0].value
  ];
  
  inputsToCheck.forEach(function(item, value) {
    if ( item == '' && item != parseInt(item, 10)) {
      formAddError.style.display = 'block';
      revealAddNew();
      error = true;
      return;
    }
  });
  
  if ( error != true ) {
    
    formAddError.style.display = 'none';
    
    if ( newTitle[0].value == '') {
      newTitle[0].value = 'Custom';
    }
    
    var newItem = {
      id: guid(),
      title: newTitle[0].value,
      width: newWidth[0].value,
      height: newHeight[0].value
    };
    
    newTitle[0].value = '';
    newWidth[0].value = '';
    newHeight[0].value = '';
    
    data.views.push(newItem);
    
    renderTemplate('navList', navList, [newItem], 'prepend');
    renderTemplate('viewList', viewList, [newItem], 'prepend');
    
    revealAddNew();
    refreshViewOrder();

    // Set first URL in stack to new webview
    var webviews = document.querySelectorAll('webview');
    webviews[0].src = data.urls[0];
    
    console.log(data.urls[0]);
        
    savePreferences();
  }
}

// Show/hide just the Add New form
// Hidden completely when list is on top
function toggleAddNewWindow() {
  body.classList.toggle('add-new-active');
  setTimeout(function(){
    formAddError.style.display = 'none';
  }, 200)
  revealAddNew();
}

function revealAddNew() {
  var formHeight = formAddNew.offsetHeight;
  navList.style.transform = 'translateY(' + formHeight + 'px)';
  if ( !body.classList.contains('add-new-active')) {
    navList.style.transform = 'translateY(0)';
  }
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
  data.views.forEach(function(item, index){
    if ( deletedID == item.id ) {
      data.views.splice(index,1);
    }
  });

  refreshViewOrder();
  savePreferences();
}

function refreshViewOrder() {
  var navListItems  = qsa('#nav-list .nav-list__item');
  var gap = 15;
  var distance = gap;
    
  navListItems.forEach(function(item){
    var view = qs('#view-list [data-id="'+item.dataset.id+'"]');
    view.style.transform = 'translateX(' + distance + 'px)';
    distance = gap + distance + parseFloat(item.dataset.width);
  });
}

function savePreferences() {
  var navListItems = qsa('#nav-list .nav-list__item');
  data.views = [];
  
  navListItems.forEach(function(el){
      data.views.push({
        id: el.dataset.id,
        title: el.dataset.title,
        width: el.dataset.width,
        height: el.dataset.height
      })
  });
  
  chrome.storage.local.set(data);
}


// Onload and libraries

function init() {
  var stored = chrome.storage.local.get(['urls', 'views'], function(result){
        
    if (result) {
      data = result;
    } else {
      data = pbPrefs;
    }
    
    renderTemplate('navList', navList, data.views)
    renderTemplate('viewList', viewList, data.views)
    refreshViewOrder();
    
    // Set first URL in stack to new webview
    var webviews = document.querySelectorAll('webview');
    webviews.forEach(function(view){
      view.src = data.urls[0];
    });
    
    // Set the value of the URL bar
    urlInput.value = data.urls[0];
    
    savePreferences();
  });
}

function loadURL(e) {
  e.preventDefault();
  var url = urlInput.value;
  var webviews = document.querySelectorAll('webview');
  webviews.forEach(function(view){
    view.src = url;
  });
  
  data.urls.unshift(url);
  savePreferences();
}

function removeLocalStorage() {
  chrome.storage.local.remove(['urls','views']);
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
