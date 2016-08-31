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
sizesList.addEventListener('click', editItem);


// Drag and drop

var drake = dragula([sizesList]);
drake.on('drop', reordered);


// Functions

function editItem(e) {
  if (e.target.closest('.delete')){
    var sizeItem = e.target.closest('.sizes__item');
    sizesList.removeChild(sizeItem);
    reordered();
  }
}

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
