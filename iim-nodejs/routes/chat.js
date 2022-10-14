var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/chat', function(req, res, next) {
  res.sendFile('chat.html', { root: 'public' });
});

module.exports = router;
