import DB from '../DBService';
var db = DB.DATABASE;

  export const getLastMeaterReading = async (callBack: Function) => {
    var temp = [];
    await db.transaction(async (tx: any) => {
      tx.executeSql(
        'SELECT * FROM meaterReading ORDER BY id DESC LIMIT 1',
        [],
        (tx: any, results: any) => {
  
  
          callBack(results);
        }
  
      );
    });
  }
  export const getyestdayMeaterReading = async (date: any,callBack: Function) => {
    var temp = [];
    await db.transaction(async (tx: any) => {
      tx.executeSql(
        'SELECT * FROM meaterReading WHERE datereading != ? ORDER BY id DESC LIMIT 1',
        [date],
        (tx: any, results: any) => {
  
  
          callBack(results);
        }
  
      );
    });
  }
  export const InsertMeterReading = (empid: any, readingType: any, location: any, date: any,starttime: any,endtime: any, start_value: any,end_value: any, active: any, status: any, callBack: Function) => {

    var returnvalue: any;
    db.transaction(function (tx: any) {
      tx.executeSql(
        'INSERT INTO meaterReading (empID, readingType,location,datereading,starttime,endttime,start_value,end_value,active,status) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [empid, readingType, location, date,starttime,endtime, start_value,end_value, active, status],
        (tx: any, results: any) => {
          if (results.rowsAffected > 0) {
            returnvalue = true;
          } else {
            returnvalue = false;
          }
          callBack(returnvalue);
        }
      );
    });
  }
  export const ENDReadingProcess = (status: any, readingType: any, end_value: any,end_time: any, id: any, callBack: Function) => {
    var temp: any;
    db.transaction((tx: any) => {
      tx.executeSql(
        'UPDATE meaterReading set status=?,readingType=?,end_value=?,endttime=? where id=?',
        [status, readingType,end_value,end_time, id],
        (tx: any, results: any) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            temp = true;
          } else {
            temp = false;
          }
          callBack(temp);
        }
      );
    });
  }