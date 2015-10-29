#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: Yutian Li
from __future__ import print_function
from __future__ import absolute_import
import requests
import json

class CoreNLPProvider(object):
    def __init__(self, server_addr):
        self.server_addr = server_addr

    def pos_tag(self, text):
        payload = {'text': text}
        r = requests.post(self.server_addr, json=payload)
        if r.status_code != 200:
            raise ValueError('unrecognized format')
        result = r.json()
        if 'result' in result:
            return [(i[0], i[1], (i[2][0], i[2][1])) for i in result['result']]
        else:
            raise ValueError('unrecognized format')
