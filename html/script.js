window.onload = function() {
	console.log("poop")
	document.getElementById("memebtn").addEventListener("click", formSubmit);
	document.getElementById("musicbtn").addEventListener("click", musicSubmit);
	document.getElementById("testbtn").addEventListener("click", testSubmit);
}

function formSubmit(event) {
   var url = "https://BitesizedTrickyBases.bandaras213.repl.co/getmeme";
   var request = new XMLHttpRequest();
   request.open('GET', url, true);
   request.onload = function() {
      console.log(request.responseText);
   };

   request.onerror = function() {
      // request failed
   };
	
   request.send();
}

function testSubmit(event) {
   var url = "https://BitesizedTrickyBases.bandaras213.repl.co/test";
   var request = new XMLHttpRequest();
   request.open('GET', url, true);
   request.onload = function() {
      console.log(request.responseText);
   };

   request.onerror = function() {
      // request failed
   };
	
   request.send();
}

function musicSubmit(event) {
   var url = "https://BitesizedTrickyBases.bandaras213.repl.co/music";
   var request = new XMLHttpRequest();
   request.open('GET', url, true);
   request.onload = function() {
      console.log(request.responseText);
   };

   request.onerror = function() {
      // request failed
   };
	
   request.send();
}