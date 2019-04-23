


module.exports = {
    apps: [{
      name: 'server',
      script: './server/server.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-18-188-249-142.us-east-2.compute.amazonaws.com',
        key: '~/.ssh/fec_carousel.pem',
        ref: 'origin/master',
        repo: 'https://github.com/most-amaziin/photoGallery.git',
        path: '/home/ubuntu/AAnderson_photoGallery',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }