function renderTemplate(templateName, target, data, type) {

  var html = '';
    
  data.forEach(function(value, index){
            
    if (templateName == 'tokens') {
      var template =`
      <div class="token__item" data-id="${data[index].id}" data-title="${data[index].title}" data-width="${data[index].width}" data-height="${data[index].height}">
        <div class="token__text">
          <div class="token__size">${data[index].width}x${data[index].height}</div>
          <div class="token__title">${data[index].title}</div>
          </div>
          <svg class="icon icon--small">
            <use xlink:href="#icon-close"></use>
          </svg>
      </div>
      `
    }
    
    if (templateName == 'views') {
      var template =`
      <div class="view__item is-hidden" data-id="${data[index].id}">
        <div class="view__tools">
            <span class="view__size">${data[index].width}x${data[index].height}</span>
            <span class="view__title">${data[index].title}</span>
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
