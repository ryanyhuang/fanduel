var fs = require('fs');

var qbproj = [];
var wrproj = [];
var rbproj = [];

var deleteFile = function(name){
	var link = "./" + name;

	fs.exists(link, function(exists) {
	  if(exists) {
	    console.log('File exists. Deleting now ...');
	    fs.unlink(link);
	  } else {
	    console.log('File not found, so not deleting.');
	  }
	});

}

var getProj = function(pos){
	var file = pos + "proj";
	fs.readFile(file,'utf8', function(err, data){
		var arr = data.split('\n');
		for(var i = 0; i < arr.length/2; i++){
			var newPlayer = [];
			newPlayer.push(arr[i]);
			newPlayer.push(arr[i+(arr.length/2)]);

			if(pos == "qb") qbproj.push(newPlayer);
			if(pos == "wr") wrproj.push(newPlayer);
			if(pos == "rb") rbproj.push(newPlayer);

		}


	});
}

deleteFile('fdwrsheet');
deleteFile('fdrbsheet');
deleteFile('fdqbsheet');
deleteFile('noprojs');


getProj('qb');
getProj('wr');
getProj('rb');


fs.readFile('fandueldata','utf8', function(err, data){
	var arr = data.split('\n');
	for(var i = 0; i < arr.length; i++){
		var player = arr[i].split("\",\"");
		var name = player[2] + " " + player[3];
		var toAdd = name + "|" + player[6] + "|"; 

		var foundProj = 0;
		
		if(player[1] == "WR"){
			for(var j = 0; j < wrproj.length;j++){
				if(name == wrproj[j][1]){
					toAdd += wrproj[j][0];
					foundProj = 1;
				}
			}
			toAdd += '\n';
			if(foundProj){
				fs.appendFile('fdwrsheet', toAdd, function(err){});
			} else {
				fs.appendFile('noprojs', toAdd, function(err){});
			}
			
		}

		if(player[1] == "RB"){
			for(var j = 0; j < rbproj.length;j++){
				if(name == rbproj[j][1]){
					toAdd += rbproj[j][0];
					foundProj = 1;
				}
			}
			toAdd += '\n';
			if(foundProj){
				fs.appendFile('fdrbsheet', toAdd, function(err){});
			} else {
				fs.appendFile('noprojs', toAdd, function(err){});
			}

		}

		if(player[1] == "QB"){
			for(var j = 0; j < qbproj.length;j++){
				if(name == qbproj[j][1]){
					toAdd += qbproj[j][0];
					foundProj = 1;
				}
			}
			toAdd += '\n';	
			if(foundProj){
						
				fs.appendFile('fdqbsheet', toAdd, function(err){});
			} else {
				fs.appendFile('noprojs', toAdd, function(err){});
			}

		}
	}

});

setTimeout(function(){console.log(wrproj)}, 5000);






