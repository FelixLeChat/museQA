from wsgiref.simple_server import make_server
from tg import expose, TGController, AppConfig, redirect
from os import listdir
from os.path import isfile, join

class RootController(TGController):
    @expose()
    def index(self):
        redirect('list/')

    @expose('list.jinja')
    def list(self):
        onlyfiles = [ f for f in listdir("public/video") if isfile(join("public/video",f)) ]
        return dict(message="this is the list", files=onlyfiles)

    @expose('view.jinja')
    def view(self, vId=None):
        if vId is None:
            return dict(message="The video ID is invalid")
        return dict(message=vId, vid_url="/video/"+vId, data_obj = [{"serie":0, "time":0, "gamma":1, "delta":3, "theta":1, "beta":2, "alpha":1}] )

# return dict(message=vId, vid_url="/video/"+vId, data_obj = [{"serie":0, "time":0, "gamma":1, "delta":3, "theta":1, "beta":2, "alpha":1}] )

config = AppConfig(minimal=True, root_controller=RootController())
config.renderers = ['jinja']
config.serve_static = True
config.paths['static_files'] = 'public'
application = config.make_wsgi_app()

print ("Serving on port 8080...")
httpd = make_server('', 8080, config.make_wsgi_app())
httpd.serve_forever()
