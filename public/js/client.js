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

    iosocket.on('updateUsers', function(users) {
      updateUsers(users);
    });

    iosocket.on('allowMarkerPlacement', function(gameData) {
      console.log("Allowed Marker Placemenent");
      highlightHex(boardLayer.get("#-2,-1")[0]);
      highlightHex(boardLayer.get("#2,-3")[0]);
      highlightHex(boardLayer.get("#-2,3")[0]);
      highlightHex(boardLayer.get("#2,1")[0]);
    });

    iosocket.on('map', function(mapData) {
      updateMapData(mapData);
    });

  });
}

function updateUsers(users) {
  userList = users;
  $('#user').empty();
  for (var i = 0; i < users.length; i++) {
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

function updateMapData(mapData) {
  boardLayer.get("#-1,-2")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-2,-1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-3,0")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-3,1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-3,2")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-3,3")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-2,3")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-1,3")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#0,3")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#1,2")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#2,1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#3,0")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#3,-1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#3,-2")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#3,-3")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#2,-3")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#1,-3")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#0,-3")[0].setFillPatternImage(hexTiles[mapData.pop()]);

  boardLayer.get("#-1,-1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-2,0")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-2,1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-2,2")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-1,2")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#0,2")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#1,1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#2,0")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#2,-1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#2,-2")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#1,-2")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#0,-2")[0].setFillPatternImage(hexTiles[mapData.pop()]);

  boardLayer.get("#-1,0")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#-1,1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#0,1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#1,0")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#1,-1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#0,-1")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  boardLayer.get("#0,0")[0].setFillPatternImage(hexTiles[mapData.pop()]);
  // boardLayer.get("#-1,-2")[0].setFillPatternImage(hexTiles[mapData.pop()]);
}
