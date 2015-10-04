from twisted.internet import reactor, protocol
from write_repository import write as dbWrite

class Write(protocol.Protocol):
    """Writes message to db"""

    def dataReceived(self,data):
        print "data received : " + str(data)
        parsedData ={
            'source':'twistedTestSource',
            'ts':45,
            'json':'%s' % data
        }
        dbWrite(parsedData)


def main():
    """This runs the protocol on port 8000"""
    factory = protocol.ServerFactory()
    factory.protocol = Write
    reactor.listenTCP(8000,factory)
    reactor.run()

# this only runs if the module was *not* imported
if __name__ == '__main__':
    main()
