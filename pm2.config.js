module.exports = {
  apps: [
    {
      name: 'bot',
      script: './build/src/server.js',
      exec_mode: 'cluster',
      instances: 1,
      env: {
        DEBUG: 'thai-kuala-lumpur:*'
      },
      env_production: {
        NODE_ENV: 'production',
        DEBUG: 'thai-kuala-lumpur:log*'
      },
      node_args: ['--max-old-space-size=8192']
    }
  ]
};
