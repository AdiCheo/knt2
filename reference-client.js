/**
 * Parameters
 **/
var DURATION = 200;
var DELAY = 500;
var CELLS = 18;
var AVAILABLE_AVATARS = 1082;
var AVATARS = 14;
var EFFECT_FLIP = "swing";
var EFFECT_MATCH = "explode";

/**
 * Socket events
 **/
var EVENT_CONNECT = "connect";
var EVENT_DISCONNECT = "disconnect";
var EVENT_PLAYERS_UPDATE = "players.update";
var EVENT_STATE_INIT = "state.init";
var EVENT_STATE_UPDATE = "state.update";

/**
 * Tile states
 **/
var TILE_FLIPPED = "flipped";
var TILE_READY = "ready";

/**
 * Variables
 **/
var iosocket;
var selectedTiles = [];
var parameters;
var nickname;
var playerId;
var tutorialTimer;

/**
 * Document load
 **/
$(function() {
  register();
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
    initConnection();
  });
}

function initConnection() {
  iosocket = io.connect();
  iosocket.on(EVENT_CONNECT, function() {
    iosocket.on(EVENT_DISCONNECT, function() {
      $("#incomingChatMessages").append("<li>Disconnected</li>");
    });
    iosocket.on(EVENT_STATE_INIT, function(gameData) {
      playerId = gameData.playerId;
      initGameGrid(gameData);
      updatePlayers(gameData.players);
    });
    iosocket.on(EVENT_STATE_UPDATE, function(updateData) {
      updateGameGrid(updateData.tiles);
      updatePlayers(updateData.players);
    });
    iosocket.on(EVENT_PLAYERS_UPDATE, function(players) {
      updatePlayers(players);
    });
    var player = {
      name: nickname,
    };
    iosocket.emit(EVENT_STATE_INIT, player);
  });
}

function initGameGrid(game) {
  window.location.replace('/game.html');
  // $("#main").empty();
  // selectedTiles = [];
  // parameters = game.parameters;
  // for (var i = 0; i < game.tiles.length; i++) {
  //     if (game.tiles[i].state == TILE_READY) {
  //         var id = game.tiles[i].id;
  //         var html = "<div id='" + id + "' class='grid_item'>";
  //         html += "<img class='grid_item_q' src='u.png'/>";
  //         html += "<img class='grid_item_w' src='" + id + game.parameters.suffixTile + "' style='display: none;'/>";
  //         html += "</div>";
  //         $("#main").append(html);
  //     } else if (game.tiles[i].state == TILE_FLIPPED) {
  //         $("#main").append("<div class='grid_item'><img src='t.png'/></div>");
  //     }
  // }

  // $("#main").append("<div class='grid_clear'></div>");

  // $("#info").empty();
  // $("#info").append("<p>Wave " + game.wave + "</p>");

  // $(".grid_item").click(function() {
  //     itemClick(this);
  // });
}

function itemClick(item) {
  if (!$(item).attr("data-flipped") || $(item).attr("data-flipped") == "false") {

    var last = selectedTiles.length == parameters.matchTiles - 1;
    var id = $(item).attr("id");
    if (selectedTiles.indexOf(id) >= 0)
      return;

    selectedTiles.push(id);

    var selectedTilesCopy = selectedTiles.slice(0);
    if (last) {
      selectedTiles = [];
    }

    $(item).attr("data-flipped", true);
    $(item).fadeToggle(DURATION, EFFECT_FLIP, function() {
      $(this).find(".grid_item_q").toggle();
      $(this).find(".grid_item_w").toggle();
      $(this).fadeToggle(DURATION, EFFECT_FLIP, function() {
        if (last) {
          iosocket.emit(EVENT_STATE_UPDATE, selectedTilesCopy);
        }
      });
    });
  }
}

function updateGameGrid(tiles) {
  for (var i = 0; i < tiles.length; i++) {
    if (tiles[i].state == TILE_FLIPPED) {
      $("#" + tiles[i].id).toggle(EFFECT_MATCH, null, DURATION * 2, function() {
        $(this).replaceWith("<div class='grid_item'><img src='t.png'/></div>");
      });
    } else if (tiles[i].state == TILE_READY) {
      $("#" + tiles[i].id).fadeToggle(DURATION, EFFECT_FLIP, function() {
        $(this).find(".grid_item_q").toggle();
        $(this).find(".grid_item_w").toggle();
        $(this).fadeToggle(DURATION, EFFECT_FLIP, function() {
          $(this).attr("data-flipped", false);
        });
      });
    }
  }
}

function updatePlayers(players) {
  players.sort(function(a, b) {
    return parseFloat(b.score) - parseFloat(a.score)
  });
  for (var i = 0; i < players.length; i++) {
    var p = $("#" + players[i].id);
    if (p.length) {
      p.appendTo("#players");
      p.find(".score").html(players[i].score + " pts");
    } else {
      var name = players[i].id == playerId ? players[i].name + " (you)" : players[i].name;
      var style = players[i].id == playerId ? "avatar avatar_selected" : "avatar";
      $("#players").append('<div id="' + players[i].id + '" class="' + style + '"><div class="avatar_inner"><div class="player">' + name + '</div><div class="score">' + players[i].score + ' pts</div></div></div>');
    }
  }
}

/**
 * Util functions
 **/
function shuffle(o) {
  for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

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