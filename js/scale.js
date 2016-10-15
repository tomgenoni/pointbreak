var scale = qs("#scale");
var scaleValue = qs(".scale__value");

scale.addEventListener('input', scaleViews);

function scaleViews() {
  var value = scale.value / 100;
  var webviews = document.querySelectorAll("webview");
  body.dataset.scale = value;
  scaleValue.innerHTML = (parseFloat(value) * 100).toFixed(0) + "%"; 
  
  refreshViewOrder();
  
  webviews.forEach(function(item){
    scaleWebview(item);
    increaseObjectSize(item)
    reduceContainerSize(item)
  });
    
  function scaleWebview(item) {
    item.style.transform = "scale("+value+")";
  }
  
  function increaseObjectSize(item) {
    // increase the size of the webview#shadow-root.object
    var webviewObj = item.shadowRoot.querySelector("object");
    var webviewGrow = ((1 / parseFloat(value)) * 100) + "%";
    webviewObj.style.width = webviewGrow;
    webviewObj.style.height = webviewGrow;
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
