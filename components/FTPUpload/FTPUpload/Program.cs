using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using Newtonsoft.Json;
using Renci.SshNet;
using WMPLib;

namespace FTPUpload
{
    public class Program
    {
        private static readonly string _fileExtentionWatch = ".mp4";
        //private static readonly string _fileExtentionWatch = ".avi";
        private static readonly int _maxTry = 10;
        private static DateTime _lastFileTime;

        static void Main(string[] args)
        {
            _lastFileTime = DateTime.Now;


            var loop = true;
            do
            {
                Console.WriteLine("Check Folder");
                checkNewFile();

            } while (loop);
        }


        private static void checkNewFile()
        {
            var newFile = false;
            while (!newFile)
            {
                var files = Directory.GetFiles(Directory.GetCurrentDirectory());

                foreach (var file in files)
                {
                    var extention = Path.GetExtension(file);
                    if (extention == _fileExtentionWatch)
                    {
                        var creationTime = File.GetCreationTime(file);

                        if (creationTime > _lastFileTime)
                        {
                            Console.WriteLine("Found new file");
                            sendFileSFTP(file);
                        }
                    }
                }

                // Check repo each second
                Thread.Sleep(1000);

                newFile = true;
            }
        }

        private static void sendFileFtp(string file)
        {
            // Copy the contents of the file to the request stream.
            StreamReader sourceStream = StreamReader.Null;
            for (int i = 0; i < _maxTry; i++)
            {
                try
                {
                    sourceStream = new StreamReader(file);
                }
                catch (IOException)
                {
                    Thread.Sleep(50);
                }
            }

            // the file is not ready
            if (sourceStream == StreamReader.Null)
                return;

            // Get the object used to communicate with the server.
            FtpWebRequest request = (FtpWebRequest)WebRequest.Create("ftp://www.contoso.com/test.htm");
            request.Method = WebRequestMethods.Ftp.UploadFile;

            // This example assumes the FTP site uses anonymous logon.
            request.Credentials = new NetworkCredential("anonymous", "ano@ano.com");

            byte [] fileContents = Encoding.UTF8.GetBytes(sourceStream.ReadToEnd());
            sourceStream.Close();
            request.ContentLength = fileContents.Length;

            Console.WriteLine("Send File : {0}", Path.GetFileName(file));
            Stream requestStream = request.GetRequestStream();
            requestStream.Write(fileContents, 0, fileContents.Length);
            requestStream.Close();

            FtpWebResponse response = (FtpWebResponse)request.GetResponse();

            Console.WriteLine("Upload File Complete, status {0}", response.StatusDescription);

            response.Close();

            // Update creation time
            _lastFileTime = File.GetCreationTime(file);
        }

        public static void sendFileSFTP(string file)
        {
            const int port = 2222;
            const string host = "45.79.176.71";
            const string username = "video_submitter";
            const string password = "bagelcafebuddha";

            Console.WriteLine("Creating client and connecting");

            using (var client = new SftpClient(host, port, username, password))
            {
                client.Connect();
                Console.WriteLine("Connected to {0}", host);

                StreamReader sourceStream = StreamReader.Null;
                try
                {
                    sourceStream = new StreamReader(file);
                    sourceStream.Close();
                }
                catch (IOException)
                {
                    return;
                }

                using (var fileStream = new FileStream(file, FileMode.Open))
                {
                    Console.WriteLine("Uploading {0} ({1:N0} bytes)",
                                        file, fileStream.Length);
                    client.BufferSize = 4 * 1024; // bypass Payload error large files

                    client.UploadFile(fileStream, "/srv/webserver/docroot/public/video/" + GetCleanFileName(file));
                }
                SendFileUploadConfirmation(file);

            // Update creation time
            _lastFileTime = File.GetCreationTime(file);
            }
        }

        public static int Duration(string file)
        {
            WindowsMediaPlayer wmp = new WindowsMediaPlayerClass();
            IWMPMedia mediainfo = wmp.newMedia(file);
            return (int)mediainfo.duration;
        }

        private async static void SendFileUploadConfirmation(string file)
        {
            using (var client = new HttpClient())
            {
                var data = GetfileData(file);
                var uri = new Uri("http://45.79.176.71:8081/create");
                var response = await client.PostAsync(uri, new StringContent("payload=" + data));

                response.EnsureSuccessStatusCode();
            }
        }

        private struct fileData
        {
            public string video_url { get; set; }
            public string ts_start { get; set; }
            public string ts_stop { get; set; }

        }
        private static string GetfileData(string file)
        {
            var time = Duration(file) * 1000;
            var videoEndTime = DatetimeToTimestamp(File.GetCreationTime(file));

            var data = new fileData()
            {
                video_url = GetCleanFileName(file).Trim(),
                ts_stop = (videoEndTime * 1000).ToString(),
                ts_start = ((videoEndTime * 1000 - (time))).ToString()
            };

            return JsonConvert.SerializeObject(data);
        }

        private static string GetCleanFileName(string file)
        {
            return File.GetCreationTime(file) + ".mp4";
        }

        private static Int32 DatetimeToTimestamp(DateTime time)
        {
            return (Int32)(time.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
        }
    }
}