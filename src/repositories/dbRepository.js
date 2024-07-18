import { openDB } from 'idb';

export default {
  open() {
    var req = indexedDB.open('weekToDo', 4);
    req.onupgradeneeded = function(event) {
      var db = event.target.result;
      if (!db.objectStoreNames.contains("todo_lists")) {
        db.createObjectStore('todo_lists', { autoIncrement: false });
      }

      if (!db.objectStoreNames.contains("repeating_events")) {
        db.createObjectStore('repeating_events', { autoIncrement: false });
      }

      if (!db.objectStoreNames.contains("repeating_events_by_date")) {
        db.createObjectStore('repeating_events_by_date', { autoIncrement: false });
      }
    }
    req.onerror = function(event) {
      console.log('error opening database ' + event.target.errorCode);
    }
    return req;
  },
  async openAsync() {
    const db = await openDB("weekToDo", 4);
    return db;
  },
  get(db, table, id) {
    let tx = db.transaction([table], 'readonly');
    let store = tx.objectStore(table);
    let req = store.get(id);
    return req;
  },
  add(db, table, id, obj) {
    let tx = db.transaction([table], 'readwrite');
    let store = tx.objectStore(table);
    let req = store.add(obj, id);
    localStorage.setItem("lastUpdated", Date.now());
    return req;
  },
  update(db, table, id, obj) {
    let tx = db.transaction([table], 'readwrite');
    let store = tx.objectStore(table);
    let new_obj = JSON.parse(JSON.stringify(obj));
    let req = store.put(new_obj, id);
    localStorage.setItem("lastUpdated", Date.now());
    return req;
  },
  delete(db, table, id) {
    let tx = db.transaction([table], 'readwrite');
    let store = tx.objectStore(table);
    let req = store.delete(id);
    localStorage.setItem("lastUpdated", Date.now());
    return req;
  },
  selectAll(db, table) {
    let tx = db.transaction([table], 'readwrite');
    let store = tx.objectStore(table);
    let req = store.openCursor();
    return req;
  },
  async selectAllAsync(db, table) {
    let tx = db.transaction([table], 'readwrite');
    let store = tx.objectStore(table);
    let req = await store.openCursor();
    return  req;
  },
  clear(db, table) {
    let tx = db.transaction([table], 'readwrite');
    let store = tx.objectStore(table);
    let req = store.clear();
    localStorage.setItem("lastUpdated", Date.now());
    return req;
  }
};
