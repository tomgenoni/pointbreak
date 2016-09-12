// Selectors
// =====================

var body   = qs('body');
var tokens = qsjs('tokens');
var views  = qsjs('views');

// Toolbar
var toolbar = {
  url   : qsjs('toolbar-url'),
  form  : qsjs('toolbar-form')
}

// Add New Token Form
var addNew = {
  toggle: qsjs('open-toggle-new'),
  form  : qsjs('add-form'),
  error : qsjs('add-form-error')
}

// New Token info
var newToken = {
  width : qsjs('token-width'),
  height: qsjs('token-height'),
  title : qsjs('token-title')
}

var bookmark = {
  toggle: qsjs('bookmark-btn'),
  view  : qsjs('bookmarks-btn'),
  list  : qsjs('bookmark-list')
}
