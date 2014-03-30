/**
 * Socket events
 **/
 var EVENT_CONNECT = "connect";
 var EVENT_DISCONNECT = "disconnect";

 var iosocket;
 var playerId;

 $(function() {
	// register();
  initConnection();
});

/**
* Register player and start game
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

    var user = randomName();
    iosocket.emit('adduser', user);

    iosocket.on('state.init', function(gameData) {
      playerId = gameData.playerId;
    });

    iosocket.on('updateUsers', function (users) {
      updateUsers(users);
    });
  });
}

function updateUsers(users) {
  userList = users;
  $('#user').empty();
  for(var i=0; i<users.length; i++) {
    $('#user').append("<h1>" + users[i] + "</h1>"); 
  }
}


function indexByKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i][key] == value) {
      return i;
    }
  }
  return null;
}

function indexById(array, value) {
  return indexByKey(array, "id", value);
}

function randomName() {
  var names = ["Sung", "Kiley", "Sherryl", "Michel", "Tyrell", "Madie", "Annika", "Katharine", "Jess", "Thi", "Kelvin", "Kristina", "Danae", "Marjory", "Elijah", "Wilber", "Mary", "Yen", "Stan", "Sima", "Wendell", "Porfirio", "Efrain", "Carly", "Kazuko", "King", "Homer", "Enid", "Kum", "Royal", "Mika", "Collette", "Louis", "Raye", "Rhoda", "Sal", "Marquis", "Hershel", "Alisa", "Wade"];
  return names[Math.floor(Math.random() * names.length)];
}