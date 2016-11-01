function populateDropdown() {
  devicesData.forEach(function(item, index){
    var title = item.title;
    
    var el = document.createElement('option');
    el.dataset.title = title;
    el.innerText = title;
    el.value = index + 1;
    
    addNew.select.appendChild(el);
  });
  
}

function deviceSelect(){
  var value = addNew.select.selectedIndex;
  
  if ( value > 0 ) {
    var item = value - 1;
    var title = devicesData[item].title;
    var width = devicesData[item].width;
    var height = devicesData[item].height;
    
    newToken.width.value = width;
    newToken.height.value = height;
    newToken.title.value = title;
    
    addNewFormValidate();
    
  } else {
    clearAddNewFormValues();
  }
}
