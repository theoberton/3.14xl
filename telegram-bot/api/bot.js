process.env.NTBA_FIX_319 = "test";

const { TELEGRAM_API_KEY } = require("./constants");
// Require our Telegram helper package
const TelegramBot = require("node-telegram-bot-api");

// Export as an asynchronous function
// We'll wait until we've responded to the user
const bot = new TelegramBot(TELEGRAM_API_KEY);

module.exports = bot;
