const firebase = require("@firebase/rules-unit-testing");
const fs = require('fs');

const projectId = "test-project-id";
const coverageUrl = `http://localhost:8080/emulator/v1/projects/${projectId}:ruleCoverage.html`;

module.exports = async function () {
  const app = firebase.initializeTestApp({
    projectId: projectId,
    auth: { uid: "test-user" },
  });
  const db = app.firestore();
  await firebase.loadFirestoreRules({
    projectId: projectId,
    rules: fs.readFileSync("firestore.rules", "utf8"),
  });
  await db.doc("users/test-user").set({ username: "test-user" });
  global.firebase = firebase;
  global.db = db;
  global.projectId = projectId;
  global.coverageUrl = coverageUrl;
};
