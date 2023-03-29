import DB from '../DBService';
var db = DB.DATABASE;

export const getData = async ( data: any,callBack: Function) => {

    var temp = [];
    await db.transaction(async (tx: any) => {
      tx.executeSql(
        'SELECT * FROM senderDetails WHERE TrackingId = ?  ',
        [data],
        (tx: any, results: any) => {
  
          for (let i = 0; i < results.rows.length; ++i) {
            temp = [...temp, results.rows.item(i)]
          }
          // console.log("2222222", temp);
          callBack(temp);
        }
  
      );
    });
  }
  export const deletesenderData = async ( data: any,callBack: Function) => {

    var temp = [];
    await db.transaction(async (tx: any) => {
      tx.executeSql(
        'DELETE FROM senderDetails WHERE TrackingId = ?  ',
        [data],
        (tx: any, results: any) => {
  
          // for (let i = 0; i < results.rows.length; ++i) {
          //   temp = [...temp, results.rows.item(i)]
          // }
          // // console.log("2222222", temp);
          callBack("Delete Sucsess");
        }
  
      );
    });
  }
  export const deletepackageData = async ( data: any,callBack: Function) => {

    var temp = [];
    await db.transaction(async (tx: any) => {
      tx.executeSql(
        'DELETE FROM packageDetails WHERE TrackingId = ?  ',
        [data],
        (tx: any, results: any) => {
  
          // for (let i = 0; i < results.rows.length; ++i) {
          //   temp = [...temp, results.rows.item(i)]
          // }
          // console.log("2222222", temp);
          callBack("Delete Sucsess");
        }
  
      );
    });
  }
  export const getPickupsDataTrackIDUnique = async ( data: any,callBack: Function) => {
    var temp = [];
    console.log(data);
    
    await db.transaction(async (tx: any) => {
      tx.executeSql(
        'SELECT * FROM Pickups INNER JOIN packageDetails ON Pickups.TrackingId=packageDetails.TrackingId WHERE  Pickups.TrackingId = ? ',
        [data],
        (tx: any, results: any) => {
  
          for (let i = 0; i < results.rows.length; ++i) {
            temp = [...temp, results.rows.item(i)]
          }
          // console.log("2222222", temp);
          callBack(temp);
        }
  
      );
    });
  }
  export const getPickupSenderData = async ( data: any,callBack: Function) => {
    var temp = [];
    await db.transaction(async (tx: any) => {
      tx.executeSql(
        'SELECT * FROM senderDetails  WHERE TrackingId = ? ',
        [data],
        (tx: any, results: any) => {
  
          callBack(results);
        }
  
      );
    });
  }
  export const getlastIndex = async (callBack: Function) => {
    var docnum: any;
    await db.transaction(async (tx: any) => {
      tx.executeSql(
        'SELECT * FROM Pickups ORDER BY PickupsId DESC LIMIT 1 ',
        [],
        (tx: any, results: any) => {

         
        //   if (results.rowsAffected == 0) {
        //     docnum = 1;
        // }
        for (let i = 0; i < results.rows.length; ++i) {
            if (results.rows.length > 0) {
                let lastID = results.rows.item(i).TrackingId;

                console.log(lastID);
                
             
                docnum = parseFloat(lastID) + 1;
            }
            else {
                docnum = 1;
            }
        }
        callBack(docnum);
        }
  
      );
    });
  }
  

  export const getPickupMainData = async ( data: any,callBack: Function) => {
    await db.transaction(async (tx: any) => {
      tx.executeSql(
        // 'SELECT Pickups.TrackingId,Pickups.Reciername,Pickups.Reciermobile,Pickups.Recieraddress,Pickups.PackagesPrice,senderDetails.TrackingId as tid FROM Pickups INNER JOIN senderDetails ON Pickups.TrackingId=senderDetails.TrackingId WHERE Pickups.TrackingId = ? ',
        'SELECT Pickups.TrackingId,Pickups.Type_module,Pickups.Reciername,Pickups.Reciermobile,Pickups.Recieraddress,Pickups.PackagesPrice,senderDetails.name,senderDetails.address,senderDetails.mobile,senderDetails.namePickups,senderDetails.temporyCredit,packageDetails.Pwidth,packageDetails.Pheight,packageDetails.Plength,packageDetails.Pweight,packageDetails.NoofPieces,packageDetails.NoofPackaages,packageDetails.specialIntroduction,packageDetails.description,packageDetails.PType FROM Pickups INNER JOIN senderDetails ON Pickups.TrackingId=senderDetails.TrackingId INNER JOIN packageDetails ON Pickups.TrackingId=packageDetails.TrackingId WHERE Pickups.TrackingId = ? ',
        [data],
        (tx: any, results: any) => {
          callBack(results);
        }
  
      );
    });
  }

  
  export const insertPickups = ( data :any, callBack: Function) =>{

    console.log(data,"------------");
    try {
      var returnvalue:any;
      for (let i = 0; i < data.length; ++i) {
          db.transaction(function (tx: any) {
              tx.executeSql(
                  'INSERT INTO Pickups (PickupsId,TrackingId, PackagesPrice, Reciername,Reciermobile,Recieraddress,Type_module,status) VALUES (?,?,?,?,?,?,?,?)',
                  [ data[i].id,data[i].TrackingId,data[i].PackagesPrice,data[i].Reciername,data[i].Reciermobile,data[i].Recieraddress,data[i].Type,data[i].Status ],
                
                (tx: any, results: any) => {
                  console.log(results,">>>>>>>>>>>>>>>>>");
                  if (results.rowsAffected > 0) {
                   
                    
                      returnvalue = true;
                  } else {
                      returnvalue = false;
                  }
                 
                }
              );
            });
      }
      callBack(returnvalue);
    } catch (error) {
      console.log(error);
      
    }
   
  }
  export const insertsender = ( data :any, callBack: Function) =>{
    var returnvalue:any;
    for (let i = 0; i < data.length; ++i) {
        db.transaction(function (tx: any) {
            tx.executeSql(
                'INSERT INTO senderDetails (TrackingId, name, namePickups,mobile,address,temporyCredit,status) VALUES (?,?,?,?,?,?,?)',
                [data[i].TrackingId,data[i].name,data[i].namePickups,data[i].mobile,data[i].address,data[i].temporyCredit,data[i].status ],
              (tx: any, results: any) => {
                if (results.rowsAffected > 0) {
                    returnvalue = true;
                } else {
                    returnvalue = false;
                }
               
              }
            );
          });
    }
    callBack(returnvalue);
  }
  export const insertpackagesDetails = ( data :any, callBack: Function) =>{
    var returnvalue:any;
    for (let i = 0; i < data.length; ++i) {
        db.transaction(function (tx: any) {
            tx.executeSql(
                'INSERT INTO packageDetails (TrackingId, Pwidth, Pheight,Plength,Pweight,NoofPieces,NoofPackaages,specialIntroduction,description,PType,status) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
                [ data[i].TrackingId,data[i].width,data[i].height,data[i].length,data[i].weight,data[i].NoofPieces,data[i].NoofPackaages,data[i].specialIntroduction,data[i].description,data[i].PType,data[i].status ],
              (tx: any, results: any) => {
                if (results.rowsAffected > 0) {
                    returnvalue = true;
                } else {
                    returnvalue = false;
                }
               
              }
            );
          });
    }
    callBack(returnvalue);
  }
  export const UpdatePackages = (p_width: any, p_height: any, p_lenght: any,p_weight: any,noofpeices: any,noofpackages: any, Trackingid: any, callBack: Function) => {
    var temp: any;
    db.transaction((tx: any) => {
      tx.executeSql(
        'UPDATE packageDetails set Pwidth=?,Pheight=?,Plength=?,Pweight=?,NoofPieces=?,NoofPackaages=? where TrackingId=?',
        [p_width, p_height,p_lenght,p_weight,noofpeices,noofpackages, Trackingid],
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
  export const UpdatePendingOrderStart = (Status: any, Trackingid: any, callBack: Function) => {
    var temp: any;
    db.transaction((tx: any) => {
      tx.executeSql(
        'UPDATE Pickups set status=? where TrackingId=?',
        [Status, Trackingid],
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
