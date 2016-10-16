// On app open
function init() {
    
  var chromeStorage = [
    'urlStore',
    'viewStore'
  ]
  
  chrome.storage.sync.get(chromeStorage, function(result){

    detectDefaults(result);
    
    renderTemplate('tokens', tokens, viewStore);
    renderTemplate('views', views, viewStore);
    
    refreshViewOrder();
    
    setViewsURL(urlStore);
    setToolbarURL(urlStore);

    savePreferences();
  });
}

function detectDefaults(result) {
  // If there are settings previously saved
  // otherwise use the virgin-state data
  
  if ( result.viewStore ) {
    viewStore = result.viewStore;
  } else {
    viewStore = viewStoreVirgin;
  }
  
  if ( result.urlStore ) {
    urlStore = result.urlStore;
  } else {
    urlStore = urlStoreVirgin;
  }
}

function refreshViewOrder() {
  var scaleValue = body.dataset.scale;
  var navListItems  = qsa('.tokens .token__item');
  var gap = 15;
  var distance = gap;
    
  navListItems.forEach(function(item){
    var view = qs('.views [data-id="'+item.dataset.id+'"]');
    view.style.transform = 'translateX(' + distance + 'px)';
    distance = gap + distance + parseFloat(item.dataset.width) * scaleValue;
  });
}

// Set and load URL for each webview
function setViewsURL(url) {
  var webviews = qsa('webview');
  webviews.forEach(function(view){
    view.src = url;
  });
  showWebviewLoader();
}

// Set the toolbar URL
function setToolbarURL(url) {
  toolbar.url.value = url;
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
      view.parentNode.classList.remove('is-hidden');
      scaleViews();
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


//-------------------------
// Save and drop data
//---------------------------

// Save data to storage after some event
function savePreferences() {
  chrome.storage.sync.set({viewStore:viewStore});
  chrome.storage.sync.set({urlStore:urlStore});
}

// Remove all stored data
function removeStorage() {
  chrome.storage.sync.remove(['urlStore','viewStore'], function(){
    console.log('app storage removed');
  });
}

//--------------------------
// Actions
//-------------------------

function tokenClick(e) {
  // If deleting an element
  if (e.target.closest('.icon')) {
    var deletedID = e.target.closest('.token__item').dataset.id;
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
  viewStore.forEach(function(item, index){
    if ( deletedID == item.id ) {
      viewStore.splice(index,1);
    }
  });

  refreshViewOrder();
  savePreferences();
}

function addNewFormValidate() {
  
  var error = false;
  
  var inputsToCheck = [
    newToken.width.value,
    newToken.height.value
  ];

  inputsToCheck.forEach(function(value, index) {
    if ( value == '' || value != parseInt(value, 10)) {
      addNew.button.setAttribute('disabled', 'disabled');
      error = true;
    }
  });

  if (error != true) {
    addNew.button.removeAttribute('disabled');
  };
}

function addNewView(e) {
  
  e.preventDefault();
    
  addNew.button.setAttribute('disabled', 'disabled');
  
  // Title is not required
  if ( newToken.title.value == '') {
    newToken.title.value = 'Custom';
  }
  
  // Get values for new item to be added
  var newItem = {
    id: guid(),
    title: newToken.title.value,
    width: newToken.width.value,
    height: newToken.height.value
  };
  
  // Clear out all form values
  newToken.title.value  = '';
  newToken.width.value  = '';
  newToken.height.value = '';
  
  viewStore.push(newItem);
  
  renderTemplate('tokens', tokens, [newItem], 'prepend');
  renderTemplate('views', views, [newItem], 'prepend', true);
  
  // Set first URL in stack to new webview
  var webviews = qsa('webview');
  webviews[0].src = toolbar.url.value;
  
  showWebviewLoader();
  savePreferences();
}

// Load the URL entered into the URL bar
function loadURL(e) {
  e.preventDefault();
  
  // Clean the url if it's missing http
  var url = urlClean(toolbar.url.value);
  toolbar.url.value = url;
  urlStore = url;
  
  setViewsURL(url)
  showWebviewLoader();
  
  savePreferences();
}

// Show/hide sidebar
function toggleSidebar() {
  body.classList.toggle('sidebar-active');
}

// Add transparent cover to views so scroll in app is not
// swallowed by the webviews
function scrollSheild(e) {
  body.classList.remove('scroll-shield-active');
   if (e.shiftKey) {
     body.classList.add('scroll-shield-active');
   }
}

// Drag and drop
//---------------------------

var drake = dragula([tokens]);
drake.on('drop', function(){
  refreshViewOrder();
  getNewOrder();
  savePreferences();
});

function getNewOrder() {
  // Get all the remaining items since we don't know
  // what the new order is
  var navListItems = qsa('.tokens .token__item');
  viewStore = [];

  navListItems.forEach(function(el){
      viewStore.push({
        id    : el.dataset.id,
        title : el.dataset.title,
        width : el.dataset.width,
        height: el.dataset.height
      })
  });
}
