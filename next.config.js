const withPWA = require("next-pwa");

module.exports = withPWA({
  trailingSlash: true,
  pwa: {
    dest: "public",
    // cacheOnFrontEndNav: true, // make all page linked form index cached
    disable: process.env.NODE_ENV === "development",
    register: false,
    runtimeCaching,
  },
});