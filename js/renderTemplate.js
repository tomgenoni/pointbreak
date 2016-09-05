function renderNavList(data, type) {

  var html = '';
  
  data.forEach(function(value, index){
    var template =`
    <div class="nav-list__item" data-id="${data[index].id}" data-title="${data[index].title}" data-width="${data[index].width}" data-height="${data[index].height}">
      <div class="text">
        <div class="text__size">${data[index].width}x${data[index].height}</div>
        <div class="text__title">${data[index].title}</div>
      </div>
      <div class="icon icon-delete"></div>
    </div>
    `
    html = html + template;
    
  })
  
  if (type == 'prepend') {
    navList.innerHTML = html + navList.innerHTML;
  } else {
    navList.innerHTML = html;
  }
}

function renderViewList(data, type) {

  var html = '';
  
  data.forEach(function(value, index){
    var template =`
    <div class="view-list__item" data-id="${data[index].id}">
      <div class="view__tools">
        <div>
          <button class="button button--tiny button--clear button--reload"></button>
        </div>
        <div>
          <span class="view__size">${data[index].width}x${data[index].height}</span>
          <span class="view__title">${data[index].title}</span>
        </div>
        <div class="icon icon-delete"></div>
      </div>
      <div frameborder="0" src="http://atomeye.com" class="webview" style="width:${data[index].width}px;height:${data[index].height}px"></div>
    </div>
    `
    html = html + template;
    
  })

  if (type == 'prepend') {
    viewList.innerHTML = html + viewList.innerHTML;
  } else {
    viewList.innerHTML = html;
  }
}
