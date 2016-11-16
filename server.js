import express from 'express';
import shell from 'shelljs';

const app = express();

const getChanges = (diretory, projectName, gitLink, port) => {
  //Stop service
  const pid = shell.exec('lsof -i :' + port).split(' ')[19];
  if (pid) {
    console.log('found running process');
    shell.exec('kill -9 ' + pid);  
  }
  
  //Clear out project
  shell.cd(diretory);
  shell.exec('sudo rm -rf ' + projectName);

  //Get project
  shell.exec('git clone ' + gitLink);
  shell.cd(projectName);

  //npm
  shell.exec('sudo npm install');
  shell.exec('npm run start');
};

app.get('/', (req, res) => {
   res.sendStatus(200);
});

app.post('/test', (req, res) => {
  getChanges('~/code', 'build-test', 'https://github.com/dystopian-smurfs/build-test.git', 8090);
  res.sendStatus(200);
});

app.listen(3000);
