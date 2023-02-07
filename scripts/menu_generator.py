import csv
import sys
import json

tree = []

urlcheck_path = sys.argv[3]

title_map = {}
not_used_map = {}

with open(urlcheck_path, 'r') as file:
    lines = file.readlines()

    for line in lines:
        if line.isspace():
            continue
        obj = json.loads(line)
        title_map[obj["path"].replace("/","")]=obj["title"]

        if "alias" not in obj: 
            not_used_map[obj["path"].replace("/","")]=obj["path"]

categories_path = sys.argv[1]

with open(categories_path, 'r') as file:
    # Create a CSV reader object
    reader = csv.reader(file)

    # Iterate over rows in the CSV file
    counter = 0
    for row in reader:
        if counter < 5:
            counter += 1
            continue        
        data = row[3:]
        if "End of the list" in data[0]:
            break

        parts = data[0].split(" --> ")
        category = data[1]
        current_level = tree
        if category == "NA":
            continue

        for i, name in enumerate(parts):
            found = False
            for node in current_level:
                if node["name"] == name:
                    current_level = node["children"]
                    found = True
                    break

            if not found:
                tabURLs = {
                    "Home": "/",
                    "APIM Best Practices": "/getting-started/key-concepts",
                    "Deployment and Operations": "/apim",
                    "Managing APIs": "/getting-started",
                    "Product Stack": "/tyk-stack",
                    "Developer Support": "/frequently-asked-questions/faq",
                    "Orphan": "/orphan"
                }

                if name.isspace():
                    continue

                new_node = {"name": name, "category": category, "children": []}
                if category == "Tab":
                    new_node["url"] = tabURLs[name]

                current_level.append(new_node)
                current_level = new_node["children"]

pages_path = sys.argv[2]

with open(pages_path, 'r') as file:
    # Create a CSV reader object
    reader = csv.reader(file)
    
    orphans = []

    # Iterate over rows in the CSV file
    counter = 0
    for row in reader:
        if counter < 1:
            counter += 1
            continue
        data = row[3:]

        data[0] = data[0].replace("https://tyk.io/docs", "")

        parts = data[2].split(" --> ")
        current_level = tree
        found = True
        for i, part in enumerate(parts):
            found = False
            for node in current_level:
                if node["name"] == part:
                    current_level = node["children"]
                    found = True
                    break

        if found:
            current_level.append({"url": data[0], "name":"", "category": "Page", "children": []})
        else:
            orphans.append(data)
        
        try:
            del not_used_map[data[0].replace("/","")]
        except:
            pass

    if len(orphans)>0:
        tree.append({"name": "Orphan", "url": "orphan", "category": "Directory", "children": []})
        for orphan in orphans:
            tree[-1]["children"].append({"url": orphan[0], "name": "", "category": "Page", "children": []})

for key, value in not_used_map.items():
    tree[-1]["children"].append({"url": value, "name": "", "category": "Page", "children": []})


import yaml
import sys

def print_tree_as_yaml(tree, level=1):
    yaml_string = ""
    for node in tree:
        title = node["name"]
        if "url" in node and node["category"] != "Tab":
            try:
                title = title_map[node["url"].replace("/","")]
            except:
                title = "Unknown url: " + node["url"]
                print("Unknown menu url:" + node["url"], file=sys.stderr)
            title = title.replace('"', '\\"')

        yaml_string += "  " * level + "- title: \"" + title + "\"\n"
        yaml_string += "  " * level + "  path: " + node["url"] + "\n" if "url" in node else ""
        yaml_string += "  " * level + "  category: " + node["category"] + "\n" 
        if len(node["children"]) > 0:
            yaml_string += "  " * level + "  menu:\n"
            yaml_string += print_tree_as_yaml(node["children"], level + 1)
    return yaml_string

yaml_string = "menu:\n"
yaml_string += print_tree_as_yaml(tree)

print(yaml_string)
