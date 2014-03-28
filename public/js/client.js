/**
 * Socket events
 **/
var EVENT_CONNECT = "connect";
var EVENT_DISCONNECT = "disconnect";

$(function() {
	// register();
  initConnection();
});

/**
* Register player and start gamee
**/
function register() {
    $("#txtNickname").val(randomName());
    $("#btnPlay").click(function() {
        nickname = $("#txtNickname").val().trim();
        if (nickname == "")
            nickname = randomName();
          window.location.replace('/game');
        initConnection();
    });
}

function initConnection() {
  
    iosocket = io.connect();
    iosocket.on('connect', function() {
      
      iosocket.emit('adduser', randomName());
      
      var userList = [];

      iosocket.on('update', function (users){
        userList = users;
        $('#user').empty();
        for(var i=0; i<userList.length; i++) {
            $('#user').append("<h1>" + userList[i] + "</h1>"); 
        }
      });

      iosocket.on('Princess', function (){
        console.log("The fat princess is here!");
      });
    });
}

function randomName() {
    var names = ["Sung", "Kiley", "Sherryl", "Michel", "Tyrell", "Madie", "Annika", "Katharine", "Jess", "Thi", "Kelvin", "Kristina", "Danae", "Marjory", "Elijah", "Wilber", "Mary", "Yen", "Stan", "Sima", "Wendell", "Porfirio", "Efrain", "Carly", "Kazuko", "King", "Homer", "Enid", "Kum", "Royal", "Mika", "Collette", "Louis", "Raye", "Rhoda", "Sal", "Marquis", "Hershel", "Alisa", "Wade"];
    return names[Math.floor(Math.random() * names.length)];
}