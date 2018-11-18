var express = require('express');
var expressApp = express();

expressApp.use(express.static('client'));

expressApp.listen(80);
