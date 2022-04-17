window.onload = function() {
	document.getElementById("testReadDB").addEventListener("click", function() { testDBSubmit("testReadDB") });
	document.getElementById("testWriteDB").addEventListener("click", function() { testDBSubmit("testWriteDB") });
	document.getElementById("addNewPlayListId").addEventListener("click", function() { testDBSubmit("addNewPlaylist") });
}

function testDBSubmit(event) {
   var url = "POSTS/test";
   var request = new XMLHttpRequest();
   request.open('POST', url, true);
   request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

   request.onerror = function() {
      // request failed
   };
   if (event == "testReadDB") {
    request.onload = function() {
        alert(`Data size: ${JSON.parse(request.responseText).res}`);
    };
    request.send("type=testReadDB");
   }
   if (event == "testWriteDB") {
    request.onload = function() {
        window.open(JSON.parse(request.responseText).res);
    };
    request.send("type=testWriteDB");
   }
   if (event == "addNewPlaylist") {
    let genre = document.getElementById("playlistType");
    let id = document.getElementById("playlistId");
    request.onload = function() {
    };
    request.send(`type=addNewPlaylist&genre=${genre.value}&id=${id.value}`);
   }
}