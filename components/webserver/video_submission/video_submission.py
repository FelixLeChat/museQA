from wsgiref.simple_server import make_server
from tg import expose, TGController, AppConfig
import json
import mysql.connector

"""
Writes to table videos
CREATE TABLE videos (video_url text,ts_start bigint ,ts_stop bigint)
"""
def write(data):
    cnx = mysql.connector.connect(user='root', database='test')
    cursor = cnx.cursor()
    try:
        #Writes to videos
        sql = "INSERT INTO videos (video_url,ts_start,ts_stop) VALUES(%(video_url)s,%(ts_start)s,%(ts_stop)s)"
        cursor.execute(sql,data)
        cnx.commit()
    finally:
        cursor.close()
        cnx.close()



class RootController(TGController):
     @expose()
     def index(self):
         return "<h1>Hello World</h1>"

     @expose('json')
     def create(self,*args,**kwargs):
         data ={ name:value for (name, value) in kwargs.items()}
         payload= json.loads(data['payload'])
         print payload
         write(payload)
         return dict(success=True)
config = AppConfig(minimal=True, root_controller=RootController())

print "Serving on port 8080..."
httpd = make_server('', 8080, config.make_wsgi_app())
httpd.serve_forever()
