window.addEventListener('load', init);

tokens.addEventListener('click', tokenClick);
views.addEventListener('click', viewClick);

addNew.toggle.addEventListener('click', addNewToggle);
addNew.form.addEventListener('submit', addNewFormValidate);

toolbar.form.addEventListener('submit', loadURL);
toolbar.setting.addEventListener('click', toggleSidebar);
