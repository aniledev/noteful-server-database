module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgres://pougaszzdvcqtm:2abdf6c5610749dc3147f97b9cef30c08b3266fa82bdf8cadab8599b4274f156@ec2-52-72-162-207.compute-1.amazonaws.com:5432/ddiav22bg4ovrn",
};
