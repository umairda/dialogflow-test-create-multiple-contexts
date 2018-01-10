# dialogflow-test-create-multiple-contexts
---
#### Background

I frequently set contexts via the dialogflow v1 api. I noticed that when using the new v2 api that at times not all contexts are being set. I wrote a test that can be run repeatedly to observe this behavior.

---
#### To run the test:

```

GOOGLE_APPLICATION_CREDENTIALS=/path/to/google/keyfile PROJECT_ID=your-project-id npm test -- test.spec.js

```

---
#### Source

 - added dialogflow, jasmine to package.json

 - copied structjson.js as-is from https://github.com/dialogflow/dialogflow-nodejs-client-v2/blob/master/samples/structjson.js

 - copied context functions from https://github.com/dialogflow/dialogflow-nodejs-client-v2/blob/master/samples/resource.js

 - modified createContext function to parameterize name and add some randomness in parameters

 - wrote "test.spec.js" which deletes all contexts, lists the contexts (should be 0), creates two contexts, then lists the contexts again (should be 2)

 - if test is run repeatedly it eventually fails as only one of the two contexts is actually set
