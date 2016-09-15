var fs = require('fs');

function Player(name, proj, salary){
	this.name = name;
	this.proj = proj;
	this.salary = salary;

	this.val = (salary/proj).toFixed(2);
}

function Team(rb1, rb2, wr1, wr2, wr3, qb1, cost, proj){
	this.rb1 = rb1;
	this.rb2 = rb2;
	this.wr1 = wr1;
	this.wr2 = wr2;
	this.wr3 = wr3;
	this.qb1 = qb1;
	this.cost = cost;
	this.proj = proj;
}

//1 qb
var QBs = [];
//2 rbs
var RBs = [];
//3 wrs
var WRs = [];

//randomly generate players
var lol = "abcdefghijklmnopqrs";

/*
for( var i = 1; i < 15; i++){
	var offset = Math.random().toFixed(2) - .5;
	var name = "RB" + lol.charAt(i);
	var newPlayer = new Player(name, i-offset, i*1000);
	RBs.push(newPlayer);
}
for( var i = 1; i < 15; i++){
	var offset = Math.random().toFixed(2) - .5;
	var name = "WR" + lol.charAt(i);
	var newPlayer = new Player(name, i-offset, i*1000);
	WRs.push(newPlayer);
}
for( var i = 1; i < 15; i++){
	var offset = Math.random().toFixed(2) - .5;
	var name = "QB" + lol.charAt(i);
	var newPlayer = new Player(name, i-offset, i*1000);
	QBs.push(newPlayer);
}
*/

fs.readFile('sortedRB','utf8', function(err, data){
	var arr = data.split('\n');
	for(var i = 0; i < arr.length-1; i++){
		var player = arr[i].split("|");
		var newPlayer = new Player(player[0], player[2], player[1]);
		RBs.push(newPlayer);
	}
});


fs.readFile('sortedWR','utf8', function(err, data){
	var arr = data.split('\n');
	for(var i = 0; i < arr.length-1; i++){
		var player = arr[i].split("|");
		var newPlayer = new Player(player[0], player[2], player[1]);
		WRs.push(newPlayer);
	}
});

fs.readFile('sortedQB','utf8', function(err, data){
	var arr = data.split('\n');
	for(var i = 0; i < arr.length-1; i++){
		var player = arr[i].split("|");
		var newPlayer = new Player(player[0], player[2], player[1]);
		QBs.push(newPlayer);
	}
});


var calcBestProj = function(array){
	var projSort = function(a,b){
		return a.proj - b.proj;
	}

	var retArr = array.sort(projSort);
	return retArr;
}

var max = 42000;

var curPrice = 0;
var curProj = 0;

var teams = [];

var count = 0;

setTimeout(function(){



for(var rb1 = 0; rb1 < RBs.length-1; rb1++){


	for(var rb2 = rb1+1; rb2 < RBs.length; rb2++){


		for(var wr1 = 0; wr1 < WRs.length-2; wr1++){


			for(var wr2 = wr1+1; wr2 < WRs.length-1; wr2++){


				for(var wr3 = wr2+1; wr3 < WRs.length; wr3++){


					for(var qb1 = 0; qb1 < QBs.length; qb1++){

						curPrice = parseInt(RBs[rb1].salary) + parseInt(RBs[rb2].salary) +
								   parseInt(WRs[wr1].salary) + parseInt(WRs[wr2].salary) + parseInt(WRs[wr3].salary)+
								   parseInt(QBs[qb1].salary);

								   //console.log(curPrice);

						curProj = parseInt(RBs[rb1].proj) + parseInt(RBs[rb2].proj) +
								   parseInt(WRs[wr1].proj) + parseInt(WRs[wr2].proj) + parseInt(WRs[wr3].proj)+
								   parseInt(QBs[qb1].proj);	 

								   //console.log(curProj)

						console.log(rb1 + "|" + rb2 + "|" + wr1 + "|" + wr2 + "|" + wr3 + "|" + qb1);

						if(curPrice > max || curPrice < 40000) continue;

						var newTeam = new Team(rb1, rb2,
											   wr1, wr2, wr3,
											   qb1,
											   curPrice, curProj);

						
						teams.push(newTeam);



					}



				}	



			}



		}



	}


}




}, 5000);

setTimeout(function(){
	var finalrank = calcBestProj(teams);
	var count = 30;
	for( var i = finalrank.length-30; i < finalrank.length; i++){
		var rb1 = RBs[finalrank[i].rb1];
		var rb2 = RBs[finalrank[i].rb2];
		var wr1 = WRs[finalrank[i].wr1];
		var wr2 = WRs[finalrank[i].wr2];
		var wr3 = WRs[finalrank[i].wr3];
		var qb1 = QBs[finalrank[i].qb1];
		console.log("team " + count--);
		console.log('rb1: ' + rb1.name + "|" + rb1.salary + "|" + rb1.proj);
		console.log('rb2: ' + rb2.name + "|" + rb2.salary + "|" + rb2.proj);
		console.log('wr1: ' + wr1.name + "|" + wr1.salary + "|" + wr1.proj);
		console.log('wr2: ' + wr2.name + "|" + wr2.salary + "|" + wr2.proj);
		console.log('wr3: ' + wr3.name + "|" + wr3.salary + "|" + wr3.proj);
		console.log('qb1: ' + qb1.name + "|" + qb1.salary + "|" + qb1.proj);
		console.log("cost: " + finalrank[i].cost);
		console.log("proj: " + finalrank[i].proj +'\n');

		/*
		team += 'wr1: ' + WRs[finalrank[i].wr1] + '\n';
		team += 'wr2: ' + WRs[finalrank[i].wr2] + '\n';
		team += 'wr3: ' + WRs[finalrank[i].wr3] + '\n';
		team += 'qb1: ' + RBs[finalrank[i].qb1] + '\n';*/

	}
	//console.log(finalrank.slice(finalrank.length-10,finalrank.length));
}, 45000);
















