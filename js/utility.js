// Helpers

function qs(i){
  return document.querySelector(i);
}

function qsa(i){
  return document.querySelectorAll(i);
}

function qsjs(i){
  return document.querySelector('[data-js=' + i + ']');
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
  var htmlImport = qsjs('svg-sprite');
  var htmlDoc = htmlImport.import;
  var htmlMessage = htmlDoc.querySelector('svg');
  document.body.insertBefore(htmlMessage.cloneNode(true), document.body.firstChild );
  document.querySelector('svg').style.display = 'none';
}

loadSprite();
