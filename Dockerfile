FROM ubuntu:trusty
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections
RUN echo 'oracle-java8-installer shared/accepted-oracle-license-v1-1 select true' | debconf-set-selections
RUN apt-get install --yes curl software-properties-common
RUN add-apt-repository --yes ppa:webupd8team/java
RUN curl --silent --location https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get update
RUN apt-get install --yes nodejs build-essential oracle-java8-installer python python-dev
COPY corenlp-server /corenlp-server
RUN cd corenlp-server; npm install

EXPOSE 8080
CMD ["/bin/bash"]