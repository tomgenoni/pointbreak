// Selectors

var sizesList = document.querySelector('#sizes');
var tplSizesList = document.querySelector('#tplSizesList');


// Variables

var pointbreakPrefs = {
  url: 'http://atomeye.com',
  sizes: ['485x800', '500x789', '564x550']
}


// Listeners

window.addEventListener('load', init);


// Drag and drop

var drake = dragula([sizesList]);
drake.on('drop', reordered);


// Functions

function init() {
  var prefs = localStorage.getItem('pointbreakPrefs');
  if (prefs != null) {
    pointbreakPrefs = JSON.parse(prefs);
  }
  listPrefs(pointbreakPrefs);
}

function listPrefs() {
  var url = pointbreakPrefs.url;
  var sizes = pointbreakPrefs.sizes;
  // var html = '';
  // sizes.forEach(function(item){
  //   html += '<div class=sizes__item data-size=' + item + '>' + item + '</div>';
  // });
  // sizesList.innerHTML = html;
  
  var template = Handlebars.compile(tplSizesList.textContent);
  var html = template(sizes);
  sizesList.innerHTML = html;

}

function reordered() {
  changeOrder();
  save();
}

function changeOrder() {
  var sizes = [];
  var listItems = Array.from(sizesList.children);
  pointbreakPrefs.sizes = [];
  listItems.forEach(function(item, index){
    pointbreakPrefs.sizes.push(item.dataset.size);
  });
}

function save() {
  var string = JSON.stringify(pointbreakPrefs);
  localStorage.setItem('pointbreakPrefs', string);
}
