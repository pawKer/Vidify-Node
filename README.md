<h1 align="center">🎬<br>
  Vidify Web Node
</h1>
<h3 align="center">Play the Youtube video for your currently playing song on Spotify in a web page</h3>

<div align="center" > 
<img src="./demo/vidify5.gif" />
</div>
<h3 align="center"><a href="https://github.com/pawKer/Vidify-Node/releases/latest" target="_blank">Latest version</a></h3>

## 🚀 Quick start

This is the node version of my other project [Vidify](https://github.com/pawKer/Vidify) which was done in Python.

You can just download the latest executable file for your OS from [here](https://github.com/pawKer/Vidify-Node/releases/latest).

For the Mac version you might need to give the file executable permissions first using `chmod +x <file-name>` in the terminal and also allow it to run in the Security settings.

## 🔧 Running via Node

To run via Node you just need to pull the repo locally and do `npm install` and then `node index.js`.

## ❓ How it works

The app starts a basic Express server which exposes an API endpoint along with two basic webpages. 

When the API endpoint is called it will go and get the currently playing song from your Spotify app running locally using the `spotify-playing` library and then using the artist name and song name it will get the Youtube video id of the first match using the `ytsr` library. The video id is what will be returned from the endpoint.

On the frontend, there is a bit of JavaScript running that continously polls the API and updates the video iframe when the song changes on Spotify.



