import { app } from '../initializeService';
import 'firebase/firestore';

export * from './folder';
export * from './file';

export const store = app.firestore();
