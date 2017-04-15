FROM ubuntu:xenial
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections && \
    echo 'oracle-java8-installer shared/accepted-oracle-license-v1-1 select true' | debconf-set-selections && \
    apt-get update --yes && \
    apt-get install --yes software-properties-common && \
    add-apt-repository --yes ppa:webupd8team/java && \
    apt-get update --yes && \
    apt-get install --yes build-essential oracle-java8-installer python python-dev && \
    apt-get dist-upgrade --yes
COPY ./stanford-corenlp-full-2016-10-31 /corenlp-server
WORKDIR /corenlp-server

EXPOSE 80
CMD java -mx4g -cp "*" edu.stanford.nlp.pipeline.StanfordCoreNLPServer --port 80 --timeout 10000
