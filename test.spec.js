'use strict'

const dialogflow = require('dialogflow')

const {
  clearContexts,
  createContext,
  listContexts
} = require('./functions')

const genRand = require('./get-random-number')

const projectId=process.env.PROJECT_ID

describe("dialogflow tests",function() {

  it("delete contexts, create contexts, list contexts",function(done) {

    if (!projectId) {
      return done(fail(`Missing projectId`))
    }

    const sessionId = `some-session-id-${genRand()}`

    clearContexts(projectId,sessionId)
      .then(deletedContexts=>{
        console.log({ deletedContexts })

        listContexts(projectId,sessionId)
          .then(listedContexts=>{
            expect(listedContexts.length).toBe(0)
            console.log({ listedContexts })
            Promise.all([
              createContext(projectId,sessionId,`context-${genRand()}`),
              createContext(projectId,sessionId,`context-${genRand()}`)
            ]).then(createResponses=>{
              console.log({ createResponses })

              listContexts(projectId,sessionId)
                .then(listedContexts2=>{
                  console.log({ listedContexts2 })
                  expect(listedContexts2.length).toBe(2)
                  done()
                }).catch(err=>done(fail(err)))

            }).catch(err=>done(fail(err)))
          }).catch(err=>done(fail(err)))

      }).catch(err=>done(fail(err)))
  })

})
