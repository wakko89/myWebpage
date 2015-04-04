var btns = [7,8,9,"+",4,5,6,"-",1,2,3,"*","C",0, "=","/"];
var displayField = "";
var firstNbr = "", secondNbr = "", func = "";
var isFirstNbr = true;
var sum = 0;


var setupButtons = function(field, array) {
	var div = document.getElementById(field);
	for(var i = 0; i < array.length; i++) {
		var btn = document.createElement("button");
		btn.innerHTML = array[i];
		btn.addEventListener("click", function (event) {
			clickedValue = event.target.innerHTML;
			eventHandler(clickedValue);
		});
		div.appendChild(btn);
	}
}

var eventHandler = function(data) {
	if (document.getElementById('display').value.indexOf("=") >= 0) {
		if(isNaN(data)) {
			//reset values
			resetView();
			firstNbr = sum;
			sum = 0;
			isFirstNbr = false;
			displayField = firstNbr;
		} else {
			resetView();
		}
	} 

	if(isNaN(data)) {
		signClicked(data);
	} else {
		nbrClicked(data);
	}
}

var signClicked = function(data) {
	if(data === "=") {
		if (firstNbr !== "" && secondNbr !== "") {
			sum = Number(calculate(firstNbr, secondNbr, func));
			displayField = firstNbr + func + secondNbr + "=" + sum;
			document.getElementById('display').value = displayField;
		}
	} else if (data === "C") {
		resetView();
	} else {
		//Sets function
		if(func !== "") {
			displayField = displayField.replace(func, data);
			func = data;
		} else
		if(func === "") {
			func = data;
			displayField += func;
		}
		isFirstNbr = false;
		document.getElementById('display').value = displayField;
	}
}

var nbrClicked = function(data) {
	displayField += data;
	if(isFirstNbr) {
		//add clicked nbr to firstNbr
		firstNbr += data;
	} else {
		//add clicked nbr to secondNbr
		secondNbr += data;
	}
	document.getElementById('display').value = displayField;
}

var resetView = function() {
	displayField = "";
	document.getElementById('display').value=displayField;
	firstNbr = "";
	secondNbr = "";
	func = "";
	isFirstNbr = true;
}

var calculate = function(firstNbr, secondNbr, func) {
	
	var operators = {
		"+": function(x, y) {return Number(x) + Number(y)}, 
		"-": function(x, y) {return Number(x) - Number(y)}, 
		"*": function(x, y) {return Number(x) * Number(y)}, 
		"/": function(x, y) {return Number(x) / Number(y)}
	};
	return operators[func](firstNbr, secondNbr);
}

var removeLast = function () {
	if (displayField.length == 0) {
		return;
	};
	var lastChar = displayField.charAt(displayField.length - 1);

	//contains equals
  		//finne i til = og fjerne alt etter
	// else 
		//inneholder tegn

	if (displayField.indexOf("=") >= 0) {
		displayField = displayField.slice(0, displayField.indexOf("=")); 
		document.getElementById('display').value=displayField;	
		sum = 0;
		return;
	};
	

	if (func !== "") {
		if (isNaN(lastChar)) {
			func = "";
			isFirstNbr = true;
		} else {
			secondNbr = secondNbr.slice(0, secondNbr.length - 1);		
		};
		displayField = displayField.slice(0, displayField.length - 1); 
		document.getElementById('display').value=displayField;	
	} else {
		if (firstNbr.length > 0) {
			firstNbr = firstNbr.slice(0, firstNbr.length - 1);	
		};
		displayField = displayField.slice(0, displayField.length - 1); 
		document.getElementById('display').value=displayField;	
	};
	//document.getElementById('display').value=displayField;
};

var init = function() {
	//var before = document.getElementById("text").inn456erHTML;
	//alert(before);
	//document.getElementById("text").innerHTML = "Tekst etter";

	setupButtons("buttons", btns);

	var body = document.getElementById("body");

	window.addEventListener("keypress", function(event) {
		event.preventDefault();
		if (event.charCode >= 42 && event.charCode <= 57) {
			var s = String.fromCharCode(event.charCode)
			eventHandler(s);
		} else if (event.charCode == 13) {
			eventHandler("=");
		};

	});
	window.addEventListener("keydown", function (event) {
		if (event.keyCode == 27) {
			eventHandler("C");
		} else if (event.keyCode == 8) {
			event.preventDefault();
			removeLast();
		};
	});

	//TROLLOLOL!
}
