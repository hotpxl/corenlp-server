#!/bin/bash
set -euo pipefail
curl --fail --location --remote-header-name --remote-name "http://nlp.stanford.edu/software/stanford-corenlp-full-2015-12-09.zip"
unzip "./stanford-corenlp-full-2015-12-09.zip"
