const bot = require("../bot");

async function handleEditionMint(message) {
  const { payload } = message;
  console.log("payload.message", payload.message);
  try {
    await bot.sendMessage(payload.chatId, payload.message);
  } catch (error) {
    console.log("handleEditionMint error ", error);
  }
}

module.exports = {
  handleEditionMint,
};
