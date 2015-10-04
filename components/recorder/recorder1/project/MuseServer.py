#!/usr/bin/env python
#
# Took example from: http://developer.choosemuse.com/tag/muse-data

from liblo import *
from write_repository import write as dbWrite

import sys
import time

class MuseServer(ServerThread):
   #listen for messages on port 5000
   def __init__(self):
       print "initiating ServerThread"
       ServerThread.__init__(self, 5000)

   @make_method(None, None)
   def fallback(self, path, args, types, src):
       paths_of_interest = [
        '/muse/elements/alpha_relative',
        '/muse/elements/beta_relative',
        '/muse/elements/blink',
        '/muse/elements/delta_relative',
        '/muse/elements/experimental/concentration',
        '/muse/elements/experimental/mellow',
        '/muse/elements/gamma_relative',
        '/muse/elements/horseshoe',
        '/muse/elements/is_good',
        '/muse/elements/jaw_clench',
        '/muse/elements/theta_relative',
        '/muse/elements/touching_forehead',
        ]
       #print "Any message \
       #\n\t Source: '%s' \
       #\n\t Address: '%s' \
       #\n\t Types: '%s ' \
       #\n\t Timestamp: '%s'" \
       #% (src.url, path, types, timestamp)
       if path in paths_of_interest:
           timestamp = int(round(time.time() * 1000))
           parsedData ={
               'source':path,
               'ts': timestamp,
               'json':'%f' % (sum(args)/float(len(args)))
           }
           print parsedData
           dbWrite(parsedData)

if __name__ == "__main__":
   try:
       server = MuseServer()
   except ServerError, err:
       print str(err)
       sys.exit()

   server.start()
   while 1:
       time.sleep(1)
