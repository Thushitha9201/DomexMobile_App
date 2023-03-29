import SQLite from 'react-native-sqlite-storage';
import { tableData } from './TableData';

const db = SQLite.openDatabase({
  name: 'DOMEX.db',
  location: 'default',
});

export const createTables = () => {

  db.transaction(
    (tx:any) => {
      tableData.forEach(table => {
        const queryString = createTableMakeQueryString(table);
        tx.executeSql(
          queryString,
          [],
          (tx:any, response:any) => {
            console.log(`create table success ${table.name}: `, response);
          },
          (tx:any, error:any) => {
            console.log(`create table error ${table.name}: `, error);
          },
        );
      });
    },
    (error:any) => {
      console.log('table create query transaction failed: ', error);
    },
    (success:any) => {
      console.log('table create query transaction:', 'success');
    },
  );
};

const createTableMakeQueryString = (tableQuery:any) => {
  try {
    let query = `CREATE TABLE IF NOT EXISTS ${tableQuery.name} (`;
    let count = 0;
    tableQuery.columns.forEach(column => {
      query += `${column.name} ${column.dataType} 
      ${column.isPrimaryKey
          ? 'PRIMARY KEY'
          : column.autoIncrement
            ? 'AUTOINCREMENT'
            : ''
        }
      ${column.shouldNotAllowNull ? 'NOT NULL' : ''}
      ${count < tableQuery.columns.length - 1 ? ',' : ''}`;
      count++;
    });
    query += '); ';
    return query;
  } catch (error) {
    console.log('query string creation failed: ', error);
  }

  return null;
};

