# CoreNLP Server

This is a server wrapper for the [Stanford CoreNLP](http://nlp.stanford.edu/software/corenlp.shtml).

## Docker usage

With the `Dockerfile`, you could spawn a Docker container easily.

Run the following commands.

    # Build Docker image.
    docker build -t ${TAG} .
    # Run Docker image in a container.
    # This will map port 80 on the host to port 8080 on the inside.
    docker run -itp 80:8080 ${TAG}

## Installation

If you decide to install manually, just run `npm install` to resolve all dependencies.

## Usage

Run the following command to spawn a [pm2](https://github.com/Unitech/pm2) supervisor of the server process.

    npm start

That's it!

If you are inside a Docker container, exiting the shell would terminate the background process.

Please invoke <kbd>Ctrl</kbd>+<kbd>p</kbd> <kbd>Ctrl</kbd>+<kbd>q</kbd> to detach.
