module.exports = {
  apps: [
    {
      name: 'wapisend-api',
      script: '/home/user/webapp/server/api.js',
      interpreter: 'node',
      interpreter_args: '--experimental-vm-modules',
      cwd: '/home/user/webapp',
      env: {
        NODE_ENV: 'production',
        API_PORT: 3001,
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      restart_delay: 3000,
      max_restarts: 10,
    },
    {
      name: 'wapisend-frontend',
      script: 'npx',
      args: 'wrangler pages dev dist --ip 0.0.0.0 --port 3000',
      cwd: '/home/user/webapp',
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      restart_delay: 3000,
    },
  ],
}
