import { firebase } from '../index';
import * as github from './providers/github.provider';

const providers = { github };

type supportedSignInProviders = 'github';
export const signIn = async (providerName: supportedSignInProviders) =>
  firebase.auth().signInWithPopup(providers[providerName].provider);
