var testMap = {};


require("./account")(testMap);
require("./dataTest")(testMap);
require("./wdataTest")(testMap);
module.exports = testMap;