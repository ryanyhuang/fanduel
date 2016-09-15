var fs = require('fs');

function Player(name, proj, salary){
	this.name = name;
	this.proj = proj;
	this.salary = salary;

	this.val = (salary/proj).toFixed(2);
}

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

//1 qb
var QBs = [];
//2 rbs
var RBs = [];
//3 wrs
var WRs = [];

deleteFile('sortedRB');
deleteFile('sortedWR');
deleteFile('sortedQB');


fs.readFile('fdrbsheet','utf8', function(err, data){
	var arr = data.split('\n');
	for(var i = 0; i < arr.length-1; i++){
		var player = arr[i].split("|");
		var newPlayer = new Player(player[0], player[2], player[1]);
		RBs.push(newPlayer);
	}
});


fs.readFile('fdwrsheet','utf8', function(err, data){
	var arr = data.split('\n');
	for(var i = 0; i < arr.length-1; i++){
		var player = arr[i].split("|");
		var newPlayer = new Player(player[0], player[2], player[1]);
		WRs.push(newPlayer);
	}
});

fs.readFile('fdqbsheet','utf8', function(err, data){
	var arr = data.split('\n');
	for(var i = 0; i < arr.length-1; i++){
		var player = arr[i].split("|");
		var newPlayer = new Player(player[0], player[2], player[1]);
		QBs.push(newPlayer);
	}
});

var valueSort = function(a,b){
	return a.val - b.val;
}

setTimeout(function(){
	var sortedQBs = QBs.sort(valueSort);
	var sortedWRs = WRs.sort(valueSort);
	var sortedRBs = RBs.sort(valueSort);

	for(var j = 0; j < 20; j++){
		var RB = sortedRBs[j].name + "|" + sortedRBs[j].salary + "|" + sortedRBs[j].proj + '\n';
		var WR = sortedWRs[j].name + "|" + sortedWRs[j].salary + "|" + sortedWRs[j].proj + '\n';
		var QB = sortedQBs[j].name + "|" + sortedQBs[j].salary + "|" + sortedQBs[j].proj + '\n';
		fs.appendFile('sortedRB', RB, function(err){});
		fs.appendFile('sortedWR', WR, function(err){});
		fs.appendFile('sortedQB', QB, function(err){});

	}

}, 5000);








