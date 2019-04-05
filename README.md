# dialogflow-test-create-multiple-contexts

---

#### Background

I frequently set contexts via the dialogflow v1 api. I noticed that when using the new v2 api that at times not all contexts are being set. I wrote a test that can be run repeatedly to observe this behavior.

UPDATE: As of 2019 it appears the contexts are now being set but now at times when I delete all the contexts then not all the contexts are always deleted.

---

#### To run the test once:

```

GOOGLE_APPLICATION_CREDENTIALS=/path/to/google/keyfile PROJECT_ID=your-project-id npm test -- test.spec.js

```

#### To run the test N times:

```
GOOGLE_APPLICATION_CREDENTIALS=/path/to/google/keyfile PROJECT_ID=your-project-id NUMBER_OF_TIMES_TO_RUN=100 node index.js
```

---

#### Source

- added dialogflow, jasmine to package.json

- copied structjson.js as-is from https://github.com/dialogflow/dialogflow-nodejs-client-v2/blob/master/samples/structjson.js

- copied context functions from https://github.com/dialogflow/dialogflow-nodejs-client-v2/blob/master/samples/resource.js

- modified createContext function to parameterize name and add some randomness in parameters

- wrote "create-context.js" which exports a function that deletes all contexts, lists the contexts (should be 0), creates two contexts, then lists the contexts again (should be 2)

- wrote "test.spec.js" which runs the above createContext function once

- added parameters in `index.js` to run createContext function repeatedly

- eventually I am noticing that not all contexts are deleted.
