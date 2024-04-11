module.exports = {
    apps: [
      {
        name: "GadgetGrid",
        script: "npm",
        args: "start --port 5000",
        env: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  