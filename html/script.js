window.onload = function () {
   document.getElementById("memebtn").addEventListener("click", function () {
      memeSubmit()
   });
   document.getElementById("musicbtn").addEventListener("click", function () {
      musicSubmit()
   });
}

function memeSubmit() {
   var url = "POSTS/meme";
   var request = new XMLHttpRequest();
   request.open('POST', url, true);
   request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

   request.onerror = function () {
      // request failed
   };
   request.send();
}

function musicSubmit() {
   var url = "POSTS/music";
   var request = new XMLHttpRequest();
   request.open('POST', url, true);
   request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

   request.onerror = function () {
      // request failed
   };
   request.send();
}