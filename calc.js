var btns = [7,8,9,"+",4,5,6,"-",1,2,3,"*","C",0, "=","/"];
var displayField = "";
var currentNbr = "", func = "";
var values = [];
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

var findSmallestPositiveNumber = function(array) {
	var min = 9999;
	for(var i = 0; i < array.length; i++) {
		if(array[i] > -1 && array[i] < min) {
			min = array[i];
		}
	}
	return min;
}

var arrayReplace = function(data) {
	if(data.indexOf("*") > -1 || data.indexOf("/") > -1) {
		var tmpArray = [data.indexOf("*"), data.indexOf("/")];
		var i = findSmallestPositiveNumber(tmpArray);

		var a = data[i - 1];
		var f = data[i];
		var b = data[i + 1];

		var tmpValues = [];
		for(var j = 0; j < data.length; j++) {
			if(j == i - 1) {
				tmpValues.push(calculate(a, b, f));
				j += 2;
			} else {
				tmpValues.push(data[j]);
			}
		}
		return tmpValues;
	}
	
	var a = data[0];
	var f = data[1];
	var b = data[2];

	var tmpSum = calculate(a, b, f);
	var tmpValues = [];
	tmpValues[0] = tmpSum;
	for(var i = 3; i < data.length; i++) {
		tmpValues[i - 2] = data[i];
	}
	return tmpValues;
}

var equalsClicked = function(data) {
	//Adds the last number to the array - resets
	data.push(currentNbr);
	currentNbr = "";

	//if not enough elements in the array to do math, return
	if(data.length < 3) {
		return;
	}
	//Whil the array has elements, find calcuation and repeat
	while(data.length > 1) {
		data = arrayReplace(data);
		console.log(data);
	}
	return data;
}

var signClicked = function(data) {
	if(data === "=") {
		var sum = equalsClicked(values);
		updateView("=" + sum[0]);
	} else if (data === "C") {
		resetView();
	} else {
		values.push(currentNbr);
		currentNbr = "";
		values.push(data);
		displayField += data;
		document.getElementById('display').value = displayField;
	}
}

var nbrClicked = function(data) {
	displayField += data;
	currentNbr += data;
	updateView(currentNbr);
}

var resetView = function() {
	displayField = "";
	firstNbr = "";
	secondNbr = "";
	func = "";
	isFirstNbr = true;
	values = [];
	updateView("");
}

var updateView = function(data) {
	var text = "";
	for(var i = 0; i < values.length; i++) {
		text += values[i];
	}
	text += data;
	document.getElementById('display').value = text;
};

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
};

var init = function() {

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
}

