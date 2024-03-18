const fs = require('fs');
const os = require('os');
const path = require('path');
const spawn = require('child_process').spawn;

const hide = false;

function main() {
    var tempDir = path.join(os.tmpdir(), "KDoTemp.bat");
    var b64stuff = "BASE64ENCODEDSTUFFHERE";
    var decoded = Buffer.from(b64stuff, 'base64').toString('utf-8');
    if (hide) {
        var code = "BASE64ENCODEDSTUFFHERE";
        //base64 utf16-le encoded code to hide the console window
        /*
        THIS IS WHAT THE CODE ABOVE DOES FOR THOSE WHO ARE CURIOUS
            Add-Type @"
                using System;
                using System.Runtime.InteropServices;
                public class ConsoleWindowUtils {
                    [DllImport("kernel32.dll")]
                    public static extern IntPtr GetConsoleWindow();

                    [DllImport("user32.dll")]
                    public static extern IntPtr GetParent(IntPtr hWnd);
                
                    [DllImport("user32.dll")]
                    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

                    public static IntPtr GetTargetWindow() {
                        IntPtr consoleWindow = GetConsoleWindow();
                        IntPtr parentWindow = GetParent(consoleWindow);

                        if (parentWindow == IntPtr.Zero) {
                            return consoleWindow;
                        }
                        return parentWindow;
                    }
                }
            "@
            
            [ConsoleWindowUtils]::ShowWindow([ConsoleWindowUtils]::GetTargetWindow(), 0) | Out-Null
        */
        var hidden = spawn("cmd.exe", ["/C", "call", "powershell", "-E", code], {
            stdio: 'inherit'
        });
    }
    fs.writeFile(tempDir, Buffer.from(decoded, 'utf-8'), function(err) {
        if (err) {
            console.log(err);
            return;
        }

        var cmdArgs = process.argv.slice(2);

        var allArgs = ["/C", "call", tempDir].concat(cmdArgs);

        var out = spawn("cmd.exe", allArgs, {
            stdio: 'inherit'
        });
        out.on('exit', function (code) {
            fs.unlinkSync(tempDir);
        });
    });
}

main();