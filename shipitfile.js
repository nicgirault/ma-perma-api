module.exports = function (shipit) {
  require('shipit-deploy')(shipit)
  require('shipit-shared')(shipit)
  require('shipit-npm')(shipit)
  require('shipit-pm2')(shipit)

  shipit.initConfig({
    default: {
      workspace: '/tmp/ma-perma-api-build',
      deployTo: '/var/www/ma-perma-api',
      repositoryUrl: 'https://github.com/nicgirault/ma-perma-api.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      deleteOnRollback: false,
      shallowClone: true,
      shared: {
        overwrite: true,
        dirs: ['node_modules']
      },
      pm2: {
        json: '/etc/pm2/conf.d/ma-perma-api.json'
      }
    },
    production: {
      servers: 'ubuntu@api.maperma.org'
    }
  })
}
