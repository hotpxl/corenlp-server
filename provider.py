from __future__ import print_function
from __future__ import absolute_import
import requests
import json

class CoreNLPProvider(object):
    def __init__(self, server_addr):
        self.server_addr = server_addr

    def process(self, text):
        payload = {'text': text}
        r = requests.post(self.server_addr, json=payload)
        result = r.json()
        if 'result' in result:
            return [(i[0], i[1], (int(i[2][0]), int(i[2][1]))) for i in result['result']]
        else:
            raise ValueError('unrecognized format')

if __name__ == '__main__':
    c = CoreNLPProvider('http://localhost:8080/parse')
    print(c.process('Nice day today'))
