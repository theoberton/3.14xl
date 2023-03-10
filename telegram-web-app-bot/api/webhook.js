const {
  isCommand,
  getCommandValue,
  getWebAppActionValue,
  isWebAppMessage,
} = require("./uitls");
const { REPLIES_MAP } = require("./replies");
const {allowCors} = require('./helpers');

const bot = require("./bot");
const commandHandlers = require("./handlers/commands");
const webAppHandlers = require("./handlers/webapp");

module.exports = allowCors(async (request, response) => {
  try {
    const { body } = request;
    console.log("body", body);
    // Ensure that this is a message being sent
    if (body.message) {
      const {
        chat: { id },
        text,
      } = body.message;
      console.log("text", text);

      console.log("isCommand(text)", isCommand(text));

      if (isCommand(text)) {
        const command = getCommandValue(text);
        const handler = commandHandlers[`handleCommand${command}`];

        if (!handler) {
          return bot.sendMessage(id, REPLIES_MAP.NOT_FOUND_COMMAND);
        }
        console.log("handler", handler);

        await handler(body.message);
      }
    }

    console.log("isWebAppMessage(body)", isWebAppMessage(body));

    if (isWebAppMessage(body)) {
      const message = body.webAppMessage;
      const action = getWebAppActionValue(message);
      console.log('action', action)

      const handler = webAppHandlers[`handle${action}`];

      if (!handler) {
        console.error(`Handler for action ${action} is not found`);

        return;
      }

      await handler(message);
    }
  } catch (error) {
    // If there was an error sending our message then we
    // can log it into the Vercel console
    console.error("Error sending message");
    console.log(error.toString());
  }

  // Acknowledge the message with Telegram
  // by sending a 200 HTTP status code
  // The message here doesn't matter.
  response.send("OK");
});
