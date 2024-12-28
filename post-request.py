import requests

url = ''
myobj = {'somekey': 'somevalue'}

x = requests.post(url, json = myobj)

print(x.text)