import React from 'react'

import * as SQLite from "expo-sqlite"
import { openDatabase } from 'expo-sqlite'

const db = SQLite.openDatabase('db.db')

const getAllEntries = async (setFunc) => {
  let db = openDatabase('db.db');
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
        'SELECT start_time, end_time FROM sleep_duration',
        [],
        (_, _array) => {
            let entries = [];
            for (let i = 0; i < _array.rows.length; i++) {
              let item = _array.rows.item(i);
              let entry = {
                startTime: item.start_time,
                endTime: item.end_time,
              };
              entries.push(entry);
            }
            setFunc(entries);
        }
        );
      },
      (_, error) => { console.log("db error get all entries"); console.log(error); reject(error) },
      (_, success) => { console.log("loaded all entries"); resolve(success);}
      );
    })
}

const getLastSleep = (setFunc) => {
  let db = SQLite.openDatabase('db.db');
	db.transaction(
			tx => {
				tx.executeSql(
          'SELECT start_time, end_time FROM sleep_duration WHERE id=(SELECT MAX(id) FROM sleep_duration)',
          [],
          (_, _array) => {
            setFunc(_array.rows.item(0).start_time, _array.rows.item(0).end_time)
          }
				);
			},
      (_, error) => { console.log("db error loading start and end time times"); console.log(error) },
      () => { console.log("loaded start and end time")}
    );
}

const insertEndTime = () => {
  let db = SQLite.openDatabase('db.db');
  return new Promise((resolve, reject) => {
    db.transaction( tx => {
      tx.executeSql(
        'UPDATE sleep_duration SET end_time=CURRENT_TIMESTAMP WHERE id=(SELECT MAX(id) from sleep_duration);'
      );
    },
    (_, error) => { console.log("db error insertEndTime"); reject(error);},
    (_, success) => { console.log("successfully inserted end time"); resolve(success);}
    )
  })
}

const insertStartTime = () => {
  let db = SQLite.openDatabase('db.db');

  return new Promise((resolve, reject) => {
    // db.transaction(
    //   tx => {
    //     console.log("line 69");
    //     tx.executeSql(
    //       'INSERT INTO sleep_duration (start_time) VALUES (CURRENT_TIMESTAMP);',
    //       [],
    //       () => {console.log("executed query")},
    //       () => {console.log("failed to execute query")}
    //     );
    //   }, 
    //   (_, error) => {console.log("error in insertStartTime"); reject(error);},
    //   (_, success) => {console.log("successfully inserted start time"); resolve(success);}
    // )

    db.transaction(
      tx => {
        tx.executeSql(
          `INSERT INTO sleep_duration (start_time) VALUES (CURRENT_TIMESTAMP)`
        );
      },
      (_, error) => {console.log("error in insertStartTime"); reject(error);},
      (_, success) => {console.log("successfully inserted start time"); resolve(success);}
    );
    
  })
  // db.transaction(
  //   tx => {
  //     tx.executeSql('CREATE TABLE IF NOT EXISTS test (col INT);');
  //   }, 
  //   (_, error) => {console.log("WOW")},
  //   (_, success) => {console.log("WOW AGAIN")}
  // );
    //  db.transaction(
    //   tx => {
    //     tx.executeSql(
    //       'INSERT INTO sleep_duration (start_time) VALUES (CURRENT_TIMESTAMP);'
    //     );
    //   }, 
    //   (_, error) => {console.log("error in insertStartTime"); reject(error);},
    //   (_, success) => {console.log("successfully inserted start time"); resolve(success);}
    // )

}

const test = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS test (col INT);');
      }, 
    (_, error) => {console.log("oh no"); reject();},
    (_, success) => {console.log("fantastic"); resolve();}
    )
  })
}
  
const createTable = () => {
  let db = SQLite.openDatabase('db.db');
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS sleep_duration (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, start_time TIMESTAMP, end_time TIMESTAMP);'
        )
      }, 
      (_, error) => {console.log("error creating sleep_duration table"); reject(error);},
      (_, success) => {console.log("successfully created sleep_duration table"); resolve(success);}
    )
  })
  
}

const dropTable = () => {
  let db = SQLite.openDatabase('db.db');
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'DROP TABLE sleep_duration;'
        )
      }, 
      (_, error) => {console.log("error dropping sleep_duration table"); reject(error);},
      (_, success) => {console.log("successfully dropped sleep_duration table"); resolve(success);}
    )
  })
  
}

export const Database = {
  getAllEntries,
  getLastSleep,
  insertStartTime,
  insertEndTime,
  createTable,
  dropTable,
  test,
}