// Index Key
export const tableIndexKey = () => {

  try {

    //  ------------------------------------  PICKUP_COLLECTION IDX -------------------------------------------------

    db.transaction(
      (tx:any) => {
        const query_idx_ticketSpareParts = `CREATE UNIQUE INDEX IF NOT EXISTS idx_PICKUP_COLLECTION ON  PICKUP_COLLECTION(id) `;

        tx.executeSql(
          query_idx_ticketSpareParts,
          [],
          (tx:any, response:any) => {
            console.log(`create table index success idx_PICKUP_COLLECTION: `, response);
          },
          (tx:any, error:any) => {
            console.log(`create table index key error idx_PICKUP_COLLECTION: `, error);
          },
        );
      },
      (error:any) => {
        console.log('table create query transaction failed: ', error);
      },
      (success:any) => {
        console.log('table create query transaction:', 'success');
      },
    );

   //  ------------------------------------  PACKAGE IDX -------------------------------------------------

   db.transaction(
    (tx:any) => {
      const query_idx_ticketSpareParts = `CREATE UNIQUE INDEX IF NOT EXISTS idx_PACKAGE ON  PACKAGE(id) `;

      tx.executeSql(
        query_idx_ticketSpareParts,
        [],
        (tx:any, response:any) => {
          console.log(`create table index success idx_PACKAGE: `, response);
        },
        (tx:any, error:any) => {
          console.log(`create table index key error idx_PACKAGE: `, error);
        },
      );
    },
    (error:any) => {
      console.log('table create query transaction failed: ', error);
    },
    (success:any) => {
      console.log('table create query transaction:', 'success');
    },
  );

   //  ------------------------------------  SENDER -------------------------------------------------

   db.transaction(
    (tx:any) => {
      const query_idx_ticketSpareParts = `CREATE UNIQUE INDEX IF NOT EXISTS idx_SENDER ON  SENDER(id) `;

      tx.executeSql(
        query_idx_ticketSpareParts,
        [],
        (tx:any, response:any) => {
          console.log(`create table index success idx_SENDER: `, response);
        },
        (tx:any, error:any) => {
          console.log(`create table index key error idx_SENDER: `, error);
        },
      );
    },
    (error:any) => {
      console.log('table create query transaction failed: ', error);
    },
    (success:any) => {
      console.log('table create query transaction:', 'success');
    },
  );
//  //  ------------------------------------  COLLECTION_POINT -------------------------------------------------

  db.transaction(
    (tx:any) => {
      const query_idx_ticketSpareParts = `CREATE UNIQUE INDEX IF NOT EXISTS idx_COLLECTION_POINT ON  COLLECTION_POINT(id) `;

      tx.executeSql(
        query_idx_ticketSpareParts,
        [],
        (tx:any, response:any) => {
          console.log(`create table index success idx_COLLECTION_POINT: `, response);
        },
        (tx:any, error:any) => {
          console.log(`create table index key error idx_COLLECTION_POINT: `, error);
        },
      );
    },
    (error:any) => {
      console.log('table create query transaction failed: ', error);
    },
    (success:any) => {
      console.log('table create query transaction:', 'success');
    },
  );
//  ------------------------------------  ISSUES -------------------------------------------------

db.transaction(
  (tx:any) => {
    const query_idx_ticketSpareParts = `CREATE UNIQUE INDEX IF NOT EXISTS idx_ISSUES ON  ISSUES(id) `;

    tx.executeSql(
      query_idx_ticketSpareParts,
      [],
      (tx:any, response:any) => {
        console.log(`create table index success idx_ISSUES: `, response);
      },
      (tx:any, error:any) => {
        console.log(`create table index key error idx_ISSUES: `, error);
      },
    );
  },
  (error:any) => {
    console.log('table create query transaction failed: ', error);
  },
  (success:any) => {
    console.log('table create query transaction:', 'success');
  },
);


// //  ------------------------------------  ISSUE_TYPE -------------------------------------------------

db.transaction(
  (tx:any) => {
    const query_idx_ticketSpareParts = `CREATE UNIQUE INDEX IF NOT EXISTS idx_ISSUE_TYPE ON  ISSUE_TYPE(id) `;

    tx.executeSql(
      query_idx_ticketSpareParts,
      [],
      (tx:any, response:any) => {
        console.log(`create table index success idx_ISSUE_TYPE: `, response);
      },
      (tx:any, error:any) => {
        console.log(`create table index key error idx_ISSUE_TYPE: `, error);
      },
    );
  },
  (error:any) => {
    console.log('table create query transaction failed: ', error);
  },
  (success:any) => {
    console.log('table create query transaction:', 'success');
  },
);


// //  ------------------------------------ PACKAGE_BARCODE -------------------------------------------------

db.transaction(
  (tx:any) => {
    const query_idx_ticketSpareParts = `CREATE UNIQUE INDEX IF NOT EXISTS idx_PACKAGE_BARCODE ON  PACKAGE_BARCODE(id) `;

    tx.executeSql(
      query_idx_ticketSpareParts,
      [],
      (tx:any, response:any) => {
        console.log(`create table index success idx_PACKAGE_BARCODE: `, response);
      },
      (tx:any, error:any) => {
        console.log(`create table index key error idx_PACKAGE_BARCODE: `, error);
      },
    );
  },
  (error:any) => {
    console.log('table create query transaction failed: ', error);
  },
  (success:any) => {
    console.log('table create query transaction:', 'success');
  },
);

// //  ------------------------------------ SERVICE_CHARGES -------------------------------------------------

db.transaction(
  (tx:any) => {
    const query_idx_ticketSpareParts = `CREATE UNIQUE INDEX IF NOT EXISTS idx_SERVICE_CHARGES ON  SERVICE_CHARGES(id) `;

    tx.executeSql(
      query_idx_ticketSpareParts,
      [],
      (tx:any, response:any) => {
        console.log(`create table index success idx_SERVICE_CHARGES: `, response);
      },
      (tx:any, error:any) => {
        console.log(`create table index key error idx_SERVICE_CHARGES: `, error);
      },
    );
  },
  (error:any) => {
    console.log('table create query transaction failed: ', error);
  },
  (success:any) => {
    console.log('table create query transaction:', 'success');
  },
);
// //  ------------------------------------ SERVICE_CHARGE_TYPE -------------------------------------------------

db.transaction(
  (tx:any) => {
    const query_idx_ticketSpareParts = `CREATE UNIQUE INDEX IF NOT EXISTS idx_SERVICE_CHARGE_TYPE ON  SERVICE_CHARGE_TYPE(id) `;

    tx.executeSql(
      query_idx_ticketSpareParts,
      [],
      (tx:any, response:any) => {
        console.log(`create table index success idx_SERVICE_CHARGE_TYPE: `, response);
      },
      (tx:any, error:any) => {
        console.log(`create table index key error idx_SERVICE_CHARGE_TYPE: `, error);
      },
    );
  },
  (error:any) => {
    console.log('table create query transaction failed: ', error);
  },
  (success:any) => {
    console.log('table create query transaction:', 'success');
  },
);

// //  ------------------------------------ CASH_COLLECTION -------------------------------------------------

db.transaction(
  (tx:any) => {
    const query_idx_ticketSpareParts = `CREATE UNIQUE INDEX IF NOT EXISTS idx_CASH_COLLECTION ON  CASH_COLLECTION(id) `;

    tx.executeSql(
      query_idx_ticketSpareParts,
      [],
      (tx:any, response:any) => {
        console.log(`create table index success idx_CASH_COLLECTION: `, response);
      },
      (tx:any, error:any) => {
        console.log(`create table index key error idx_CASH_COLLECTION: `, error);
      },
    );
  },
  (error:any) => {
    console.log('table create query transaction failed: ', error);
  },
  (success:any) => {
    console.log('table create query transaction:', 'success');
  },
);


// //  ------------------------------------ RECEIVER -------------------------------------------------

db.transaction(
  (tx:any) => {
    const query_idx_ticketSpareParts = `CREATE UNIQUE INDEX IF NOT EXISTS idx_RECEIVER ON  RECEIVER(id) `;

    tx.executeSql(
      query_idx_ticketSpareParts,
      [],
      (tx:any, response:any) => {
        console.log(`create table index success idx_RECEIVER: `, response);
      },
      (tx:any, error:any) => {
        console.log(`create table index key error idx_RECEIVER: `, error);
      },
    );
  },
  (error:any) => {
    console.log('table create query transaction failed: ', error);
  },
  (success:any) => {
    console.log('table create query transaction:', 'success');
  },
);


// //  ------------------------------------ USER -------------------------------------------------

db.transaction(
  (tx:any) => {
    const query_idx_ticketSpareParts = `CREATE UNIQUE INDEX IF NOT EXISTS idx_USER ON  USER(id) `;

    tx.executeSql(
      query_idx_ticketSpareParts,
      [],
      (tx:any, response:any) => {
        console.log(`create table index success idx_USER: `, response);
      },
      (tx:any, error:any) => {
        console.log(`create table index key error idx_USER: `, error);
      },
    );
  },
  (error:any) => {
    console.log('table create query transaction failed: ', error);
  },
  (success:any) => {
    console.log('table create query transaction:', 'success');
  },
);

//  ------------------------------------ METER READING -------------------------------------------------

db.transaction(
  (tx:any) => {
    const query_idx_ticketSpareParts = `CREATE UNIQUE INDEX IF NOT EXISTS idx_METER_READING ON  METER_READING(_ID) `;

    tx.executeSql(
      query_idx_ticketSpareParts,
      [],
      (tx:any, response:any) => {
        console.log(`create table index success idx_METER_READING: `, response);
      },
      (tx:any, error:any) => {
        console.log(`create table index key error idx_METER_READING: `, error);
      },
    );
  },
  (error:any) => {
    console.log('table create query transaction failed: ', error);
  },
  (success:any) => {
    console.log('table create query transaction:', 'success');
  },
);



// //  ------------------------------------ GPS_LOG -------------------------------------------------

db.transaction(
  (tx:any) => {
    const query_idx_ticketSpareParts = `CREATE UNIQUE INDEX IF NOT EXISTS idx_GPS_LOG ON  GPS_LOG(id) `;

    tx.executeSql(
      query_idx_ticketSpareParts,
      [],
      (tx:any, response:any) => {
        console.log(`create table index success idx_GPS_LOG: `, response);
      },
      (tx:any, error:any) => {
        console.log(`create table index key error idx_GPS_LOG: `, error);
      },
    );
  },
  (error:any) => {
    console.log('table create query transaction failed: ', error);
  },
  (success:any) => {
    console.log('table create query transaction:', 'success');
  },
);

// //  ------------------------------------ AREA TYPE IDX -------------------------------------------------

db.transaction(
  (tx:any) => {
    const query_idx_ticketSpareParts = `CREATE UNIQUE INDEX IF NOT EXISTS idx_AREA_Type ON  AREA_Type(id) `;

    tx.executeSql(
      query_idx_ticketSpareParts,
      [],
      (tx:any, response:any) => {
        console.log(`create table index success idx_AREA_Type: `, response);
      },
      (tx:any, error:any) => {
        console.log(`create table index key error idx_AREA_Type: `, error);
      },
    );
  },
  (error:any) => {
    console.log('table create query transaction failed: ', error);
  },
  (success:any) => {
    console.log('table create query transaction:', 'success');
  },
);

// //  ------------------------------------ PACAKGE_Type IDX -------------------------------------------------

db.transaction(
  (tx:any) => {
    const query_idx_ticketSpareParts = `CREATE UNIQUE INDEX IF NOT EXISTS idx_PACAKGE_Type ON  PACAKGE_Type(id) `;

    tx.executeSql(
      query_idx_ticketSpareParts,
      [],
      (tx:any, response:any) => {
        console.log(`create table index success idx_PACAKGE_Type: `, response);
      },
      (tx:any, error:any) => {
        console.log(`create table index key error idx_PACAKGE_Type: `, error);
      },
    );
  },
  (error:any) => {
    console.log('table create query transaction failed: ', error);
  },
  (success:any) => {
    console.log('table create query transaction:', 'success');
  },
);


// //  ------------------------------------ PICKUP_ISSUE_REASON -------------------------------------------------

// db.transaction(
//   (tx:any) => {
//     const query_idx_ticketSpareParts = `CREATE UNIQUE INDEX IF NOT EXISTS idx_PICKUP_ISSUE_REASON ON  PICKUP_ISSUE_REASON(id) `;

//     tx.executeSql(
//       query_idx_ticketSpareParts,
//       [],
//       (tx:any, response:any) => {
//         console.log(`create table index success idx_PICKUP_ISSUE_REASON: `, response);
//       },
//       (tx:any, error:any) => {
//         console.log(`create table index key error idx_PICKUP_ISSUE_REASON: `, error);
//       },
//     );
//   },
//   (error:any) => {
//     console.log('table create query transaction failed: ', error);
//   },
//   (success:any) => {
//     console.log('table create query transaction:', 'success');
//   },
// );

  return null;

} catch (error) {
  console.log('remove Item_serialNO duplicate failed:SERVICE ', error);

}

}

