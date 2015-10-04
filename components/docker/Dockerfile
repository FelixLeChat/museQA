FROM ubuntu:14.04

MAINTAINER Patrice Fortin <patricefortin.x@gmail.com>

RUN apt-get update
RUN apt-get install -y mysql-server python python-pip supervisor

RUN mkdir -p /var/log/supervisor/srv/webserver/docroot /srv/recorder/docroot
COPY supervisord.conf /etc/supervisor/supervisord.conf

COPY webserver/dashboard.py /srv/webserver/docroot/dashboard.py
COPY webserver/list.jinja /srv/webserver/docroot/list.jinja
COPY webserver/view.jinja /srv/webserver/docroot/view.jinja
COPY sample.mp4 /srv/webserver/docroot/public/video/sample.mp4

COPY recorder/db_structure.sql /srv/recorder/db_structure.sql
COPY recorder/db_bootstrap.sh /srv/recorder/db_bootstrap.sh
COPY recorder/MuseServer.py /srv/recorder/MuseServer.py
COPY recorder/write_repository.py /srv/recorder/write_repository.py

RUN chmod 755 /srv/recorder/db_bootstrap.sh

RUN apt-get install -y python-dev liblo-dev
RUN pip install tg.devtools jinja2 pyliblo
RUN pip install --allow-external mysql-connector-python mysql-connector-python


RUN mkdir -p /srv/webserver/docroot/public/video


EXPOSE 5000 8080 8081
CMD ["/usr/bin/supervisord"]


