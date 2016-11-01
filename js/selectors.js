// Selectors
// =====================

var body   = qs('body');
var tokens = qsjs('tokens');
var views  = qsjs('views');

// Toolbar
var toolbar = {
  setting  : qsjs('toolbar-setting'),
  url      : qsjs('toolbar-url'),
  form     : qsjs('toolbar-form')
}

// Add New Token Form
var addNew = {
  select: qsjs('add-device'),
  form  : qsjs('add-form'),
  button: qsjs('add-new')
}

// New Token info
var newToken = {
  width : qsjs('token-width'),
  height: qsjs('token-height'),
  title : qsjs('token-title')
}

// Window controls
var control = {
  close : qsjs('window-close'),
  min   : qsjs('window-min'),
  max   : qsjs('window-max')
}
