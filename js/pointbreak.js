// Selectors

var body              = qs('body');
var navList           = qs('#nav-list');
var viewList          = qs('#view-list');
var btnOpenAddNew     = qs('#btn-open-add-new');
var formAddNew        = qs('#form-add');
var formAddError      = qs('#form-add-error');
var urlInput          = qs('#url');
var formURL           = qs('#form-url');
var btnBookmark       = qs('#bookmark');
var btnBookmarks      = qs('#bookmarks');

// Form data
var newWidth          = qsa('#form-add [name="add-width"]');
var newHeight         = qsa('#form-add [name="add-height"]');
var newTitle          = qsa('#form-add [name="add-title"]');

// Handlebars templates
var tplNavList        = qs('#tpl-nav-list');
var tplViewList       = qs('#tpl-view-list');
var tplViewListSingle = qs('#tpl-view-list-single');

// Listeners

window.addEventListener('load', init);
navList.addEventListener('click', itemClicked);
viewList.addEventListener('click', viewClicked);
formURL.addEventListener('submit', loadURL);
btnOpenAddNew.addEventListener('click', toggleAddNewWindow);
formAddNew.addEventListener('submit', formValidate);
btnBookmark.addEventListener('click', toggleBookmark);
btnBookmarks.addEventListener('click', showBookmarks);


function toggleBookmark(e) {
  e.preventDefault()
  var url = urlInput.value;
  if ( bookmarks.indexOf(url) > -1 ) {
    // remove class .is-active
    bookmarks.forEach(function(value, index){
      if (url == value) {
        bookmarks.splice(index, 1)
      }
    })
  } else {
    // add class .is-active
    bookmarks.push(url);
  }
  saveBookmarks();
}

function showBookmarks(e) {
  
}

function saveBookmarks() {
  chrome.storage.sync.set({bookmarks:bookmarks});
}

// On app open
function init() {
  chrome.storage.sync.get(['urlLastUsed', 'viewData', 'bookmarks'], function(result){
              
    // If there are settings previously saved
    // otherwise use the virgin-state data
    if (result.viewData && result.urlLastUsed) {
      urlLastUsed = result.urlLastUsed;
      viewData = result.viewData;
    } else {
      urlLastUsed = urlLastUsedVirgin;
      viewData = viewDataVirgin;
    }
    
    if (result.bookmarks) {
      bookmarks = result.bookmarks;
    } else {
      bookmarks = [];
    }
    
    console.log(bookmarks);
        
    renderTemplate('navList', navList, viewData)
    renderTemplate('viewList', viewList, viewData)
    refreshViewOrder();
    
    // Set the URL for each webview
    setViewsURL(urlLastUsed)
    showWebviewLoader();
    
    // Set the value of the URL bar
    urlInput.value = urlLastUsed;
    
    savePreferences();
  });
}

// Set and load URL for each webview
function setViewsURL(url) {
  var webviews = qsa('webview');
  webviews.forEach(function(view){
    view.src = url;
  });
}

// Save data to storage after some event
function savePreferences() {
  chrome.storage.sync.set({viewData:viewData});
  chrome.storage.sync.set({urlLastUsed:urlLastUsed});
}

function formValidate(e) {
  e.preventDefault();
  
  var error = false;
  var inputsToCheck = [
    newWidth[0].value,
    newHeight[0].value
  ];
  
  inputsToCheck.forEach(function(item, value) {
    if ( item == '' && item != parseInt(item, 10)) {
      formError('block');
      revealAddNewForm();
      error = true;
    }
  });
  
  // If we find any errors stop here.
  if (error == true) return;
  
  // If no errors, add the new item.
  addNewView();
}

function addNewView() {
  formError('none');
  
  // Title is not required
  if ( newTitle[0].value == '') {
    newTitle[0].value = 'Custom';
  }
  
  // Get values for new item to be added
  var newItem = {
    id: guid(),
    title: newTitle[0].value,
    width: newWidth[0].value,
    height: newHeight[0].value
  };
  
  // Clear out all form values
  newTitle[0].value  = '';
  newWidth[0].value  = '';
  newHeight[0].value = '';
  
  viewData.push(newItem);
  
  renderTemplate('navList', navList, [newItem], 'prepend');
  renderTemplate('viewList', viewList, [newItem], 'prepend');
  
  revealAddNewForm();
  refreshViewOrder();

  // Set first URL in stack to new webview
  var webviews = qsa('webview');
  webviews[0].src = urlLastUsed[0];
          
  savePreferences();
}

// Show/hide just the Add New form
// Hidden completely when list is on top
function toggleAddNewWindow() {
  body.classList.toggle('add-new-active');
  revealAddNewForm();
  navList.addEventListener('transitionend', formError('none'), false);
  navList.removeEventListener('transitionend', formError('none'), false);
}

function formError(state){
  formAddError.style.display = state;
}


// This shows/hides the new item form
// We need to hide it until the items below slide down
// Does NOT control the animation
function revealAddNewForm() {
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

// Load the URL entered into the URL bar
function loadURL(e) {
  e.preventDefault();
  
  var url = urlClean(urlInput.value);
  setViewsURL(url)
  showWebviewLoader();
  
  urlInput.value = url;
  urlLastUsed = url;
  
  savePreferences();
}

// Show webview progress loading bar
function showWebviewLoader() {
  var webviews = qsa("webview");
  
  webviews.forEach(function(view){
    var indicator = view.parentNode.children[1];

    indicator.classList.remove('loading');
    indicator.classList.remove('loaded');
    
    var loadstart = function() {
      indicator.classList.add('loading');
    }
    
    var loadstop = function() {
      indicator.classList.remove('loading');
      indicator.classList.add('loaded');
    }
    
    // Wait for transition to end, ~500ms
    var transitionEnded = function(event) {
      indicator.classList.remove('loaded');
      indicator.removeEventListener('transitionend', transitionEnded);
    };

    indicator.addEventListener('transitionend',transitionEnded, false);
    
    view.addEventListener('loadstart', loadstart);
    view.addEventListener('loadstop', loadstop);
  });
  
}

// Remove all stored data
function removeStorage() {
  chrome.storage.sync.remove(['urlLastUsed','viewData'], function(){
    console.log('app storage removed');
  });
}

//-------------------------
// Drag and drop
//---------------------------
var drake = dragula([navList]);
drake.on('drop', function(){
  refreshViewOrder();
  getNewOrder();
  savePreferences();
});

function getNewOrder() {
  // Get all the remaining items since we don't know
  // what the new order is
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
}
