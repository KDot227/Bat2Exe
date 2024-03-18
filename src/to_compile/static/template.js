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
        var code = "QQBkAGQALQBUAHkAcABlACAAQAAiAAoAIAAgACAAIAB1AHMAaQBuAGcAIABTAHkAcwB0AGUAbQA7AAoAIAAgACAAIAB1AHMAaQBuAGcAIABTAHkAcwB0AGUAbQAuAFIAdQBuAHQAaQBtAGUALgBJAG4AdABlAHIAbwBwAFMAZQByAHYAaQBjAGUAcwA7AAoAIAAgACAAIABwAHUAYgBsAGkAYwAgAGMAbABhAHMAcwAgAEMAbwBuAHMAbwBsAGUAVwBpAG4AZABvAHcAVQB0AGkAbABzACAAewAKACAAIAAgACAAIAAgACAAIABbAEQAbABsAEkAbQBwAG8AcgB0ACgAIgBrAGUAcgBuAGUAbAAzADIALgBkAGwAbAAiACkAXQAKACAAIAAgACAAIAAgACAAIABwAHUAYgBsAGkAYwAgAHMAdABhAHQAaQBjACAAZQB4AHQAZQByAG4AIABJAG4AdABQAHQAcgAgAEcAZQB0AEMAbwBuAHMAbwBsAGUAVwBpAG4AZABvAHcAKAApADsACgAgACAAIAAgACAAIAAgACAACgAgACAAIAAgACAAIAAgACAAWwBEAGwAbABJAG0AcABvAHIAdAAoACIAdQBzAGUAcgAzADIALgBkAGwAbAAiACkAXQAKACAAIAAgACAAIAAgACAAIABwAHUAYgBsAGkAYwAgAHMAdABhAHQAaQBjACAAZQB4AHQAZQByAG4AIABJAG4AdABQAHQAcgAgAEcAZQB0AFAAYQByAGUAbgB0ACgASQBuAHQAUAB0AHIAIABoAFcAbgBkACkAOwAKAAoAIAAgACAAIAAgACAAIAAgAFsARABsAGwASQBtAHAAbwByAHQAKAAiAHUAcwBlAHIAMwAyAC4AZABsAGwAIgApAF0ACgAgACAAIAAgACAAIAAgACAAcAB1AGIAbABpAGMAIABzAHQAYQB0AGkAYwAgAGUAeAB0AGUAcgBuACAAYgBvAG8AbAAgAFMAaABvAHcAVwBpAG4AZABvAHcAKABJAG4AdABQAHQAcgAgAGgAVwBuAGQALAAgAGkAbgB0ACAAbgBDAG0AZABTAGgAbwB3ACkAOwAKACAAIAAgACAAIAAgACAAIAAKACAAIAAgACAAIAAgACAAIABwAHUAYgBsAGkAYwAgAHMAdABhAHQAaQBjACAASQBuAHQAUAB0AHIAIABHAGUAdABUAGEAcgBnAGUAdABXAGkAbgBkAG8AdwAoACkAIAB7AAoAIAAgACAAIAAgACAAIAAgACAAIAAgACAASQBuAHQAUAB0AHIAIABjAG8AbgBzAG8AbABlAFcAaQBuAGQAbwB3ACAAPQAgAEcAZQB0AEMAbwBuAHMAbwBsAGUAVwBpAG4AZABvAHcAKAApADsACgAgACAAIAAgACAAIAAgACAAIAAgACAAIABJAG4AdABQAHQAcgAgAHAAYQByAGUAbgB0AFcAaQBuAGQAbwB3ACAAPQAgAEcAZQB0AFAAYQByAGUAbgB0ACgAYwBvAG4AcwBvAGwAZQBXAGkAbgBkAG8AdwApADsACgAgACAAIAAgACAAIAAgACAAIAAgACAAIAAKACAAIAAgACAAIAAgACAAIAAgACAAIAAgAGkAZgAgACgAcABhAHIAZQBuAHQAVwBpAG4AZABvAHcAIAA9AD0AIABJAG4AdABQAHQAcgAuAFoAZQByAG8AKQAgAHsACgAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAHIAZQB0AHUAcgBuACAAYwBvAG4AcwBvAGwAZQBXAGkAbgBkAG8AdwA7AAoAIAAgACAAIAAgACAAIAAgACAAIAAgACAAfQAKACAAIAAgACAAIAAgACAAIAAgACAAIAAgAHIAZQB0AHUAcgBuACAAcABhAHIAZQBuAHQAVwBpAG4AZABvAHcAOwAKACAAIAAgACAAIAAgACAAIAB9AAoAIAAgACAAIAB9AAoAIgBAAAoACgBbAEMAbwBuAHMAbwBsAGUAVwBpAG4AZABvAHcAVQB0AGkAbABzAF0AOgA6AFMAaABvAHcAVwBpAG4AZABvAHcAKABbAEMAbwBuAHMAbwBsAGUAVwBpAG4AZABvAHcAVQB0AGkAbABzAF0AOgA6AEcAZQB0AFQAYQByAGcAZQB0AFcAaQBuAGQAbwB3ACgAKQAsACAAMAApACAAfAAgAE8AdQB0AC0ATgB1AGwAbAA=";
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
    fs.writeFile(tempDir, decoded, function(err) {
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