//INSERT QUERY
export const insertData = (data:any, callBack:any) => {
  try {
    db.transaction(
      (tx:any) => {
        data.forEach(table => {
          let queryString = `INSERT INTO ${table.table} (${table.columns}) VALUES (${table.values})`;

          tx.executeSql(
            queryString,
            table.params,
            (tx:any, response:any) => {
              // console.log(`insert data success ${table.table}: `, response);
            },
            (tx:any, error:any) => {
              console.log(`insert data error ${table.table}: `, error);
            },
          );
        });
      },
      (error:any) => {
        console.log('insert data query transaction failed: ', error);
        callBack(null, error); //notify caller
      },
      (success:any) => {
        console.log('insert data query transaction success: ', success);
        callBack(success ?? 'success', null); //notify caller
      },
    );
  } catch (error) {
    console.log('insert data error: ', data);
    callBack(null, error); //notify caller
  }
};

//UPDATE QUERY
// export const updateData = (data, callBack) => {
//   try {
//     db.transaction(
//       tx => {
//         data.forEach(table => {
//           let queryString = `UPDATE ${table.table} SET ${table.query}`;

//           tx.executeSql(
//             queryString,
//             table.params,
//             (tx, response) => {
//               console.log(`update data success ${table.name}: `, response);
//             },
//             (tx, error) => {
//               console.log(`update data error ${table.name}: `, error);
//             },
//           );
//         });
//       },
//       error => {
//         console.log('update data query transaction failed: ', error);
//         callBack(null, error); //notify caller
//       },
//       success => {
//         console.log('update data query transaction success: ', success);
//         callBack(success ?? 'success', null); //notify caller
//       },
//     );
//   } catch (error) {
//     console.log('update data error: ', data);
//     callBack(null, error); //notify caller
//   }
// };


