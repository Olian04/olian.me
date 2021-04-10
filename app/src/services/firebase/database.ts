import { app } from './initializeService';
import firebase from 'firebase/app';
import 'firebase/database';
import { DocumentFolderEntry } from '../../types/DocumentEntry';

const db = app.database();

const getDocumentNavigatorRoot = () => db.ref('/documentNavigator/');

const documentNavigatorRoot = getDocumentNavigatorRoot();

export const getFolder = async (path: string) => {
  const dig = (
    [H, ...T]: string[],
    root: firebase.database.Reference = documentNavigatorRoot
  ): firebase.database.Reference =>
    H ? dig(T, root.child(`/children/${H}/`)) : root;

  const snap = await dig(path.split('/')).get();

  return snap.val() as DocumentFolderEntry;
};
