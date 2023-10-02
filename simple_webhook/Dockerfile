FROM ballerina/ballerina:2201.3.5

USER 10014

COPY . /home/ballerina

WORKDIR /home/ballerina

RUN bal build --sticky

EXPOSE 8080

CMD bal run
