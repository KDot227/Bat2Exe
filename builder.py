import os
import base64

_cwd = os.getcwd()

file_path = input("Enter the bat file path: ")

if not os.path.exists(file_path):
    print("File not found")
    exit()

with open(file_path, "r", encoding="utf-8", errors="ignore") as file:
    bat_file = base64.b64encode(file.read().encode("utf8")).decode("utf-8")

with open(f"{_cwd}/src/to_compile/static/template.js", "r") as file:
    template1 = file.read()

with open(
    f"{_cwd}/src/to_compile/template.js", "w", encoding="utf8", errors="ignore"
) as file:
    file.write(template1.replace("BASE64ENCODEDSTUFFHERE", bat_file))
