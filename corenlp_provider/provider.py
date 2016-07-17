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
        params = {
            "tokenize.whitespace": "true",
            "annotators": "tokenize,ssplit,pos",
            "outputFormat": "json"
        }
        r = requests.post(
            self.server_addr,
            params={'properties': json.dumps(params)},
            data=text)
        if r.status_code != 200:
            raise ValueError('Unrecognized format.')
        result = r.json()
        return result