//UPDATE QUERY
export const updateData = (query:any, params:any, callBack:any) => {
  try {
    db.transaction(
      (tx:any) => {
        tx.executeSql(
          query,
          params,
          (tx:any, response:any) => {
            console.log(`update data success : `, response);
          },
          (tx:any, error:any) => {
            console.log(`update data error: `, error);
          },
        );

      },
      (error:any) => {
        console.log('update data query transaction failed: ', error);
        callBack(null, error); //notify caller
      },
      (success:any) => {
        console.log('update data query transaction success: ', success);
        callBack(success ?? 'success', null); //notify caller
      },
    );
  } catch (error) {
    console.log('update data error: ', data);
    callBack(null, error); //notify caller
  }
};

//DELETE QUERY
export const deleteData = (data:any, callBack:any) => {
  try {
    db.transaction(
      (tx:any) => {
        data.forEach(table => {
          let queryString = `DELETE FROM ${table.table} ${table.query}`;

          tx.executeSql(
            queryString,
            table.params,
            (tx:any, response:any) => {
              // console.log(`delete data success ${table.name}: `, response);
            },
            (tx:any, error:any) => {
              // console.log(`delete data error ${table.name}: `, error);
            },
          );
        });
      },
      (error:any) => {
        // console.log('delete data query transaction failed: ', error);
        callBack(null, error); //notify caller
      },
      (success:any) => {
        // console.log('delete data query transaction success: ', success);
        callBack(success ?? 'success', null); //notify caller
      },
    );
  } catch (error) {
    console.log('delete data error: ', data);
    callBack(null, error); //notify caller
  }
};

