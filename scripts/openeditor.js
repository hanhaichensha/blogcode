var exec = require('child_process').exec;
var parseConfig = require('./parse_config');
// Hexo 2.x 用户复制这段
// hexo.on('new', function(path){
// exec('start  "D:\\Program Files\\Sublime Text 3\\sublime_text.exe" ' + path);
// });

// Hexo 3 用户复制这段
hexo.on('new', function(data) {
    exec('start  /max "" "D:\\Program Files\\Sublime Text 3\\sublime_text.exe" ' + data.path);
});

/*=================windows code end======================*/


///*********************************************************
// *                 linux   代码                          *
// *********************************************************/
//
//var exec = require('child_process').exec;
//
//// Hexo 2.x
//hexo.on('new', function(path){
//  exec('vi', [path]);
//});
//
//// Hexo 3
//hexo.on('new', function(data){
//  exec('vi', [data.path]);
//});
//
///*=================linux  code  end======================*/
//
///*********************************************************
// *                 mac     代码                          *
// *********************************************************/
//
//var exec = require('child_process').exec;
//
//// Hexo 2.x 用户复制这段
//hexo.on('new', function(path){
//    exec('open -a "markdown编辑器绝对路径.app" ' + path);
//});
//// Hexo 3 用户复制这段
//hexo.on('new', function(data){
//    exec('open -a "markdown编辑器绝对路径.app" ' + data.path);
//});
///*=================mac    code  end======================*/
