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
        // var repos = parseConfig(hexo.config.backup);
        // var len = repos.length,
        //     i = 0;
        // for (; i < len; ++i) {
        //     push(repos[i]);
        // }

        // if (exec('git add --all').code !== 0) {
        //     echo("Error: Git add failed");
        //     exit(1);
        // }
        // if (exec('git commit -am "Form auto backup script\'s commit"').code !== 0) {
        //     echo("Error: Git commit failed");
        //     exit(1);
        // }
        // if (exec('git push origin master').code !== 0) {
        //     echo("Error: Git push failed");
        //     exit(1);
        // }
        echo("=======================Auto Backup Complete======================");
    }
}