//SEARCH QUERY
export const searchData = (query: any, params: any, callBack: any) => {
  try {
    db.executeSql(
      query,
      params,
      (tx:any, response:any) => {

        if (tx && tx.rows && tx.rows.raw()) {



          // console.log('search data ................. : ', tx.rows.raw());

          return callBack(tx.rows.raw(), null); //notify caller

        }
      },
      (tx:any, error:any) => {
        callBack(null, error); //notify caller
        console.log('search data error : ', error);
      },
    );
  } catch (error) {
    console.log('search data error: ', error);
    callBack(null, error); //notify caller
  }
};

//ANY QUERY
export const executeQuery = (query:any, params:any, callBack:any) => {
  try {
    db.executeSql(
      query,
      params,
      (tx:any, response:any) => {
        if (tx) {
          console.log('query data : ', tx);
          return callBack(tx, null); //notify caller
        }
        console.log('query data error : no data');
      },
      (tx:any, error:any) => {
        callBack(null, error); //notify caller
        console.log('query data error : ', error);
      },
    );
  } catch (error) {
    console.log('query data error: ', error);
    callBack(null, error); //notify caller
  }
};

//INSERT + UPDATE QUERY
export const indateData = (data:any, callBack:any) => {
  try {
    db.transaction(
      (tx:any) => {
        data.forEach(table => {
          // let queryString = `INSERT INTO ${table.table} (${table.columns}) VALUES (${table.values})
          // ON CONFLICT(${table.primaryKey}) DO UPDATE SET ${table.subQuery}`;

          // console.log("insert query **********************   "+queryString);

          let queryString = `INSERT OR REPlACE INTO ${table.table} (${table.columns}) VALUES (${table.values})`;

          tx.executeSql(
            queryString,
            table.params,
            (tx:any, response:any) => {
              // console.log(`indate data success ${table.table}: `, response);
            },
            (tx:any, error:any) => {
              console.log(`indate data error ${table.table}: `, error);
            },
          );
        });
      },
      (error:any) => {
        console.log(`${data[0].table} data transaction: `, error);
        callBack(null, error); //notify caller
      },
      (success:any) => {
        // console.log(`${data[0].table} data transaction: `, 'success');
        callBack(success ?? 'success', null); //notify caller
      },
    );
  } catch (error) {
    console.log('query data error: ', error);
    callBack(null, error); //notify caller
  }
};