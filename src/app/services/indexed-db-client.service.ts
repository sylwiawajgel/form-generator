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
      let idb =
        window.indexedDB;
      let open = idb.open("form-builder", 1);

      open.onupgradeneeded = () => {
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
            let q1 = store.getAll();
            q1.onsuccess = () => {
              resolve(q1.result);
            };
            break;
          case "put":
            let del = store.clear();
            del.onsuccess = () => {
              data.map(item => {
                store.put(item);
              });
            };
            break;
        }

        tx.oncomplete = () => {
          db.close();
        };
      };
    });
  }
}
