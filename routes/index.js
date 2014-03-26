/*
 * GET home page.
 */

exports.index = function(req, res) {
    res.render('game.html', {
        title: 'Express'
    });
};