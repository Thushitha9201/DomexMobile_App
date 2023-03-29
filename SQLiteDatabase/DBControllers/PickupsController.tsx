import * as DB from '../DBService';

export const insertPickups = (data:any, callBack:any) => {
  var response:any;
  for (let i = 0; i < data.length; ++i) {
      DB.indateData(
          [
              {
                  table: 'PICKUP_COLLECTION',
                  columns: `id,delivery_type,is_multiple,pref_pick_date,pref_pick_time,tracking_id,sender_id,created_date,created_time,total_cost,paid_amount,is_fully_paid,paid_date,paid_time,job_stage,audit_user,audit_date,audit_time,received_method,status`,
                  values: '?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',
                  params: [
                      data[i].id,
                      data[i].delivery_type,
                      data[i].is_multiple,
                      data[i].pref_pick_date,
                      data[i].pref_pick_time,
                      data[i].tracking_id,
                      data[i].sender_id,
                      data[i].created_date,
                      data[i].created_time,
                      data[i].total_cost,
                      data[i].paid_amount,
                      data[i].is_fully_paid,
                      data[i].paid_date,
                         data[i].paid_time,
                            data[i].job_stage,
                            data[i].audit_user,
                            data[i].audit_date,
                            data[i].audit_time,
                               data[i].received_method,
                               data[i].status,
                              
                  ],
                  primaryKey: 'id',
                  subQuery: `name = EXCLUDED.name, status = EXCLUDED.status`,
              },
          ],
          (res:any, err:any) => {
              if(res === 'success'){

                  if( i+1 == data.length){
                      response = 3;
          
                      callBack(response);
                      console.log(" insertPickups unaaaaaaaa");
                  }else if(i == 0){
          
                      response =1;
                      callBack(response);
                      console.log(" first time ...insertPickups..");
                  }
  
                 
              }else{
                  // response =false;
                  response =2;
                  callBack(response);
              }
          },
      );
  }
};

export const getPickupsData = (status:any,type: any,callBack:any) => {
    console.log("--PICK CON--> " , status , type);
    DB.searchData(
        'SELECT * FROM PICKUP_COLLECTION WHERE  status = ?  AND job_stage = ?',
        [status,type],
        (resp, err) => {
            callBack(resp, err);
            console.log("--PICK CON--> filter data pickup and delivery  " , resp);
        },
    );
  };
// export const getPickupsData = (status:any,callBack:any) => {
   
