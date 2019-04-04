const util = require("util")
const genRand = require("./get-random-number")

const { clearContexts, createContext, listContexts } = require("./functions")

module.exports = async (
  projectId,
  sessionId = `some-session-id-${genRand()}`
) => {
  if (!projectId) {
    throw new Error(`Missing projectId`)
  } else {
    try {
      console.log({ sessionId })

      const deletedContexts = await clearContexts(projectId, sessionId)
      console.log({ deletedContexts })

      const listedContexts = await listContexts(projectId, sessionId)
      console.log({ listedContexts })

      if (listedContexts.length !== 0) {
        throw new Error(
          `Listed contexts length: ${listedContexts.length} is greater than 0`
        )
      } else {
        const createResponse1 = await createContext(
          projectId,
          sessionId,
          `context-${genRand()}`
        )
        console.log({ createResponse1 })

        const createResponse2 = await createContext(
          projectId,
          sessionId,
          `context-${genRand()}`
        )
        console.log({ createResponse2 })

        const listedContextsPostCreatedContexts = await listContexts(
          projectId,
          sessionId
        )

        if (listedContextsPostCreatedContexts.length !== 2) {
          throw new Error(
            `Listed contexts length after creating two contexts: ${
              listedContextsPostCreatedContexts.length
            }, expected 2`
          )
        } else {
          return listedContextsPostCreatedContexts
        }
      }
    } catch (err) {
      console.error(`Caught error:`, err)
    }
  }
}
