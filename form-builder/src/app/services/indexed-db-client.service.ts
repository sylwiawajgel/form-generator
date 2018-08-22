import { Injectable } from "@angular/core";
import { QuestionItem } from "../models/question-item";

@Injectable({
  providedIn: "root"
})
export class IndexedDBClientService {
  constructor() {}

  manageData(
    operation: string,
    data: QuestionItem[] = [],
    itemsNumber: number = 0
  ) {
    return new Promise<QuestionItem[]>((resolve, reject) => {
      console.log("siemaa");
      let idb = window.indexedDB;
      let open = idb.open("form-builder", 1);

      open.onupgradeneeded = () => {
        console.log("laldsda");
        let db = open.result,
          store = db.createObjectStore("QuestionsStore", {
            autoIncrement: true
          }),
          itemsNumberStore = db.createObjectStore("ItemsNumberStore", {
            autoIncrement: true
          });
        //index = store.createIndex("id", "id");
      };
      open.onerror = e => {
        console.log(e);
      };

      open.onsuccess = () => {
        let db = open.result;
        let tx = db.transaction("QuestionsStore", "readwrite");
        let store = tx.objectStore("QuestionsStore");

        switch (operation) {
          case "get":
            console.log("get");
            let q1 = store.getAll();
            q1.onsuccess = () => {
              console.log(q1.result);
              resolve(q1.result);
            };
            break;
          case "put":
            console.log("put");
            let del = store.clear();
            del.onsuccess = () => {
              data.map(item => {
                store.put(item);
              });
            };
            break;
        }

        tx.oncomplete = () => {
          console.log(store);
          db.close();
        };
      };
    });
  }
}
