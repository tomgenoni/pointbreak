window.addEventListener('load', init);

tokens.addEventListener('click', tokenClick);

addNew.form.addEventListener('submit', addNewFormValidate);

toolbar.form.addEventListener('submit', loadURL);
toolbar.setting.addEventListener('click', toggleSidebar);

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
