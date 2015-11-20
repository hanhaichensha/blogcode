require('shelljs/global');

try{
	hexo.on('deployAfter',function(){
		run();
	});
}catch(e){
	console.log("备份出现异常，详细信息" + e.toString());
}

function run(){
	if(!which('git')){
		echo('Sorry, this script require git');
	}else{
		echo("=======================Auto Backup Begin=======================");
		var baseDir = hexo.base_dir;
		echo(baseDir);
		cd(baseDir);
		if(exec('git add --all').code !== 0){
			echo("Error: Git add failed");
			exit(1);
		}
		if(exec('git commit -am "Form auto backup script\'s commit"').code !== 0){
			echo("Error: Git commit failed");
			exit(1);
		}
		if(exec('git push origin master').code !== 0){
			echo("Error: Git push failed");
			exit(1);
		}
		echo("=======================Auto Backup Complete======================");
	}
}
