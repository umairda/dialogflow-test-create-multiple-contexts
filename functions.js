"use strict"

const dialogflow = require("dialogflow")
const genRand = require("./get-random-number")
const structjson = require("./structjson")

/***

  Original source: https://github.com/dialogflow/dialogflow-nodejs-client-v2/blob/master/samples/resource.js

***/

function clearContexts(projectId, sessionId) {
  return listContexts(projectId, sessionId).then(contexts => {
    return Promise.all(
      contexts.map(context => {
        return deleteContext(context)
      })
    )
  })
}

function createContext(projectId, sessionId, name = "pizza_order") {
  // [START dialogflow_create_context]

  // Instantiates clients
  const contextsClient = new dialogflow.ContextsClient()

  const sessionPath = contextsClient.sessionPath(projectId, sessionId)

  // Create a pizza_order context with the same parameters as the Pizza intent
  // created by createIntent().
  const pizzaContextPath = contextsClient.contextPath(
    projectId,
    sessionId,
    name
  )
  const pizzaContextRequest = {
    parent: sessionPath,
    context: {
      name: pizzaContextPath,
      lifespanCount: 10,
      parameters: structjson.jsonToStructProto({
        random: genRand(),
        size: "large",
        topping: ["tuna", "cheddar"],
        address: {
          "street-address": "1600 Amphitheatre Pkwy",
          city: "Mountain View",
          "admin-area": "California",
          "zip-code": "94043"
        }
      })
    }
  }

  return contextsClient.createContext(pizzaContextRequest).then(responses => {
    console.log("Created pizza_order context", responses[0])
    //logContext(responses[0]);
    return responses[0]
  })
  // [END dialogflow_create_context]
}

function deleteContext(context) {
  // Instantiates clients
  const contextsClient = new dialogflow.ContextsClient()

  const request = {
    name: context.name
  }

  const contextId = contextsClient.matchContextFromContextName(context.name)

  // Send the request for retrieving the context.
  return contextsClient
    .deleteContext(request)
    .then(response => {
      console.log(`Context ${contextId} deleted`)
      return response
    })
    .catch(err => {
      console.error(`Failed to delete context ${contextId}`, err)
      return null
    })
}

function getContext(context) {
  // Instantiates clients
  const contextsClient = new dialogflow.ContextsClient()

  const request = {
    name: context.name
  }

  const contextId = contextsClient.matchContextFromContextName(context.name)

  // Send the request for retrieving the context.
  return contextsClient
    .getContext(request)
    .then(responses => {
      console.log("Found context:", responses[0])
      //logContext(responses[0])
      return responses[0]
    })
    .catch(err => {
      console.error(`Failed to get context ${contextId}:`, err)
      return null
    })
}

function listContexts(projectId, sessionId) {
  // Instantiates clients
  const contextsClient = new dialogflow.ContextsClient()

  // The path to identify the agent that owns the contexts.
  const sessionPath = contextsClient.sessionPath(projectId, sessionId)

  const request = {
    parent: sessionPath
  }

  // Send the request for listing contexts.
  return contextsClient
    .listContexts(request)
    .then(responses => {
      return responses[0]
    })
    .catch(err => {
      console.error("Failed to list contexts:", err)
      return null
    })
}

function showContexts(projectId, sessionId) {
  return listContexts(projectId, sessionId).then(contexts => {
    return Promise.all(
      contexts.map(context => {
        return getContext(context)
      })
    )
  })
}

function delay(d = 100) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true)
    }, d)
  })
}

module.exports = {
  clearContexts,
  createContext,
  delay,
  listContexts
}
