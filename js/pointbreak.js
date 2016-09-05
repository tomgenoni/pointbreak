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

// Onload

function init() {
  chrome.storage.local.get(['urlData', 'viewData'], function(result){
                        
    if (result.viewData && result.urlData) {
      urlData = result.urlData;
      viewData = result.viewData;
    } else {
      urlData = urlDataVirgin;
      viewData = viewDataVirgin;
    }
        
    renderTemplate('navList', navList, viewData)
    renderTemplate('viewList', viewList, viewData)
    refreshViewOrder();
    
    // Set the URL for each webview
    var webviews = qsa('webview');
    webviews.forEach(function(view){
      view.src = urlData[0];
    });
    
    // Set the value of the URL bar
    urlInput.value = urlData[0];
    
    savePreferences();
  });
}

// Save data to storage after some add/delete

function savePreferences() {
  var navListItems = qsa('#nav-list .nav-list__item');
  viewData = [];
  
  navListItems.forEach(function(el){
      viewData.push({
        id    : el.dataset.id,
        title : el.dataset.title,
        width : el.dataset.width,
        height: el.dataset.height
      })
  });
    
  chrome.storage.local.set({viewData:viewData});
  chrome.storage.local.set({urlData:urlData});
}




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
    
    viewData.push(newItem);
    
    renderTemplate('navList', navList, [newItem], 'prepend');
    renderTemplate('viewList', viewList, [newItem], 'prepend');
    
    revealAddNew();
    refreshViewOrder();

    // Set first URL in stack to new webview
    var webviews = qsa('webview');
    webviews[0].src = urlData[0];
    
    console.log(urlData[0]);
        
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
  viewData.forEach(function(item, index){
    if ( deletedID == item.id ) {
      viewData.splice(index,1);
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

function loadURL(e) {
  e.preventDefault();
  var url = urlInput.value;
  var webviews = qsa('webview');
  webviews.forEach(function(view){
    view.src = url;
  });
  
  urlData.unshift(url);
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
