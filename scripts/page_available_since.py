from bs4 import BeautifulSoup
import os, requests
import re

versions = [
    "5.1",
    "5.0",
    "4.3",
    "4.2",
    "4.1",
    "4.0",
    "3.2",
    "3.1",
    "3-lts", ]


def get_site_maps():
    available_since = {}
    for version in versions:
        url = "https://tyk.io/docs/{version}/sitemap.xml".format(version=version)
        print("Getting sitemap for {url}".format(url=url))
        response = requests.get(url, headers={'user-agent': 'insomnia/2023.4.0'})
        if response.status_code != 200:
            raise Exception("unable to fetch the sitemap")
        response.raise_for_status()
        print("finished fetching for {url}".format(url=url))
        urls = get_urls(content=response.text)
        print("parsing urls for version {version}".format(version=version))
        for url in urls:
            if url in available_since:
                available_since[url].append(version)
            else:
                available_since[url] = [version]
        print("finished adding to dict urls for version {version}".format(version=version))
    return available_since


def get_urls(content: str):
    parsed = BeautifulSoup(content, "lxml")
    urls_from_xml = []
    loc_tags = parsed.find_all('loc')
    for loc in loc_tags:
        urls_from_xml.append(replace_base_url(loc.get_text()))
    urls_from_xml.sort()
    return sorted(urls_from_xml)


def replace_base_url(url: str):
    version_pattern = r'https://tyk\.io/docs/[0-9]+(\.[0-9]+)?'
    replace_nightly = 'https://tyk.io/docs/nightly'
    replace_3lts = 'https://tyk.io/docs/3-lts'
    replace_latest = 'https://tyk.io/docs'
    modified_url = re.sub(version_pattern, '', url)
    modified_url = modified_url.replace(replace_nightly, '')
    modified_url = modified_url.replace(replace_3lts, '')
    modified_url = modified_url.replace(replace_latest, '')
    return modified_url


print(get_site_maps())


# print(get_urls("latest_sitemap.xml"))

def read_file(file_name: str):
    f = open(file_name, "r")
    get_urls(content=f.read())


def test_modified():
    urls = [
        'https://tyk.io/docs/nightly/universal-data-graph/udg-getting-started/security/',
        'https://tyk.io/docs/5.2/universal-data-graph/udg-getting-started/security/',
        'https://tyk.io/docs/5.1/apim/',
        'https://tyk.io/docs/3.0/apim/test/is/it/docs/nightly',
        'https://tyk.io/docs/4.2/apim/itachi',
        'https://tyk.io/docs/getting-started/'
    ]
    for url in urls:
        print(replace_base_url(url))
