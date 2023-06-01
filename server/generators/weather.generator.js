
  /**
*Generate Weather
*V0.0.25 - Beta
*/
const { selectRandomAudioFile } = require("./utils/randomaudio.utils");
const { downloadImage } = require("../utils/downloadimage.utils"); //unsure about this one
const { WORKDIR } = require("../constants/path.constants");
const { retrieveCurrentConfiguration } = require("../modules/config-loader.module");
const logger = require("../utils/logger.utils");






const { exec } = require("child_process")
const fs = require('fs');
const client = require('https');

const WEATHER = async () => {
console.log("starting weather")


let config_current = await retrieveCurrentConfiguration()

const WORKING = WORKDIR

/**
*Check if weather should be run
*/

if (await config_current.processweather === "yes")

console.log("processing weather")
/**
*Choose random audio file from audio folder
*/

//console.log("choosing random audio")
//const randomaudioweather1 = async () => {
//await selectRandomAudioFile()
//}
//console.log(await selectRandomAudioFile(`${config_current.customaudio}`));



/**
*randomise background (for the future)
*/


/**
*set country (unneeded)
*/

/**
*download images
*/

/**
*image downloading
*/


console.log("Downloading weather images")
console.log(`${config_current.city}`)
console.log(`${WORKDIR}`)

await downloadImage(`https://wttr.in/${config_current.city}.png`, `${WORKDIR}/v1.png`)
    .then(console.log)
    .catch(console.error);

await downloadImage(`https://v2.wttr.in/${await config_current.city}.png`, `${WORKDIR}/v2.png`)
    .then(console.log)
    .catch(console.error);

await downloadImage(`https://v3.wttr.in/${await config_current.state}.png`, `${WORKDIR}/v3.png`)
    .then(console.log)
    .catch(console.error);

/**
*calculate fade times
*/
console.log("calculating fade times")
/**
*set variables
*/
//const weathervideofadeoutduration = await config_current.weathervideofadeoutduration;
//const weatheraudiofadeoutduration = await config_current.weatheraudiofadeoutduration;

/**
*set fade time
*/

const weathervideofadeoutstart = await config_current.videolength - await config_current.weathervideofadeoutduration;
const weatheraudiofadeoutstart = await config_current.videolength - await config_current.weatheraudiofadeoutduration;
console.log(weatheraudiofadeoutstart);
console.log(await config_current.videolength - await config_current.weatheraudiofadeoutduration)

/**
*make the videos
*/

const createWeatherV1 = async () => {
  try {
    const audioFile = await selectRandomAudioFile(config_current.customaudio);
    //add theme information
    //part1
    const commandv1part1 = `ffmpeg -y -f lavfi -i color=black:${config_current.videoresolution} -i ${WORKDIR}/v1.png -stream_loop -1 -i "${config_current.customaudio}/${audioFile}" -shortest -filter_complex "[1]scale=iw*1:-1[wm];[0][wm]overlay=x=(W-w)/2:y=(H-h)/2" -pix_fmt yuv420p -c:a copy -t ${config_current.videolength} ${WORKDIR}/weather-v1.mp4`;
    console.log(commandv1part1);
    logger.info('This is an informational message.');
    logger.warn('This is a warning message.');
    logger.error('This is an error message.');

    exec(commandv1part1, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
    //  if (stderr) {
  //      console.error(`stderr: ${stderr}`);
    //    return;
    //  }
      console.log('Weather v1 part 1 created successfully.');

      //part2
      const commandv1 = `ffmpeg -y -i ${WORKDIR}/weather-v1.mp4 -vf "fade=t=in:st=0:d=${config_current.weathervideofadeinduration},fade=t=out:st=${weathervideofadeoutstart}:d=${config_current.weathervideofadeoutduration}" -af "afade=t=in:st=0:d=${config_current.weatheraudiofadeinduration},afade=t=out:st=${weatheraudiofadeoutstart}:d=${config_current.weatheraudiofadeoutduration}" ${config_current.output}/weather-v1.mp4`;
console.log(commandv1);
      exec(commandv1, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
      //  if (stderr) {
      //    console.error(`stderr: ${stderr}`);
        //  return;
      //  }
        console.log('Weather v1 created successfully.');
      });
    });
  } catch (err) {
    console.error(err);
  }
};

