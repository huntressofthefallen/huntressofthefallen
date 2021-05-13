//Install NPM

// Execute scripts files
const fs = require('fs')
const exec = require('child_process').exec

const async = require('async') // npm install async 

const scriptsFolder = './scripts/' // add your scripts to folder named scripts

const files = fs.readdirSync(scriptsFolder) // reading files from folders
const funcs = files.map(function (file) {
  return exec.bind(null, `node ${scriptsFolder}${file}`) // execute node command
})

function getResults(err, data) {
  if (err) {
    return console.log(err)
  }
  const results = data.map(function (lines) {
    return lines.join('') // joining each script lines
  })
  console.log(results)
}

// to run your scipts in parallel use
async.parallel(funcs, getResults)

// Discord Bot Status
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')

client.once('ready', () => {
  console.log('Ready!');
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    status: 'dnd',  // You can show online, idle... Do not disturb is dnd
    activity: {
      name: (config.version),  // The message shown
      type: 'PLAYING', // PLAYING, WATCHING, LISTENING, STREAMING,
      url: 'http://sos.kingsgroupgames.com/'
    }
  })
    .then(console.log)
    .catch(console.error);
});

client.login(config.token);