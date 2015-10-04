#!/usr/local/bin/python
#Instantiate mysql connection
import mysql.connector


def write(data):
    cnx = mysql.connector.connect(user='root', database='test')
    cursor = cnx.cursor()
    try:
        #Write muse_reading
        sql = "INSERT INTO muse_readings (source,ts,json) VALUES(%(source)s,%(ts)s,%(json)s)"
        cursor.execute(sql,data)
        cnx.commit()
    finally:
        cursor.close()
        cnx.close()

"""
#Write USAGE
data_to_write = {
    'source':'testSource3',
    'ts':44,
    'json':'testJson3'
}
write(data_to_write)
"""