const createWeatherV2 = async () => {
  try {
    const audioFile = await selectRandomAudioFile(config_current.customaudio);
    //add theme information
    //part1
    const commandv2part1 = `ffmpeg -y -f lavfi -i color=black:${config_current.videoresolution} -i ${WORKDIR}/v2.png -stream_loop -1 -i "${config_current.customaudio}/${audioFile}" -shortest -filter_complex "[1]scale=iw*1:-1[wm];[0][wm]overlay=x=(W-w)/2:y=(H-h)/2" -pix_fmt yuv420p -c:a copy -t ${config_current.videolength} ${WORKDIR}/weather-v2.mp4`;
    console.log(commandv2part1);

    exec(commandv2part1, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
    //  if (stderr) {
  //      console.error(`stderr: ${stderr}`);
    //    return;
    //  }
      console.log('Weather v2 part 1 created successfully.');

      //part2
      const commandv2 = `ffmpeg -y -i ${WORKDIR}/weather-v2.mp4 -vf "fade=t=in:st=0:d=${config_current.weathervideofadeinduration},fade=t=out:st=${weathervideofadeoutstart}:d=${config_current.weathervideofadeoutduration}" -af "afade=t=in:st=0:d=${config_current.weatheraudiofadeinduration},afade=t=out:st=${weatheraudiofadeoutstart}:d=${config_current.weatheraudiofadeoutduration}" ${config_current.output}/weather-v2.mp4`;
console.log(commandv2);
      exec(commandv2, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
      //  if (stderr) {
      //    console.error(`stderr: ${stderr}`);
        //  return;
      //  }
        console.log('Weather v2 created successfully.');
      });
    });
  } catch (err) {
    console.error(err);
  }
};


const createWeatherV3 = async () => {
  try {
    const audioFile = await selectRandomAudioFile(config_current.customaudio);
    //add theme information
    //part1
    const commandv3part1 = `ffmpeg -y -f lavfi -i color=black:${config_current.videoresolution} -i ${WORKDIR}/v3.png -stream_loop -1 -i "${config_current.customaudio}/${audioFile}" -shortest -filter_complex "[1]scale=iw*1:-1[wm];[0][wm]overlay=x=(W-w)/2:y=(H-h)/2" -pix_fmt yuv420p -c:a copy -t ${config_current.videolength} ${WORKDIR}/weather-v3.mp4`;
    console.log(commandv3part1);

    exec(commandv3part1, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
    //  if (stderr) {
  //      console.error(`stderr: ${stderr}`);
    //    return;
    //  }
      console.log('Weather v3 part 1 created successfully.');

      //part2
      const commandv3 = `ffmpeg -y -i ${WORKDIR}/weather-v3.mp4 -vf "fade=t=in:st=0:d=${config_current.weathervideofadeinduration},fade=t=out:st=${weathervideofadeoutstart}:d=${config_current.weathervideofadeoutduration}" -af "afade=t=in:st=0:d=${config_current.weatheraudiofadeinduration},afade=t=out:st=${weatheraudiofadeoutstart}:d=${config_current.weatheraudiofadeoutduration}" ${config_current.output}/weather-v3.mp4`;
console.log(commandv3);
      exec(commandv3, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return;
        }
      //  if (stderr) {
      //    console.error(`stderr: ${stderr}`);
        //  return;
      //  }
        console.log('Weather v3 created successfully.');
      });
    });
  } catch (err) {
    console.error(err);
  }
};


console.log("creating videos")
createWeatherV1();
//createWeatherV2();
//createWeatherV3();







/**
*check if v4 should be generated
*/

