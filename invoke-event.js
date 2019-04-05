const dialogflow = require("dialogflow")
const util = require("util")

const { jsonToStructProto } = require("./structjson")

module.exports = (projectId, sessionId, event, parameters = {}) => {
  const sessionClient = new dialogflow.SessionsClient()
  const request = {
    session: sessionClient.sessionPath(projectId, sessionId),
    queryInput: {
      event: {
        name: event,
        parameters: jsonToStructProto(parameters),
        languageCode: "en-US"
      }
    }
  }
  console.log(util.inspect(request, false, 10))
  return sessionClient.detectIntent(request)
}
