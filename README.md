QaMuse
======
Monitor the brain activity of your viewers

Objective
---------
Juxtapose a user's stream of brain wave reading with the video playback.

Setup backend
------
1. Build and run the project with docker  
```docker build -t qamuse . && docker run -ti -p 8080:8080 -p 8081:8081 -p 5000:5000 -p 2222:22 qamuse ```

Setup brainwaves+video capture
-------------------
2. Have a working muse sdk setup and stream the osc to port 5000  
```eg. osc.tcp://45.79.176.71:5000 ```help:```http://developer.choosemuse.com/research-tools/```  
3. Find a friend with windows computer
4. Convince h(er/im) to download these :  
```http://camstudio.org/ ```
``` http://www.commentcamarche.net/download/telecharger-34087988-convert-avi-to-mp4```
5. Run FTPUpload.exe  
```../muse/component/FTPUpload.exe```
6. Open camstudio
7. Press record
8. Go to
```localhost:8080 ```
on your favorite browser

Description
------------
On the client side, there is a muse device, a video screen-recorder and a folder watcher that will send muse (osc) data and video data (mp4) to a backend server. The backend servir is listening for tcp connection from the muse, video files through ssh and an api will be triggered when a new file is ready. The backend is embedded with a webserver to render a listing of available videos. When a video is clicked, the user can play the video and see the evolution of his brainwave throught the playback. Going forward and backward, or frame by frame will allow to see precisely what were the impact of actions on brainwaves.
