var scale = qs("#scale");
var scaleValue = qs(".scale__value");

scale.addEventListener('input', scaleViews);
scale.addEventListener('mouseenter', scaleMouseEnter);
scale.addEventListener('mouseleave', scaleMouseLeave);

function scaleMouseEnter() {
  var value = "0ms";
  var viewItems = qsa(".view__item");
  viewItems.forEach(function(item){
    item.style.transitionDuration = value
  })
}

function scaleMouseLeave() {
  var value = "300ms";
  var viewItems = qsa(".view__item");
  viewItems.forEach(function(item){
    item.style.transitionDuration = value
  })
}

function scaleViews() {
  var value = scale.value / 100;
  var webviews = document.querySelectorAll("webview");
  body.dataset.scale = value;
  scaleValue.innerHTML = (parseFloat(value) * 100).toFixed(0) + "%";
  
  refreshViewOrder();
  
  webviews.forEach(function(item){
    scaleWebview(item);
    reduceContainerSize(item)
  });
    
  function scaleWebview(item) {
    item.style.transform = "scale("+value+")";
  }
  
  function reduceContainerSize(item) {
    // descrease the size of the container
    // good christ this is ridiculous
    var viewItem = item.parentNode;
    var itemWidth = parseFloat(item.style.width);
    var itemHeight= parseFloat(item.style.height);
    viewItemWidthShrink = (parseFloat(value) * itemWidth) + "px";
    viewItemHeightShrink = (parseFloat(value) * itemHeight) + "px";
    viewItem.style.width = viewItemWidthShrink;
    viewItem.style.height = viewItemHeightShrink;
  }
}
