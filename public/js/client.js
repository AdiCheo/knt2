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
  window.location.replace('/game');
  var socket = io.connect();
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
}

function randomName() {
    var names = ["Sung", "Kiley", "Sherryl", "Michel", "Tyrell", "Madie", "Annika", "Katharine", "Jess", "Thi", "Kelvin", "Kristina", "Danae", "Marjory", "Elijah", "Wilber", "Mary", "Yen", "Stan", "Sima", "Wendell", "Porfirio", "Efrain", "Carly", "Kazuko", "King", "Homer", "Enid", "Kum", "Royal", "Mika", "Collette", "Louis", "Raye", "Rhoda", "Sal", "Marquis", "Hershel", "Alisa", "Wade"];
    return names[Math.floor(Math.random() * names.length)];
}