//console.log("Checking if weatherv4 should be generated")

//if (config_current.generate_weatherv4 === "yes")
//console.log("starting weatherv4")

//console.log("calculating fade times")

const weatherv4videolength = await config_current.videolength * 3
const weathervideofadeoutstartv4 = `${weatherv4videolength}` - await config_current.weathervideofadeoutduration
const weatheraudiofadeoutstartv4 = `${weatherv4videolength}` - await config_current.weatheraudiofadeoutduration

/**
*generate v1 to v4 without fade
*/

//console.log("Generate weather v1-3 without fade")
//exec(`ffmpeg -y -f lavfi -i color=${config_current.backgroundcolour}:${config_current.videoresolution} -i ${config_current.weatherdir}/v1.png -stream_loop -1 -i "${config_current.randomaudioweather1}" -shortest -filter_complex "[1]scale=iw*1:-1[wm];[0][wm]overlay=x=(W-w)/2:y=(H-h)/2" -pix_fmt yuv420p -c:a copy -t ${config_current.weathervideolength} ${WORKDIR}/weatherv4/weather-v1.mp4`)
//exec(`ffmpeg -y -f lavfi -i color=${config_current.backgroundcolour}:${config_current.videoresolution} -i ${config_current.weatherdir}/v2.png -stream_loop -1 -i "${config_current.randomaudioweather2}" -shortest -filter_complex "[1]scale=iw*1:-1[wm];[0][wm]overlay=x=(W-w)/2:y=(H-h)/2" -pix_fmt yuv420p -c:a copy -t ${config_current.weathervideolength} ${WORKDIR}/weatherv4/weather-v2.mp4`)
//exec(`ffmpeg -y -f lavfi -i color=${config_current.backgroundcolour}:${config_current.videoresolution} -i ${config_current.weatherdir}/v3.png -stream_loop -1 -i "${config_current.randomaudioweather3}" -shortest -filter_complex "[1]scale=iw*1:-1[wm];[0][wm]overlay=x=(W-w)/2:y=(H-h)/2" -pix_fmt yuv420p -c:a copy -t ${config_current.weathervideolength} ${WORKDIR}/weatherv4/weather-v3.mp4`)

/**
*check if weather v4 should be shuffled (add later)
*/
//if (config_current.shuffle_v4 === "yes"){
/**
*add files to .txt file in random order if shuffled, on random if not shuffled
*/
//}else{

//}
//console.log("adding all files to a txt file for concat")
/*
*add all files to a text file for concat
*/
// list all files in the directory
//fs.readdir(`${WORKDIR}/weatherv4/`, (err, files) => {
  //if (err) {
    //throw err
  //}

  // files object contains all files names
  // log them on console
  //files.forEach(file => {
    //fs.writeFile(`${WORKDIR}/weatherv4/weatherv4.txt`, file, (err) => {
  //if (err)
    //console.log(err);
  //else {
    //console.log("File written successfully\n");
  //}
//});
//    console.log(file)
  //})
//})


/**
*generate weather v4 video
*/


//console.log("generate weatherv4")

//exec(`ffmpeg -y -f concat -safe 0 -i ${config_current.workdir}/weatherv4/weatherv4.txt -c copy ${WORKDIR}/weather-v4.mp4`)
//exec(`ffmpeg -y -i ${WORKDIR}/weather-v4.mp4 -i "${config_current.randomaudioweather4}" -shortest -vf "fade=t=in:st=0:d=${config_current.weathervideofadeinduration},fade=t=out:st=${config_current.weathervideofadeoutstart}:d=${config_current.weathervideofadeoutduration}" -af "afade=t=in:st=0:d=${config_current.weatheraudiofadeinduration},afade=t=out:st=${config_current.weatheraudiofadeoutstartv4}:d=${config_current.eatheraudiofadeoutduration}" ${config_current.output}/weather-v4.mp4`)
}
module.exports = {
    WEATHER
}
