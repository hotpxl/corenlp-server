# CoreNLP Server

This is a server wrapper for the [Stanford CoreNLP](http://nlp.stanford.edu/software/corenlp.shtml).

## Dependencies

For client-side Python script, you need to install [Requests](http://docs.python-requests.org/en/latest/).

[Stanford CoreNLP](http://nlp.stanford.edu/software/corenlp.shtml) is also needed. Just run `./get-corenlp.sh`.

If you use [Docker](https://www.docker.com/), nothing else is needed.

If you decide to install it directly, please take a look at `Dockerfile` for how to set up from scratch.

## Docker usage

With the `Dockerfile`, you could spawn a Docker container easily.

Run the following command to build.

```bash
# Build Docker image.
docker build -t corenlp-server .
```

## Usage

```bash
# Run Docker image in a container.
# This will map port 8081 on the host to port 80 inside the container.
docker run -d -p 8081:80 --log-opt max-file=8 --log-opt max-size=8m --name corenlp-server corenlp-server
```

This will open an HTTP server on port 8081. Try the following for a demonstration. The first request may take longer since the server is loading models.

```bash
curl --data 'The quick brown fox jumped over the lazy dog.' 'http://localhost:8081/?properties=%7B%22tokenize.whitespace%22%3A%22true%22%2C%22annotators%22%3A%22tokenize%2Cssplit%2Cpos%22%2C%22outputFormat%22%3A%22json%22%7D'
```

