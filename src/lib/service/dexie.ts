import Dexie from 'dexie';

export const db = new Dexie('myDatabase');

db.version(1).stores({
  friends: '++id, name, age'
});
