import playing from "spotify-playing";
import express from "express";
import path from "path";
import ytsr from "ytsr";
import open from "open";

let alt_dirname = path.resolve();
/* 
  * When packaging with pkg the __dirname variable is
  available since we use CommonJS so we can use that.
  * We have to go up one directory because we package
  everything in the 'dist' folder.
*/
if (typeof __dirname !== "undefined") alt_dirname = __dirname + "\\..\\";

const app = express();
const port = 3000;

let curr_song = {
  artist: undefined,
  song: undefined,
  url: undefined,
};

app.get("/api/", (req, res) => {
  playing(async (err, now) => {
    if (err) {
      /*
        Err possible values: 
          Platform not supported
          Cannot find Spotify process
          Nothing playing on Spotify
       */
      console.error(err);

      if (err.includes("Nothing playing on Spotify") && curr_song.url) {
        return res.send({
          youtubeId: curr_song.url,
          isPlaying: 0,
        });
      } else {
        return res.send({
          youtubeId: "GfKs8oNP9m8",
          isPlaying: 1,
        });
      }
    }

    console.log(curr_song, now);

    if (curr_song.artist != now.artist && curr_song.song != now.song) {
      console.log("Need to fetch from youtube-dl");
      curr_song = now;
      const resp = await ytsr(`${now.artist} - ${now.song}`, { limit: 5 });
      console.log(resp.items[0].id);

      curr_song.url = resp.items[0].id;
      return res.send({
        youtubeId: curr_song.url,
        isPlaying: 1,
      });
    } else {
      console.log("Same song, no need to fetch");
      return res.send({
        youtubeId: curr_song.url,
        isPlaying: 1,
      });
    }
  });
});

app.use(express.static(path.join(alt_dirname, "./public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(alt_dirname, "./templates/index.html"));
});

app.get("/video", (req, res) => {
  res.sendFile(path.join(alt_dirname, "./templates/video.html"));
});

app.listen(port, () => {
  console.log(`Vidify started at http://localhost:${port}`);
  open(`http://localhost:${port}`);
});
