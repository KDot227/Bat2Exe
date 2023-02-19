using System.Diagnostics;
using System.IO;

namespace Bat2Exe
{
    internal class Program
    {
        static void Main(string[] args)
        {
            //batch code here
            var batch_code = @"
@echo off
echo ""Hello World!!!""
pause
exit
";
            var temp_file = Path.GetTempFileName() + ".bat";
            File.WriteAllText(temp_file, batch_code);
            var process = new Process();
            process.StartInfo.FileName = temp_file;
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.RedirectStandardError = true;
            process.Start();
            process.WaitForExit();
            File.Delete(temp_file);
        }
    }
}
