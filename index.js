"use strict"

const createContexts = require("./create-contexts")
const { delay } = require("./functions")

const { NUMBER_OF_TIMES_TO_RUN, PROJECT_ID } = process.env

const runFn = async (N = 10) => {
  try {
    for (let i = 0; i < N; i++) {
      console.log(`
      ***
      ${i}/${N}
      ***
      `)
      const createdContexts = await createContexts(PROJECT_ID, `session-id-123`)
      if (createdContexts.length === 2) {
        await delay(1000)
      } else {
        break
        console.error(
          `Contexts created: ${createdContexts.length}, expected: 2`
        )
      }
    }
  } catch (err) {
    console.error(err)
  }
  process.exit(0)
}

if (!PROJECT_ID) {
  console.log(
    "run: GOOGLE_APPLICATION_CREDENTIALS=/path/to/google/keyfile PROJECT_ID=your-project-id node index.js"
  )
  process.exit(0)
} else {
  runFn(NUMBER_OF_TIMES_TO_RUN)
}
