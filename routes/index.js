/*
 * GET home page.
 */

exports.index = function(req, res) {
    res.render('login.html');
};

exports.game = function(req, res) {
    res.render('game.html');
};