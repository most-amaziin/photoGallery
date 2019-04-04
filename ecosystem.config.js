module.exports = {
  apps: [{
    name: 'fecphotogallery',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'http://ec2-3-19-73-29.us-east-2.compute.amazonaws.com/',
      key: '~/.ssh/FECPhotoGallery.pem',
      ref: 'origin/master',
      repo: 'https://github.com/threetexansandacanadian/photoGallery.git',
      path: '/home/ubuntu/fecphotogallery',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}