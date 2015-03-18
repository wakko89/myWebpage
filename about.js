

document.write("Hello World<br>");
document.write("Hello World<br>");
document.write("Hello World<br>");


var init = function() {
	var before = document.getElementById("text").innerHTML;
	alert(before);
	document.getElementById("text").innerHTML = "Tekst etter";
}

var changeText = function () {
	var textId = prompt("Type in the ID of the text you want to change: \nValid IDs are: 'text', 'someText', 'otherText'");
	var oldText = document.getElementById(textId).innerHTML;
	var newText = prompt("What would you like to change the text to?");
	document.getElementById(textId).innerHTML = newText;
};