//     DB.searchData(
//         'SELECT * FROM PICKUP_COLLECTION WHERE job_stage = ?',
//         [status],
//         (resp, err) => {
//             callBack(resp, err);
//             console.log("--PICK CON--> filter data pickup and delivery  " , resp);
//         },
//     );
//   };
  export const UpdatePendingOrderStart = (Status: any, Trackingid: any, callBack: any) => {
    DB.updateData(
        'UPDATE PICKUP_COLLECTION SET status=? where tracking_id=?',
        [Status, Trackingid],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};
//     export const UpdatePendingOrderStart = (Status: any, Trackingid: any, callBack: Function) => {
//     var temp: any;
//     DB.transaction((tx: any) => {
//       tx.executeSql(
//         'UPDATE Pickups set status=? where TrackingId=?',
//         [Status, Trackingid],
//         (tx: any, results: any) => {
//           console.log('Results', results.rowsAffected);
//           if (results.rowsAffected > 0) {
//             temp = true;
//           } else {
//             temp = false;
//           }
//           callBack(temp);
//         }
//       );
//     });
//   }



  

// export const getPickupsData = async ( data: any,type:any,callBack: Function) => {

//   console.log(data,"--type",type);
  
//     var temp = [];
//     await db.transaction(async (tx: any) => {
//       tx.executeSql(
//         'SELECT * FROM Pickups WHERE status = ? AND Type_module = ? ',
//         [data,type],
//         (tx: any, results: any) => {
  
//           for (let i = 0; i < results.rows.length; ++i) {
//             temp = [...temp, results.rows.item(i)]
//           }
//           // console.log("2222222", temp);
//           callBack(temp);
//         }
  
//       );
//     });
//   }

// export const insertPickups = ( data :any, callBack: Function) =>{

//   console.log(data,"------------");
//   try {
//     var returnvalue:any;
//     for (let i = 0; i < data.length; ++i) {
//         db.transaction(function (tx: any) {
//             tx.executeSql(
//                 'INSERT INTO Pickups (TrackingId, PackagesPrice, Reciername,Reciermobile,Recieraddress,Type_module,status) VALUES (?,?,?,?,?,?,?)',
//                 [ data[i].TrackingId,data[i].PackagesPrice,data[i].Reciername,data[i].Reciermobile,data[i].Recieraddress,data[i].Type,data[i].Status ],
              
//               (tx: any, results: any) => {
//                 console.log(results,">>>>>>>>>>>>>>>>>");
//                 if (results.rowsAffected > 0) {
                 
                  
//                     returnvalue = true;
//                 } else {
//                     returnvalue = false;
//                 }
               
//               }
//             );
//           });
//     }
//     callBack(returnvalue);
//   } catch (error) {
//     console.log(error);
    
//   }
 
// }





//   export const getPickupsDataTrackIDUnique = async ( data: any,callBack: Function) => {
//     var temp = [];
//     console.log(data);
    
//     await db.transaction(async (tx: any) => {
//       tx.executeSql(
//         'SELECT * FROM Pickups INNER JOIN packageDetails ON Pickups.TrackingId=packageDetails.TrackingId WHERE  Pickups.TrackingId = ? ',
//         [data],
//         (tx: any, results: any) => {
  
//           for (let i = 0; i < results.rows.length; ++i) {
//             temp = [...temp, results.rows.item(i)]
//           }
//           // console.log("2222222", temp);
//           callBack(temp);
//         }
  
//       );
//     });
//   }
//   export const getPickupSenderData = async ( data: any,callBack: Function) => {
//     var temp = [];
//     await db.transaction(async (tx: any) => {
//       tx.executeSql(
//         'SELECT * FROM senderDetails  WHERE TrackingId = ? ',
//         [data],
//         (tx: any, results: any) => {
  
//           callBack(results);
//         }
  
//       );
//     });
//   }
//   export const getlastIndex = async (callBack: Function) => {
//     var docnum: any;
//     await db.transaction(async (tx: any) => {
//       tx.executeSql(
//         'SELECT * FROM Pickups ORDER BY PickupsId DESC LIMIT 1 ',
//         [],
//         (tx: any, results: any) => {

         
//         //   if (results.rowsAffected == 0) {
//         //     docnum = 1;
//         // }
//         for (let i = 0; i < results.rows.length; ++i) {
//             if (results.rows.length > 0) {
//                 let lastID = results.rows.item(i).TrackingId;

//                 console.log(lastID);
                
             
//                 docnum = parseFloat(lastID) + 1;
//             }
//             else {
//                 docnum = 1;
//             }
//         }
//         callBack(docnum);
//         }
  
//       );
//     });
//   }
  

//   export const getPickupMainData = async ( data: any,callBack: Function) => {
//     await db.transaction(async (tx: any) => {
//       tx.executeSql(
//         // 'SELECT Pickups.TrackingId,Pickups.Reciername,Pickups.Reciermobile,Pickups.Recieraddress,Pickups.PackagesPrice,senderDetails.TrackingId as tid FROM Pickups INNER JOIN senderDetails ON Pickups.TrackingId=senderDetails.TrackingId WHERE Pickups.TrackingId = ? ',
//         'SELECT Pickups.TrackingId,Pickups.Type_module,Pickups.Reciername,Pickups.Reciermobile,Pickups.Recieraddress,Pickups.PackagesPrice,senderDetails.name,senderDetails.address,senderDetails.mobile,senderDetails.namePickups,senderDetails.temporyCredit,packageDetails.Pwidth,packageDetails.Pheight,packageDetails.Plength,packageDetails.Pweight,packageDetails.NoofPieces,packageDetails.NoofPackaages,packageDetails.specialIntroduction,packageDetails.description,packageDetails.PType FROM Pickups INNER JOIN senderDetails ON Pickups.TrackingId=senderDetails.TrackingId INNER JOIN packageDetails ON Pickups.TrackingId=packageDetails.TrackingId WHERE Pickups.TrackingId = ? ',
//         [data],
//         (tx: any, results: any) => {
//           callBack(results);
//         }
  
//       );
//     });
//   }

  
 
//   export const insertsender = ( data :any, callBack: Function) =>{
//     var returnvalue:any;
//     for (let i = 0; i < data.length; ++i) {
//         db.transaction(function (tx: any) {
//             tx.executeSql(
//                 'INSERT INTO senderDetails (TrackingId, name, namePickups,mobile,address,temporyCredit,status) VALUES (?,?,?,?,?,?,?)',
//                 [ data[i].TrackingId,data[i].name,data[i].namePickups,data[i].mobile,data[i].address,data[i].temporyCredit,data[i].status ],
//               (tx: any, results: any) => {
//                 if (results.rowsAffected > 0) {
//                     returnvalue = true;
//                 } else {
//                     returnvalue = false;
//                 }
               
//               }
//             );
//           });
//     }
//     callBack(returnvalue);
//   }
//   export const insertpackagesDetails = ( data :any, callBack: Function) =>{
//     var returnvalue:any;
//     for (let i = 0; i < data.length; ++i) {
//         db.transaction(function (tx: any) {
//             tx.executeSql(
//                 'INSERT INTO packageDetails (TrackingId, Pwidth, Pheight,Plength,Pweight,NoofPieces,NoofPackaages,specialIntroduction,description,PType,status) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
//                 [ data[i].TrackingId,data[i].width,data[i].height,data[i].length,data[i].weight,data[i].NoofPieces,data[i].NoofPackaages,data[i].specialIntroduction,data[i].description,data[i].PType,data[i].status ],
//               (tx: any, results: any) => {
//                 if (results.rowsAffected > 0) {
//                     returnvalue = true;
//                 } else {
//                     returnvalue = false;
//                 }
               
//               }
//             );
//           });
//     }
//     callBack(returnvalue);
//   }
//   export const UpdatePackages = (p_width: any, p_height: any, p_lenght: any,p_weight: any,noofpeices: any,noofpackages: any, Trackingid: any, callBack: Function) => {
//     var temp: any;
//     db.transaction((tx: any) => {
//       tx.executeSql(
//         'UPDATE packageDetails set Pwidth=?,Pheight=?,Plength=?,Pweight=?,NoofPieces=?,NoofPackaages=? where TrackingId=?',
//         [p_width, p_height,p_lenght,p_weight,noofpeices,noofpackages, Trackingid],
//         (tx: any, results: any) => {
//           console.log('Results', results.rowsAffected);
//           if (results.rowsAffected > 0) {
//             temp = true;
//           } else {
//             temp = false;
//           }
//           callBack(temp);
//         }
//       );
//     });
//   }
//   export const UpdatePendingOrderStart = (Status: any, Trackingid: any, callBack: Function) => {
//     var temp: any;
//     db.transaction((tx: any) => {
//       tx.executeSql(
//         'UPDATE Pickups set status=? where TrackingId=?',
//         [Status, Trackingid],
//         (tx: any, results: any) => {
//           console.log('Results', results.rowsAffected);
//           if (results.rowsAffected > 0) {
//             temp = true;
//           } else {
//             temp = false;
//           }
//           callBack(temp);
//         }
//       );
//     });
//   }
