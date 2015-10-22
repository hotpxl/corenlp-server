# CoreNLP Server

This is a server wrapper for the [Stanford CoreNLP](http://nlp.stanford.edu/software/corenlp.shtml).

## Dependencies

For client-side Python script, you need to install [Requests](http://docs.python-requests.org/en/latest/).

[Stanford CoreNLP](http://nlp.stanford.edu/software/corenlp.shtml) is also needed. Install separately and make a symbolic link `java-lib` to it.

If you use [Docker](https://www.docker.com/), nothing else is needed.

If you decide to install it directly, please take a look at `Dockerfile` for how to set up from scratch.

## Docker usage

With the `Dockerfile`, you could spawn a Docker container easily.

Run the following commands.

    # Build Docker image.
    docker build -t ${TAG} .
    # Run Docker image in a container.
    # This will map port 80 on the host to port 8080 on the inside.
    docker run -itp 80:8080 ${TAG}

## Installation

As before, if you chose the Docker way, you do not have to do anything to install.

If you decided to install manually, just run `npm install` to resolve all dependencies.

## Usage

Run the following command (or script `start-server.sh` equivalently) to spawn a [pm2](https://github.com/Unitech/pm2) supervisor of the server process.

    npm start

That's it!

If you are inside a Docker container, exiting the shell would terminate the background process.

Please invoke <kbd>Ctrl</kbd>+<kbd>p</kbd> <kbd>Ctrl</kbd>+<kbd>q</kbd> to detach.
