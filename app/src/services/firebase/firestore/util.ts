import firebase from 'firebase/app';
import { store } from './index';

type Ref = firebase.firestore.DocumentReference;

export const refToId = (ref: Ref) => ref.id;
export const refArrayToIdArray = (refs: Ref[]) => refs.map(refToId);

export const idToRef = (path: string, id: string) => store.doc(`${path}${id}`);
export const idArrayToRefArray = (path: string, ids: string[]) =>
  ids.map((id) => idToRef(path, id));

export const timestampToDate = (timestamp: { seconds: number }) =>
  new Date(timestamp.seconds * 1000);

export const dateToTimestamp = (date: Date): { seconds: number } => ({
  seconds: Math.floor(date.getTime() / 1000),
});
