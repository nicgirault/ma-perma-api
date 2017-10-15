module.exports = function (shipit) {
  require('shipit-deploy')(shipit)

  shipit.initConfig({
    default: {
      workspace: '/tmp/maperma-api-build',
      deployTo: '/tmp/deploy_to',
      repositoryUrl: 'https://github.com/nicgirault/ma-perma-api.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 2,
      deleteOnRollback: false,
      key: '~/.aws/aws-eu-central-1.pem',
      shallowClone: true
    },
    production: {
      servers: 'ubuntu@api.maperma.org'
    }
  })
}
