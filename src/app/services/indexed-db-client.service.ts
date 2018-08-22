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
      const idb = window.indexedDB;
      const open = idb.open("form-builder", 1);

      open.onupgradeneeded = () => {
        const db = open.result,
          store = db.createObjectStore("QuestionsStore", {
            autoIncrement: true
          }),
          itemsNumberStore = db.createObjectStore("ItemsNumberStore", {
            autoIncrement: true
          });
      };
      open.onerror = e => {
        console.log(e);
      };

      open.onsuccess = () => {
        const db = open.result;
        const tx = db.transaction("QuestionsStore", "readwrite");
        const store = tx.objectStore("QuestionsStore");

        switch (operation) {
          case "get":
            const q1 = store.getAll();
            q1.onsuccess = () => {
              resolve(q1.result);
            };
            break;
          case "put":
            const del = store.clear();
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
