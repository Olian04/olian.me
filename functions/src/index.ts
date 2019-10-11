import * as functions from 'firebase-functions';
import { auth as adminAuth } from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const blockSignup = functions.auth.user().onCreate(event =>
  adminAuth().updateUser(event.uid, { disabled: true })
    .then(userRecord => console.log( "Auto blocked user", userRecord.toJSON() ))
    .catch(error => console.log( "Error auto blocking:", error )),
);
