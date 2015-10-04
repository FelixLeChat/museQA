#!/bin/bash

mysql -uroot -e 'create database test' 
mysql -uroot test < /srv/recorder/db_structure.sql


