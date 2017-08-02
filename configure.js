var fs = require('fs');
var config = "window.server = { \"server\": \"" + process.env.API_ENDPOINT + "\" }"

fs.writeFile("build/server.js", config, function (err) {
    if (err) {
        throw err
    }
    console.info("Config written: " + config);
}); 