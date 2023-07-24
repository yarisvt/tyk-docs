import json
import yaml
import sys


def load_json_rows(file_path):
    with open(file_path, "r") as file:
        json_list = []
        for line in file:
            line = line.strip()
            if line:  # Check if the line is not empty
                json_data = json.loads(line)
                json_list.append(json_data)
        return json_list

def load_yaml_file(file_path):
    with open(file_path, "r") as file:
        return yaml.safe_load(file)

def get_all_urls_from_json(json_data):
    urls = set()
    for item in json_data:
        urls.add(item["path"])
    return urls

def check_urls_in_yaml(urls, yaml_data):
    missing_urls = []
    if "menu" in yaml_data and yaml_data["menu"] is not None:
        for item in yaml_data["menu"]:
            if "path" in item:
                if item["path"] not in urls:
                    print("missing item: ", item["title"], "path: ", item["path"])
                    missing_urls.append(item["path"])
            if "menu" in item:
                missing_urls.extend(check_urls_in_yaml(urls, item))
    return missing_urls

print("argv", sys.argv)
if len(sys.argv) < 3:
    print("Not enough arguments to run ", sys.argv[0], " (just ", len(sys.argv), ")")
    exit()

urlcheck_file_path = sys.argv[1]
menu_file_path = sys.argv[2]


if __name__ == "__main__":

    # urlcheck_file_path = "../public/urlcheck.json "
    # menu_file_path = "./data/menu.yaml"

    urlcheck_data = load_json_rows(urlcheck_file_path)
    menu_data = load_yaml_file(menu_file_path)

    all_urls = get_all_urls_from_json(urlcheck_data)
    missing_urls = check_urls_in_ygdaml(all_urls, menu_data)

    if len(missing_urls) > 0:
        print("The following URLs are missing in menu.yaml:")
        #for url in missing_urls:
         #   print(url)
    else:
        print("All URLs from urlcheck.json are present in menu.yaml.")
