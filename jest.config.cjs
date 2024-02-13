module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  setupFiles: ["fake-indexeddb/auto"],
};
