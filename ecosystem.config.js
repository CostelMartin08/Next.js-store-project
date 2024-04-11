module.exports = {
  apps: [
    {
      name: "GadgetGrid",
      script: "npm",
      args: "start",
      cwd: "/home/node/GadgetGrid/Next.js-store-project",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
    },
  ],
};
