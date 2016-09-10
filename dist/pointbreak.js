!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;n="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,n.dragula=e()}}(function(){return function e(n,t,r){function o(u,c){if(!t[u]){if(!n[u]){var a="function"==typeof require&&require;if(!c&&a)return a(u,!0);if(i)return i(u,!0);var f=new Error("Cannot find module '"+u+"'");throw f.code="MODULE_NOT_FOUND",f}var l=t[u]={exports:{}};n[u][0].call(l.exports,function(e){var t=n[u][1][e];return o(t?t:e)},l,l.exports,e,n,t,r)}return t[u].exports}for(var i="function"==typeof require&&require,u=0;u<r.length;u++)o(r[u]);return o}({1:[function(e,n,t){"use strict";function r(e){var n=u[e];return n?n.lastIndex=0:u[e]=n=new RegExp(c+e+a,"g"),n}function o(e,n){var t=e.className;t.length?r(n).test(t)||(e.className+=" "+n):e.className=n}function i(e,n){e.className=e.className.replace(r(n)," ").trim()}var u={},c="(?:^|\\s)",a="(?:\\s|$)";n.exports={add:o,rm:i}},{}],2:[function(e,n,t){(function(t){"use strict";function r(e,n){function t(e){return-1!==le.containers.indexOf(e)||fe.isContainer(e)}function r(e){var n=e?"remove":"add";o(S,n,"mousedown",O),o(S,n,"mouseup",L)}function c(e){var n=e?"remove":"add";o(S,n,"mousemove",N)}function m(e){var n=e?"remove":"add";w[n](S,"selectstart",C),w[n](S,"click",C)}function h(){r(!0),L({})}function C(e){ce&&e.preventDefault()}function O(e){ne=e.clientX,te=e.clientY;var n=1!==i(e)||e.metaKey||e.ctrlKey;if(!n){var t=e.target,r=T(t);r&&(ce=r,c(),"mousedown"===e.type&&(p(t)?t.focus():e.preventDefault()))}}function N(e){if(ce){if(0===i(e))return void L({});if(void 0===e.clientX||e.clientX!==ne||void 0===e.clientY||e.clientY!==te){if(fe.ignoreInputTextSelection){var n=y("clientX",e),t=y("clientY",e),r=x.elementFromPoint(n,t);if(p(r))return}var o=ce;c(!0),m(),D(),B(o);var a=u(W);Z=y("pageX",e)-a.left,ee=y("pageY",e)-a.top,E.add(ie||W,"gu-transit"),K(),U(e)}}}function T(e){if(!(le.dragging&&J||t(e))){for(var n=e;v(e)&&t(v(e))===!1;){if(fe.invalid(e,n))return;if(e=v(e),!e)return}var r=v(e);if(r&&!fe.invalid(e,n)){var o=fe.moves(e,r,n,g(e));if(o)return{item:e,source:r}}}}function X(e){return!!T(e)}function Y(e){var n=T(e);n&&B(n)}function B(e){$(e.item,e.source)&&(ie=e.item.cloneNode(!0),le.emit("cloned",ie,e.item,"copy")),Q=e.source,W=e.item,re=oe=g(e.item),le.dragging=!0,le.emit("drag",W,Q)}function P(){return!1}function D(){if(le.dragging){var e=ie||W;M(e,v(e))}}function I(){ce=!1,c(!0),m(!0)}function L(e){if(I(),le.dragging){var n=ie||W,t=y("clientX",e),r=y("clientY",e),o=a(J,t,r),i=q(o,t,r);i&&(ie&&fe.copySortSource||!ie||i!==Q)?M(n,i):fe.removeOnSpill?R():A()}}function M(e,n){var t=v(e);ie&&fe.copySortSource&&n===Q&&t.removeChild(W),k(n)?le.emit("cancel",e,Q,Q):le.emit("drop",e,n,Q,oe),j()}function R(){if(le.dragging){var e=ie||W,n=v(e);n&&n.removeChild(e),le.emit(ie?"cancel":"remove",e,n,Q),j()}}function A(e){if(le.dragging){var n=arguments.length>0?e:fe.revertOnSpill,t=ie||W,r=v(t),o=k(r);o===!1&&n&&(ie?r.removeChild(ie):Q.insertBefore(t,re)),o||n?le.emit("cancel",t,Q,Q):le.emit("drop",t,r,Q,oe),j()}}function j(){var e=ie||W;I(),z(),e&&E.rm(e,"gu-transit"),ue&&clearTimeout(ue),le.dragging=!1,ae&&le.emit("out",e,ae,Q),le.emit("dragend",e),Q=W=ie=re=oe=ue=ae=null}function k(e,n){var t;return t=void 0!==n?n:J?oe:g(ie||W),e===Q&&t===re}function q(e,n,r){function o(){var o=t(i);if(o===!1)return!1;var u=H(i,e),c=V(i,u,n,r),a=k(i,c);return a?!0:fe.accepts(W,i,Q,c)}for(var i=e;i&&!o();)i=v(i);return i}function U(e){function n(e){le.emit(e,f,ae,Q)}function t(){s&&n("over")}function r(){ae&&n("out")}if(J){e.preventDefault();var o=y("clientX",e),i=y("clientY",e),u=o-Z,c=i-ee;J.style.left=u+"px",J.style.top=c+"px";var f=ie||W,l=a(J,o,i),d=q(l,o,i),s=null!==d&&d!==ae;(s||null===d)&&(r(),ae=d,t());var p=v(f);if(d===Q&&ie&&!fe.copySortSource)return void(p&&p.removeChild(f));var m,h=H(d,l);if(null!==h)m=V(d,h,o,i);else{if(fe.revertOnSpill!==!0||ie)return void(ie&&p&&p.removeChild(f));m=re,d=Q}(null===m&&s||m!==f&&m!==g(f))&&(oe=m,d.insertBefore(f,m),le.emit("shadow",f,d,Q))}}function _(e){E.rm(e,"gu-hide")}function F(e){le.dragging&&E.add(e,"gu-hide")}function K(){if(!J){var e=W.getBoundingClientRect();J=W.cloneNode(!0),J.style.width=d(e)+"px",J.style.height=s(e)+"px",E.rm(J,"gu-transit"),E.add(J,"gu-mirror"),fe.mirrorContainer.appendChild(J),o(S,"add","mousemove",U),E.add(fe.mirrorContainer,"gu-unselectable"),le.emit("cloned",J,W,"mirror")}}function z(){J&&(E.rm(fe.mirrorContainer,"gu-unselectable"),o(S,"remove","mousemove",U),v(J).removeChild(J),J=null)}function H(e,n){for(var t=n;t!==e&&v(t)!==e;)t=v(t);return t===S?null:t}function V(e,n,t,r){function o(){var n,o,i,u=e.children.length;for(n=0;u>n;n++){if(o=e.children[n],i=o.getBoundingClientRect(),c&&i.left+i.width/2>t)return o;if(!c&&i.top+i.height/2>r)return o}return null}function i(){var e=n.getBoundingClientRect();return u(c?t>e.left+d(e)/2:r>e.top+s(e)/2)}function u(e){return e?g(n):n}var c="horizontal"===fe.direction,a=n!==e?i():o();return a}function $(e,n){return"boolean"==typeof fe.copy?fe.copy:fe.copy(e,n)}var G=arguments.length;1===G&&Array.isArray(e)===!1&&(n=e,e=[]);var J,Q,W,Z,ee,ne,te,re,oe,ie,ue,ce,ae=null,fe=n||{};void 0===fe.moves&&(fe.moves=l),void 0===fe.accepts&&(fe.accepts=l),void 0===fe.invalid&&(fe.invalid=P),void 0===fe.containers&&(fe.containers=e||[]),void 0===fe.isContainer&&(fe.isContainer=f),void 0===fe.copy&&(fe.copy=!1),void 0===fe.copySortSource&&(fe.copySortSource=!1),void 0===fe.revertOnSpill&&(fe.revertOnSpill=!1),void 0===fe.removeOnSpill&&(fe.removeOnSpill=!1),void 0===fe.direction&&(fe.direction="vertical"),void 0===fe.ignoreInputTextSelection&&(fe.ignoreInputTextSelection=!0),void 0===fe.mirrorContainer&&(fe.mirrorContainer=x.body);var le=b({containers:fe.containers,start:Y,end:D,cancel:A,remove:R,destroy:h,canMove:X,dragging:!1});return fe.removeOnSpill===!0&&le.on("over",_).on("out",F),r(),le}function o(e,n,r,o){var i={mouseup:"touchend",mousedown:"touchstart",mousemove:"touchmove"},u={mouseup:"pointerup",mousedown:"pointerdown",mousemove:"pointermove"},c={mouseup:"MSPointerUp",mousedown:"MSPointerDown",mousemove:"MSPointerMove"};t.navigator.pointerEnabled?w[n](e,u[r],o):t.navigator.msPointerEnabled?w[n](e,c[r],o):(w[n](e,i[r],o),w[n](e,r,o))}function i(e){if(void 0!==e.touches)return e.touches.length;if(void 0!==e.which&&0!==e.which)return e.which;if(void 0!==e.buttons)return e.buttons;var n=e.button;return void 0!==n?1&n?1:2&n?3:4&n?2:0:void 0}function u(e){var n=e.getBoundingClientRect();return{left:n.left+c("scrollLeft","pageXOffset"),top:n.top+c("scrollTop","pageYOffset")}}function c(e,n){return"undefined"!=typeof t[n]?t[n]:S.clientHeight?S[e]:x.body[e]}function a(e,n,t){var r,o=e||{},i=o.className;return o.className+=" gu-hide",r=x.elementFromPoint(n,t),o.className=i,r}function f(){return!1}function l(){return!0}function d(e){return e.width||e.right-e.left}function s(e){return e.height||e.bottom-e.top}function v(e){return e.parentNode===x?null:e.parentNode}function p(e){return"INPUT"===e.tagName||"TEXTAREA"===e.tagName||"SELECT"===e.tagName||m(e)}function m(e){return e?"false"===e.contentEditable?!1:"true"===e.contentEditable?!0:m(v(e)):!1}function g(e){function n(){var n=e;do n=n.nextSibling;while(n&&1!==n.nodeType);return n}return e.nextElementSibling||n()}function h(e){return e.targetTouches&&e.targetTouches.length?e.targetTouches[0]:e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:e}function y(e,n){var t=h(n),r={pageX:"clientX",pageY:"clientY"};return e in r&&!(e in t)&&r[e]in t&&(e=r[e]),t[e]}var b=e("contra/emitter"),w=e("crossvent"),E=e("./classes"),x=document,S=x.documentElement;n.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./classes":1,"contra/emitter":4,crossvent:8}],3:[function(e,n,t){"use strict";var r=e("ticky");n.exports=function(e,n,t){e&&r(function(){e.apply(t||null,n||[])})}},{ticky:6}],4:[function(e,n,t){"use strict";var r=e("atoa"),o=e("./debounce");n.exports=function(e,n){var t=n||{},i={};return void 0===e&&(e={}),e.on=function(n,t){return i[n]?i[n].push(t):i[n]=[t],e},e.once=function(n,t){return t._once=!0,e.on(n,t),e},e.off=function(n,t){var r=arguments.length;if(1===r)delete i[n];else if(0===r)i={};else{var o=i[n];if(!o)return e;o.splice(o.indexOf(t),1)}return e},e.emit=function(){var n=r(arguments);return e.emitterSnapshot(n.shift()).apply(this,n)},e.emitterSnapshot=function(n){var u=(i[n]||[]).slice(0);return function(){var i=r(arguments),c=this||e;if("error"===n&&t["throws"]!==!1&&!u.length)throw 1===i.length?i[0]:i;return u.forEach(function(r){t.async?o(r,i,c):r.apply(c,i),r._once&&e.off(n,r)}),e}},e}},{"./debounce":3,atoa:5}],5:[function(e,n,t){n.exports=function(e,n){return Array.prototype.slice.call(e,n)}},{}],6:[function(e,n,t){var r,o="function"==typeof setImmediate;r=o?function(e){setImmediate(e)}:function(e){setTimeout(e,0)},n.exports=r},{}],7:[function(e,n,t){(function(e){function t(){try{var e=new r("cat",{detail:{foo:"bar"}});return"cat"===e.type&&"bar"===e.detail.foo}catch(n){}return!1}var r=e.CustomEvent;n.exports=t()?r:"function"==typeof document.createEvent?function(e,n){var t=document.createEvent("CustomEvent");return n?t.initCustomEvent(e,n.bubbles,n.cancelable,n.detail):t.initCustomEvent(e,!1,!1,void 0),t}:function(e,n){var t=document.createEventObject();return t.type=e,n?(t.bubbles=Boolean(n.bubbles),t.cancelable=Boolean(n.cancelable),t.detail=n.detail):(t.bubbles=!1,t.cancelable=!1,t.detail=void 0),t}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],8:[function(e,n,t){(function(t){"use strict";function r(e,n,t,r){return e.addEventListener(n,t,r)}function o(e,n,t){return e.attachEvent("on"+n,f(e,n,t))}function i(e,n,t,r){return e.removeEventListener(n,t,r)}function u(e,n,t){var r=l(e,n,t);return r?e.detachEvent("on"+n,r):void 0}function c(e,n,t){function r(){var e;return p.createEvent?(e=p.createEvent("Event"),e.initEvent(n,!0,!0)):p.createEventObject&&(e=p.createEventObject()),e}function o(){return new s(n,{detail:t})}var i=-1===v.indexOf(n)?o():r();e.dispatchEvent?e.dispatchEvent(i):e.fireEvent("on"+n,i)}function a(e,n,r){return function(n){var o=n||t.event;o.target=o.target||o.srcElement,o.preventDefault=o.preventDefault||function(){o.returnValue=!1},o.stopPropagation=o.stopPropagation||function(){o.cancelBubble=!0},o.which=o.which||o.keyCode,r.call(e,o)}}function f(e,n,t){var r=l(e,n,t)||a(e,n,t);return h.push({wrapper:r,element:e,type:n,fn:t}),r}function l(e,n,t){var r=d(e,n,t);if(r){var o=h[r].wrapper;return h.splice(r,1),o}}function d(e,n,t){var r,o;for(r=0;r<h.length;r++)if(o=h[r],o.element===e&&o.type===n&&o.fn===t)return r}var s=e("custom-event"),v=e("./eventmap"),p=t.document,m=r,g=i,h=[];t.addEventListener||(m=o,g=u),n.exports={add:m,remove:g,fabricate:c}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./eventmap":9,"custom-event":7}],9:[function(e,n,t){(function(e){"use strict";var t=[],r="",o=/^on/;for(r in e)o.test(r)&&t.push(r.slice(2));n.exports=t}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[2])(2)});

urlLastUsedVirgin = [
  'http://thumbtack.com'
],

viewDataVirgin = [
  {
    id: '32d45cd4-145a-3cf4-ddc1-cc3855ce64f9',
    title: 'iPhone 6',
    width: 414,
    height: 736
  },
  {
    id: 'a57cb33b-817a-1a5e-5bfa-14b996b60c0c',
    title: 'Galaxy S',
    width: 480,
    height: 800
  },
  {
    id: 'a017f948-2226-4ea5-b81d-1bdef63a5375',
    title: 'Desktop',
    width: 980,
    height: 1200
  }
]

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
var bookmarkList      = qs('#bookmarkList');

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
formURL.addEventListener('submit', loadURLEvent);

btnOpenAddNew.addEventListener('click', toggleAddNewWindow);
formAddNew.addEventListener('submit', formValidate);

btnBookmark.addEventListener('click', toggleBookmark);
btnBookmarks.addEventListener('click', toggleBookmarksList);
bookmarkList.addEventListener('click', loadBookmark);


function hideBookmarks() {
  bookmarkList.classList.remove('is-active');
  bookmarkList.style.left = '-9999px';
}

function loadBookmark(e) {
  e.preventDefault();
  if (e.target.closest('li')) {
      var url = e.target.closest('li').textContent;
      hideBookmarks();
      loadURL(url);
  }
}

function toggleBookmark(e) {
  e.preventDefault();
  var url = urlInput.value;
  // If in array already
  if ( bookmarks.indexOf(url) > -1 ) {
    bookmarks.forEach(function(value, index){
      if (url == value) {
        bookmarks.splice(index, 1)
      }
    })
  } else {
    bookmarks.push(url);
  }
  checkForBookmark(url);
  renderBookmarks();
  saveBookmarks();
}

function toggleBookmarksList(e) {
  e.preventDefault();
  
  if (bookmarkList.classList.contains('is-active'))  {
    hideBookmarks();
  } else {
    var rect = btnBookmarks.getBoundingClientRect();
    var top = Math.round(rect.bottom);
    var left = Math.round(rect.right);
    var listWidth = bookmarkList.offsetWidth;
    bookmarkList.style.left = (left - listWidth) + 'px';
    bookmarkList.style.top = top + 'px';
    bookmarkList.classList.add('is-active');
  }
}

function saveBookmarks() {
  chrome.storage.sync.set({bookmarks:bookmarks});
}

function renderBookmarks() {
  btnBookmarks.removeAttribute('disabled');
  if (bookmarks.length < 1) {
    btnBookmarks.setAttribute('disabled','disabled');
  } else {
    var html = '';
    var container = qs('#bookmarkList ul');
    bookmarks.forEach(function(value, index){
      var template = `<li>${value}</li>`;
      html = html + template;
    });
    container.innerHTML = html;
  }
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

    renderTemplate('navList', navList, viewData);
    renderTemplate('viewList', viewList, viewData);
    renderBookmarks();
    refreshViewOrder();
    
    // Set the URL for each webview
    setViewsURL(urlLastUsed)
    showWebviewLoader();
    
    // Set the value of the URL bar
    urlInput.value = urlLastUsed;
    
    checkForBookmark(urlLastUsed);
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
  webviews[0].src = urlLastUsed;
          
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
  if (e.target.closest('.icon')) {
    var deletedID = e.target.closest('.nav-list__item').dataset.id;
    deleteItem(deletedID)
  }
}

function viewClicked(e) {
  // If deleting an element
  if (e.target.closest('.icon')) {
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

function loadURLEvent(e) {
  e.preventDefault();
  var url = urlClean(urlInput.value);
  loadURL(url);
}

// Load the URL entered into the URL bar
function loadURL(url) {
  
  setViewsURL(url)
  showWebviewLoader();
  
  urlInput.value = url;
  urlLastUsed = url;
  
  checkForBookmark(url);
  savePreferences();
}

function checkForBookmark(url) {
  var button = qs('#bookmark');
  var className = 'has-url';
  console.log(bookmarks, url);
  if ( bookmarks.indexOf(url) > -1 ) {
    button.classList.add(className)
  } else {
    button.classList.remove(className)
  }
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

function renderTemplate(templateName, target, data, type) {

  var html = '';
    
  data.forEach(function(value, index){
            
    if (templateName == 'navList') {
      var template =`
      <div class="nav-list__item" data-id="${data[index].id}" data-title="${data[index].title}" data-width="${data[index].width}" data-height="${data[index].height}">
        <div class="text">
          <div class="text__size">${data[index].width}x${data[index].height}</div>
          <div class="text__title">${data[index].title}</div>
          </div>
          <svg class="icon icon--small">
            <use xlink:href="#icon-close"></use>
          </svg>
      </div>
      `
    }
    
    if (templateName == 'viewList') {
      var template =`
      <div class="view-list__item" data-id="${data[index].id}">
        <div class="view__tools">
          <div>
            <span class="view__size">${data[index].width}x${data[index].height}</span>
            <span class="view__title">${data[index].title}</span>
          </div>
          <svg class="icon icon--small">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
        <div class="load-indicator"></div>
        <webview src="" class="webview" style="width:${data[index].width}px;height:${data[index].height}px"></webview>
      </div>
      `
    }
        
    html = html + template;
    
  })
  
  if (type == 'prepend') {
    target.insertAdjacentHTML( 'afterbegin', html );
  } else {
    target.innerHTML = html;
  }

}

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

function urlClean(url) {
  var prefix = 'http';
  if (url.substr(0, prefix.length) !== prefix) {
      url = prefix + '://' + url;
  }
  return url;
}

function loadSprite() {
  var htmlImport = document.querySelector('#svgSprite');
  var htmlDoc = htmlImport.import;
  var htmlMessage = htmlDoc.querySelector('svg');
  document.body.insertBefore(htmlMessage.cloneNode(true), document.body.firstChild );
  document.querySelector('svg').style.display = 'none';
}

loadSprite();
