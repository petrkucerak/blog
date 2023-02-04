/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://blog.petrkucerak.cz/",
  generateRobotsTxt: true, // (optional)
  // ...other options
};
