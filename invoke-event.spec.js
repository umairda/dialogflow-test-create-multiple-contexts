const util = require("util")
const { PROJECT_ID } = process.env

const invokeEvent = require("./invoke-event")
const { clearContexts, listContexts } = require("./functions")

describe("InvokeEvent", function() {
  it("should invoke an event then list the contexts", async function() {
    const sessionId = `session-456`

    const clearContextsResponse = await clearContexts(PROJECT_ID, sessionId)

    console.log({ clearContextsResponse })

    const response = await invokeEvent(
      PROJECT_ID,
      sessionId,
      `EVENT_AB_GREET`,
      {
        siteOwner: "Joe Site Owner",
        userName: "Bob User"
      }
    )

    console.log(util.inspect(response, false, 10))

    const listContextsResponse = await listContexts(PROJECT_ID, sessionId)

    console.log(util.inspect(listContextsResponse, false, 10))

    expect(response[0].queryResult.fulfillmentMessages[0].text.text[0]).toEqual(
      response[0].queryResult.fulfillmentText
    )
  }, 10000)
})
