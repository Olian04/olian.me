import { firebase } from '../../index';

export const provider = new firebase.auth.GithubAuthProvider();

// Disallows further users sign-ups
provider.setCustomParameters({
  'allow_signup': 'false'
});
