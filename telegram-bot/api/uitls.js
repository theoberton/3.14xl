

function isCommand(message) {

  if(message === '') return false;
  return message.startsWith('/');
}

function getWebAppActionValue(message) {
  return message.action;
}

function getCommandValue(message) {
  const parsedMessage = message.slice(1).toLowerCase();

  return parsedMessage.charAt(0).toUpperCase() + parsedMessage.slice(1);
}

function isWebAppMessage(body) {
  if(!body.webAppMessage) return false;

  return true;
}

module.exports = {
  getWebAppActionValue,
  isCommand,
  getCommandValue,
  isWebAppMessage,
}