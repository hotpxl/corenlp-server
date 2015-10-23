FROM ubuntu:trusty
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections && \
    echo 'oracle-java8-installer shared/accepted-oracle-license-v1-1 select true' | debconf-set-selections && \
    apt-get install --yes curl software-properties-common && \
    add-apt-repository --yes ppa:webupd8team/java && \
    curl --silent --location https://deb.nodesource.com/setup_4.x | bash - && \
    apt-get update && \
    apt-get install --yes nodejs build-essential oracle-java8-installer python python-dev && \
    apt-get dist-upgrade --yes
COPY . /corenlp-server
RUN cd corenlp-server; npm install

EXPOSE 8080
CMD ["/bin/bash"]
