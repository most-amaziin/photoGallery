module.exports = {
  apps: [{
    name: 'fecphotogallery',
    script: './server/server.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-3-17-26-34.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/FECPhotoGallery.pem',
      ref: 'origin/master',
      repo: 'https://github.com/threetexansandacanadian/photoGallery.git',
      path: '/home/ubuntu/fecphotogallery',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}