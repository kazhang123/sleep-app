import React from 'react'

import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase('db.db')

const getAllEntries = async (setFunc) => {
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
            // console.log("entries: " + entries.length);
            // console.log(entries[entries.length - 1]);
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
      (_, success) => { console.log("loaded start and end time")}
    );
}

const insertSleepDuration = (hours, minutes) => {
  db.transaction( tx => {
      tx.executeSql( 'INSERT INTO sleep_duration (hour, minute) VALUES (?,?)', [hours, minutes] );
    },
    (t, error) => { console.log("db error insertSleepDuration"); console.log(error);},
    (t, success) => { console.log("successfully inserted hours: " + hours + " minutes: " + minutes) }
  )
}

const insertEndTime = () => {
  return new Promise((resolve, reject) => {
    db.transaction( tx => {
      tx.executeSql(
        // 'UPDATE sleep_duration SET end_time=CURRENT_TIMESTAMP WHERE id=(SELECT MAX(id));'
        'UPDATE sleep_duration SET end_time=CURRENT_TIMESTAMP WHERE id=(SELECT MAX(id) from sleep_duration);'
      );
    },
    (_, error) => { console.log("db error insertEndTime"); reject(error);},
    (_, success) => { console.log("successfully inserted end time"); resolve(success);}
    )
  })
}

const insertStartTime = () => {
  // return new Promise((resolve, reject) => {
  //   console.log("line 73");
  //   db.transaction( 
  //     tx => {
  //       console.log("line 77");
  //       tx.executeSql( 'INSERT INTO sleep_duration (start_time) VALUES (CURRENT_TIMESTAMP);');
  //     },
  //     (_, error) => { console.log("db error insertStartTime"); reject(error);},
  //     (_, success) => { console.log("successfully insert start time"); resolve(success);}
  //   )
  // })
  return new Promise((resolve, reject) => {
    console.log("line 88");
    db.transaction(
      tx => {
        console.log("line 91");
        tx.executeSql(
          'INSERT INTO sleep_duration (start_time) VALUES (CURRENT_TIMESTAMP);'
        )
      }, 
      (_, error) => {console.log("error insertStartTime"); reject(error);},
      (_, success) => {console.log("successfully inserted start time"); resolve(success);}
    )
  })
}

const dropDatabaseTablesAsync = () => {
  console.log("line 82 ");
  console.log(db == undefined || db == null);

  // return new Promise((resolve, reject) => {
  //   db.transaction(tx => {
  //     console.log(tx == undefined || tx == null);
  //     tx.executeSql('DROP TABLE sleep_duration');
  //   },
  //     (_, error) => { console.log("error dropping sleep_duration table"); reject(error);},
  //     (_, success) => { console.log("successfully dropped sleep_duration table"); resolve(success); }

  //   )
  // })
  db.transaction(tx => {
    console.log(tx == undefined || tx == null);
    tx.executeSql('DROP TABLE sleep_duration');
  },
    (_, error) => { console.log("error dropping sleep_duration table");},
    (_, success) => { console.log("successfully dropped sleep_duration table"); }

  )
}
  
const createTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          // 'CREATE TABLE IF NOT EXISTS test (something INT);'
          // 'CREATE TABLE IF NOT EXISTS sleep_duration (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, start_time TIMESTAMP, end_time TIMESTAMP);'
          // 'CREATE TABLE IF NOT EXISTS sleep_duration (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, hour INT, minute INT);'
          // 'DROP TABLE test;'
          // 'DROP TABLE sleep_duration;'
          // 'CREATE TABLE IF NOT EXISTS sleep_duration (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, start_time TIMESTAMP, end_time TIMESTAMP;'
          // 'CREATE TABLE IF NOT EXISTS test (col TIMESTAMP);'
          // 'DROP TABLE test;'
          'CREATE TABLE IF NOT EXISTS sleep_duration (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, start_time TIMESTAMP, end_time TIMESTAMP);'
        )
      }, 
      (_, error) => {console.log("error"); reject(error);},
      (_, success) => {console.log("success"); resolve(success);}
    )
  })
  
}


const setupDatabaseAsync = () => {
  console.log(db == undefined || db == null);
  
  // return new Promise((resolve, reject) => {
  //   db.transaction(
  //     tx => {
  //       tx.executeSql(
  //         'CREATE TABLE IF NOT EXISTS sleep_duration (id INT NOT NULL AUTO_INCREMENT, start_time TIMESTAMP, end_time TIMESTAMP, PRIMARY KEY (`id`));'
  //       )
  //     },
  //     (_, error) => { console.log("db error creating tables: " + error); reject(error) },
  //     (_, success) => { resolve(success)}
  //   )
  // })
  db.transaction(
    tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS sleep_duration (id INT NOT NULL AUTO_INCREMENT, start_time TIMESTAMP, end_time TIMESTAMP, PRIMARY KEY (`id`));'
      )
    },
    (_, error) => { console.log("db error creating tables: " + error); },
    (_, success) => { console.log("success")}
  )
}

// const setupSleepAsync = async () => {
//   return new Promise((resolve, _reject) => {
//     db.transaction( tx => {
//         tx.executeSql( 'INSERT INTO sleep_duration (hour, minute) values (?,?)', [0, 0] );
//       },
//       (t, error) => { console.log("db error insertSleepDuration"); console.log(error); resolve() },
//       (t, success) => { resolve(success)}
//     )
//   })
// }

export const Database = {
  getAllEntries,
  getLastSleep,
  insertSleepDuration,
  insertStartTime,
  insertEndTime,
  setupDatabaseAsync,
  dropDatabaseTablesAsync,
  createTable,
}