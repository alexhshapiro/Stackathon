const cherio = require("cherio");
const request = require("request");
const fs = require("fs");

let WriteStream = fs.createWriteStream("ImagesLink.txt", "UTF-8");

let URL = "https://www.wakeandjake.com/portfolio";

request(URL, (err, resp, html) => {
  if (!err) {
    console.log("Request successful");

    const $ = cherio.load(html);
    $("img").each((index, image) => {
      const img = $(image).attr("class");
      const link = URL + img;
      console.log(link);
    });
  } else {
    console.log("Request failed");
  }
});
