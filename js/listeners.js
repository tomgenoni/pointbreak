window.addEventListener('load', init);

tokens.addEventListener('click', tokenClick);

toolbar.form.addEventListener('submit', loadURL);
toolbar.setting.addEventListener('click', toggleSidebar);

newToken.width.addEventListener('keyup', addNewFormValidate);
newToken.height.addEventListener('keyup', addNewFormValidate);

addNew.form.addEventListener('submit', addNewView);


// Window Controls
var win = chrome.app.window.current();

window.control.close.addEventListener('click', function(){
  win.close();
})

window.control.min.addEventListener('click', function(){
  win.minimize();
})

window.control.max.addEventListener('click', function() {
  if (win.isMaximized()) {
    win.restore();
  } else {
    win.maximize();
  }
});
