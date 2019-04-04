"use strict"

const createContexts = require("./create-contexts")

const projectId = process.env.PROJECT_ID

describe("dialogflow tests", function() {
  it("delete contexts, create contexts, list contexts", async function() {
    if (!projectId) {
      return fail(`Missing projectId`)
    } else {
      const createdContexts = await createContexts(projectId)

      expect(createdContexts.length).toBe(2)
    }
  }, 10000)
})
