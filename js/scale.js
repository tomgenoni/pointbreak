var scale = qs("#scale");
scale.addEventListener('input', scaleViews);

function scaleViews() {
  var value = scale.value / 100;
  var webviews = document.querySelectorAll("webview");
  body.dataset.scale = value;
  refreshViewOrder();
  
  webviews.forEach(function(item){
    setBodyScale(item);
    increaseObjectSize(item)
    reduceContainerSize(item)
  });
  
  function setBodyScale(item) {
    // set the scale value for use by
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
