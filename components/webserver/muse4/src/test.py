#!/usr/local/bin/python
#Instantiate mysql connection
import mysql.connector

def get_readings():
    cnx = mysql.connector.connect(user='root',database='muse4')
    cursor = cnx.cursor()
    try:
        #Read all readings
        sql = ("SELECT source,ts,json FROM muse_readings")
        cursor.execute(sql)
        for (src,ts,json) in cursor:
            #TODO: push to dashboard
            print src,ts,json
    finally:
        cursor.close()
        cnx.close()

get_readings()
