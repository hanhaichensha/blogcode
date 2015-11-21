title: Github个人静态博客的搭建总结
date: 2015-11-21 17:31:06
tags:
 - 教程
 - 总结
 - Hexo
categories:
 - Hexo
---

在搭建博客中出现了不少问题，在此分享一下个人的博客搭建过程：


### 第一步：想不花钱就把事情给办了
俗话说：想不花钱，就把事情给办了，你的找一个有钱有势的主。同样的，如果你想要有一个独立的博客，又不想自己掏钱和投入经历去维护，那么你的找一个有优势的主，这当然是首推[全球最大的男性同性交友平台 github](http://www.zhihu.com/question/28976652/answer/42771650)(*^__^*) ，至于怎么注册，怎么设置，直接看官网[帮助文档](https://help.github.com/)。
<!--more-->
### 第二步：hexo —— 简单、快速、强大的Node.js静态博客框架
Hexo的安装和配置请参考**Heaven**的[《使用Hexo搭建GitHub个人博客》](http://heavenru.com/2015/09/02/使用Hexo搭建GitHub个人博客/)，由于Heaven大神一直是在搞前端的，博文里没有提到node.js的安装，这个就是下载，下一步的事，也不详陈了。

---

### 总结遇到的问题

注意：以下操作都是基于windows7！！！

1、在git bash客户端，使用ssh方式进行clone和push时，每次关闭重开git bash客户端总是出现如下错误：

``` bash
$ git clone git@github.com:xiaorisu/github-roam.git
Cloning into 'github-roam'...
Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

之前一直是手动输入如下两句代码来解决此问题：

``` bash
eval $(ssh-agent -s)
ssh-add ~/.ssh/xxxx
```

我是一个懒人，每次都要这样手动输入这两行代码，我会很烦躁，于是有了下面的解决方案：
在当前用户目录底下新建一个.bash_profile文件，不要问我当前用户的目录是哪个目录，一般是打开cmd之后，光标之前的路劲就是当前用户目录。当然，如果你设置过默认打开路径，那就是另一回事了，这时你可以使用如下命令得到：

``` bash
echo %systemdrive%%homepath%
```

创建好了.bash_profile文件后，在文件中输入如下代码：

``` bash
eval $(ps | grep 'ssh-agent' | awk '{print $1}' | xargs kill -9)
eval $(ssh-agent -s)
ssh-add ~/.ssh/XXXXX
```

保存文件，此文件会在每次打开git bash时加载并运行其中的命令。解释一下这三条命令的含义：第一句是杀死之前开的所有ssh-agent，由于每次打开都会执行两编这里面的命令，没有去查是什么原因导致的。并且每次关闭了git bash客户端，都不会关闭它打开的ssh-agent程序；第二句是开启ssh-agent服务；第三句是将专用密钥添加到ssh-agent的高速缓存中。

---

2、执行hexo s 命令后，在浏览器中输入localhost:4000半天没有响应，最后无法访问生成的静态页面。

这个问题的原因在于4000端口被FxServer占用了，但是hexo-server没有报错，真是郁闷！！！解决这问题很简单，可以关掉FxServer服务，也可使用hexo s -p 4040即可解决。解决这个问题并不困难，我要说的是怎么找到问题的原因的。
首先使用netstat命令查看当前电脑的网络连接状况：

``` bash
C:\Users\lenovo>netstat -ano | findstr "4000"
  TCP    0.0.0.0:4000           0.0.0.0:0              LISTENING       21908
  TCP    127.0.0.1:4000         0.0.0.0:0              LISTENING       17620
  TCP    127.0.0.1:4000         127.0.0.1:4737         CLOSE_WAIT      17620
  TCP    127.0.0.1:4000         127.0.0.1:4738         ESTABLISHED     17620
  TCP    127.0.0.1:4000         127.0.0.1:4739         ESTABLISHED     17620
  TCP    127.0.0.1:4000         127.0.0.1:4740         CLOSE_WAIT      17620
  TCP    127.0.0.1:4000         127.0.0.1:4741         CLOSE_WAIT      17620
  TCP    127.0.0.1:4000         127.0.0.1:4742         CLOSE_WAIT      17620
  TCP    127.0.0.1:4000         127.0.0.1:4755         ESTABLISHED     17620
  TCP    127.0.0.1:4737         127.0.0.1:4000         FIN_WAIT_2      556
  TCP    127.0.0.1:4738         127.0.0.1:4000         ESTABLISHED     556
  TCP    127.0.0.1:4739         127.0.0.1:4000         ESTABLISHED     556
  TCP    127.0.0.1:4740         127.0.0.1:4000         FIN_WAIT_2      556
  TCP    127.0.0.1:4741         127.0.0.1:4000         FIN_WAIT_2      556
  TCP    127.0.0.1:4742         127.0.0.1:4000         FIN_WAIT_2      556
  TCP    127.0.0.1:4755         127.0.0.1:4000         ESTABLISHED     556
```

发现4000端口有很多连接，发现有两个进程在监听4000端口，pid分别是21908和17620，从任务管理器中可以看到这两个pid对应的进程分别是node.exe和FxServer服务。这就是查找问题的过程。

---

### 最后说一下改进

最后说一说多仓库部署和源代码自动备份以及自动打开Markdown编辑器。

先上我的_config.yml文件：

```
# Hexo Configuration
## Docs: http://hexo.io/docs/configuration.html
## Source: https://github.com/hexojs/hexo/

# Site
title: 翰海尘沙
subtitle: 进击的程序员
description: 技术分享、阅读笔记
author: 翰海尘沙
language: zh-CN
timezone:

# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: http://yourgithubname.github.io
root: /blog/
permalink: :year/:month/:day/:title/
permalink_defaults:

# Directory
source_dir: source
public_dir: public
tag_dir: tags
archive_dir: archives
category_dir: categories
code_dir: downloads/code
i18n_dir: :lang
skip_render:

# Writing
new_post_name: :title.md # File name of new posts
default_layout: post
titlecase: false # Transform title into titlecase
external_link: true # Open external links in new tab
filename_case: 0
render_drafts: false
post_asset_folder: false
relative_link: false
future: true
highlight:
  enable: true
  line_number: true
  auto_detect: true
  tab_replace:

# Category & Tag
default_category: uncategorized
category_map:
tag_map:


# Date / Time format
## Hexo uses Moment.js to parse and display date
## You can customize the date format as defined in
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY-MM-DD
time_format: HH:mm:ss

# Pagination
## Set per_page to 0 to disable pagination
per_page: 10
pagination_dir: page

# Extensions
## Plugins: http://hexo.io/plugins/
## Themes: http://hexo.io/themes/
theme: landscape
#theme: leo

# Deployment
## Docs: http://hexo.io/docs/deployment.html
deploy:
  type: git
  repository:
    github: git@github.com:your_repository,gh-pages
    gitcafe: git@gitcafe.com:your_repository,gitcafe-pages
# 自动备份
backup:
  type: git
  repo: 
    github: git@github.com:your_repository,master
    gitcafe: git@gitcafe.com:your_repository,master

# 评论
# 1.友言
#uyan:
#  enable: true
# 2.多说
#duoshuo_shortname: shortname
# 3.畅言
changyan:
  enable: true

# RSS订阅
feed:
  type: atom
  path: atom.xml
  limit: 10

# 网站地图
sitemap:
    path: sitemap.xml
```

多仓库部署比较简单，只要在_config.yml配置成如下：

```
deploy:
  type: git
  repository:
    github: git@github.com:your_repository,gh-pages
    gitcafe: git@gitcafe.com:your_repository,gitcafe-pages
```

使用hexo d命令就可以自动部署到github和gitcafe上去。

多仓自动库备份稍微复杂些，先在配置文件中自定自己的自动备份的配置：

```
backup:
  type: git
  repo: 
    github: git@github.com:your_repository,master
    gitcafe: git@gitcafe.com:your_repository,master
```

然后在博客源代码的项目根目录下的scripts目录（如果没有就新建一个scripes文件夹）中新建一个任意名字的javascript文件。我新建的是一个AutoBackUp.js，添加如下代码：

``` JavaScript
require('shelljs/global');

var parseConfig = require('hexo-deployer-git/lib/parse_config');
var util = require('hexo/node_modules/hexo-util');
var Promise = require('hexo/node_modules/bluebird');
var spawn = util.spawn;

try {
    hexo.on('deployAfter', function() {
        run();
    });
} catch (e) {
    console.log("备份出现异常，详细信息" + e.toString());
}

function git() {
    var len = arguments.length;
    var args = new Array(len);

    for (var i = 0; i < len; i++) {
        args[i] = arguments[i];
    }

    return spawn('git', args, {
        cwd: hexo.base_dir,
        verbose: !hexo.config.backup.silent
    });
}

function push(repo) {
    return git('add', '-A').then(function() {
        return git('commit', '-m', "Form auto backup script\'s commit").catch(function() {
            // Do nothing. It's OK if nothing to commit.
        });
    }).then(function() {
        return git('push', '-u', repo.url, 'master:' + repo.branch, '--force');
    });
}

function run() {
    if (!which('git')) {
        echo('Sorry, this script require git');
    } else {
        echo("=======================Auto Backup Begin=======================");
        Promise.each(parseConfig(hexo.config.backup),function(repo){
            return push(repo);
        });
        echo("=======================Auto Backup Complete======================");
    }
}

```

还要安装shelljs模块，这样每次执行hexo d后就会自动备份到githu和gitcafe代码仓库。

自动打开Markdown编辑器，同样在srcipt目录中添加一个OpenEditor.js文件，代码如下：
``` JavaScript
var exec = require('child_process').exec;
var parseConfig = require('./parse_config');
// Hexo 2.x 用户复制这段
// hexo.on('new', function(path){
// exec('start  "D:\\Program Files\\Sublime Text 3\\sublime_text.exe" ' + path);
// });

// Hexo 3 用户复制这段
hexo.on('new', function(data) {
    //exec('start  /max "" "D:\\Program Files\\Sublime Text 3\\sublime_text.exe" ' + data.path);
    exec('start  /max "" "D:\\Program Files\\MarkdownPad 2\\MarkdownPad2.exe" ' + data.path);
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

```

在windows7下是亲测可以打开，至于Mac和Linux没测试过，不敢保证可以用。

---

参考博文：

1. [younglaker的《Hexo系列博客》](http://laker.me/blog/categories/Hexo/)
2. [夏末的《Hexo添加文章时自动打开编辑器》](http://notes.xiamo.tk/2015-06-29-Hexo添加文章时自动打开编辑器.html)
3. [夏末的《自动备份Hexo博客源文件》](http://notes.xiamo.tk/2015-07-06-自动备份Hexo博客源文件.html)
4. [Heaven的《使用Hexo搭建GitHub个人博客》](http://heavenru.com/2015/09/02/使用Hexo搭建GitHub个人博客/)
5. [github高亮语言关键字](https://github.com/github/linguist/blob/master/lib/linguist/languages.yml)