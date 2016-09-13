var fs = require('fs');

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

deleteFile('fdwrsheet');
deleteFile('fdrbsheet');
deleteFile('fdqbsheet');

fs.readFile('fandueldata','utf8', function(err, data){
	var arr = data.split('\n');
	for(var i = 0; i < arr.length; i++){
		var player = arr[i].split("\",\"");
		var toAdd = player[2] + " " + player[3] + "|" + player[6] + "|\n"; 
		
		if(player[1] == "WR"){
			fs.appendFile('fdwrsheet', toAdd, function(err){});
		}

		if(player[1] == "RB"){
			fs.appendFile('fdrbsheet', toAdd, function(err){});

		}

		if(player[1] == "QB"){
			fs.appendFile('fdqbsheet', toAdd, function(err){});

		}
	}

});