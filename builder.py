import os
import base64
import argparse

parser = argparse.ArgumentParser(description="Compile a bat file to a js file")

parser.add_argument("-he", "--hide", help="Hide Console", action="store_true")
parser.add_argument("-r", "--remove", help="Remove bat file", action="store_true")

args = parser.parse_args()

print(args.yes)

_cwd = os.getcwd()

file_path = input("Enter the bat file path: ")

if not os.path.exists(file_path):
    print("File not found")
    exit()

with open(file_path, "rb") as file:
    bat_file = base64.b64encode(file.read()).decode()

with open(f"{_cwd}/src/to_compile/static/template.js", "r") as file:
    template1 = file.read()

with open(
    f"{_cwd}/src/to_compile/template.js", "w", encoding="utf8", errors="ignore"
) as file:
    output = template1.replace("BASE64ENCODEDSTUFFHERE", bat_file)
    if args.yes:
        output = output.replace("const hide = false;", "const hide = true;")
    if args.remove:
        output = output.replace("const remove = false;", "const remove = true;")
    file.write(output)


exit(0)
