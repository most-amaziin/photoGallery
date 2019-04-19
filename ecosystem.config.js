


module.exports = {
    apps: [{
      name: 'server',
      script: './server/server.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-18-222-27-96.us-east-2.compute.amazonaws.com',
        key: '~/.ssh/FEC_Navbar.pem',
        ref: 'origin/master',
        repo: 'https://github.com/most-amaziin/photoGallery.git',
        path: '/home/ubuntu/AAnderson_Navbar_Service',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }