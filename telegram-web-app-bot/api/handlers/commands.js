const bot = require("../bot");
const { REPLIES_MAP } = require("../replies");

async function handleCommandStart(message) {
  const {
    chat: { id },
  } = message;

  await bot.sendMessage(id, "Open application", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open",
            web_app: {
              url: "https://dazewrhgek.loclx.io/#/telegram",
            },
          },
        ],
      ],
    },
  });
}

module.exports = {
  handleCommandStart,
};
