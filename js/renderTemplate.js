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
          <div class="icon icon-delete"></div>
      </div>
      `
    }
    
    if (templateName == 'viewList') {
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
