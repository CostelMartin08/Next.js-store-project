module.exports = {
    apps: [
      {
        name: "GadgetGrid",
        script: "npm",
        args: "start --port 5000",
        cwd: "/home/node/GadgetGrid/Next.js-store-project",
        env: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  