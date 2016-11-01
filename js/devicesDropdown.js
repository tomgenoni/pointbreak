function cleanHeight(str) {
  var value = str.replace('× ','');
  return value.trim();
}

function populateDropdown() {
  var html = "";
  devicesData.entry.forEach(function(item, index){
    var title = item.title.$t;
    var width = item.pxscreenw;
    var height = cleanHeight(item.pxscreenh);
    
    var el = document.createElement('option');
    el.dataset.title = title;
    el.dataset.width = width;
    el.dataset.height = height;
    el.innerText = title;
    el.value = index + 1;
    
    addNew.select.appendChild(el);
  });
  
}

function deviceSelect(){
  var value = addNew.select.selectedIndex;
  
  if ( value > 0 ) {
    var item = value - 1;
    var title = devicesData.entry[item].title.$t;
    var width = devicesData.entry[item].pxscreenw;
    var height = cleanHeight(devicesData.entry[item].pxscreenh);
    
    newToken.width.value = width;
    newToken.height.value = height;
    newToken.title.value = title;
    
    addNewFormValidate();
    
  } else {
    newToken.width.value = '';
    newToken.height.value = '';
    newToken.title.value = '';
  }
}
