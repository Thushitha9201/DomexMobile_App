import * as DB from '../DBService';

export const insertIssues = (data:any, callBack:any) => {
  var response:any;
  for (let i = 0; i < data.length; ++i) {
      DB.indateData(
          [
              {
                  table: 'PICKUP_ISSUE_REASON',
                  columns: `id,description,status,created_date,created_time`,
                  values: '?,?,?,?,?',
                  params: [
                      data[i].Id,
                      data[i].description,
                      data[i].status,
                      data[i].created_date,
                      data[i].created_time,
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
                      console.log(" done unaaaaaaaa");
                  }else if(i == 0){
          
                      response =1;
                      callBack(response);
                      console.log(" first time .....");
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
export const getIssuesData = (callBack:any) => {
  DB.searchData(
      'SELECT * FROM PICKUP_ISSUE_REASON',
      [],
      (resp:any, err:any) => {
          callBack(resp, err);
      },
  );
}



// export const getIssuesData = async (callBack: Function) => {
//     var temp = [];
//     await db.transaction(async (tx: any) => {
//       tx.executeSql(
//         'SELECT * FROM IssuesList  ',
//         [],
//         (tx: any, results: any) => {
  
//           for (let i = 0; i < results.rows.length; ++i) {
//             temp = [...temp, results.rows.item(i)]
//           }
//            console.log("Issue---->", temp);
//           callBack(temp);
//         }
  
//       );
//     });
//   }
  
//   export const getPickupMainData = async ( data: any,callBack: Function) => {
//     await db.transaction(async (tx: any) => {
//       tx.executeSql(
//         // 'SELECT Pickups.TrackingId,Pickups.Reciername,Pickups.Reciermobile,Pickups.Recieraddress,Pickups.PackagesPrice,senderDetails.TrackingId as tid FROM Pickups INNER JOIN senderDetails ON Pickups.TrackingId=senderDetails.TrackingId WHERE Pickups.TrackingId = ? ',
//         'SELECT Pickups.TrackingId,Pickups.Reciername,Pickups.Reciermobile,Pickups.Recieraddress,Pickups.PackagesPrice,senderDetails.name,senderDetails.address,senderDetails.mobile,senderDetails.namePickups,packageDetails.Pwidth,packageDetails.Pheight,packageDetails.Plength,packageDetails.Pweight,packageDetails.NoofPieces,packageDetails.NoofPackaages,packageDetails.specialIntroduction,packageDetails.description,packageDetails.PType FROM Pickups INNER JOIN senderDetails ON Pickups.TrackingId=senderDetails.TrackingId INNER JOIN packageDetails ON Pickups.TrackingId=packageDetails.TrackingId WHERE Pickups.TrackingId = ? ',
//         [data],
//         (tx: any, results: any) => {
//           callBack(results);
//         }
  
//       );
//     });
//   }

  
//   export const insertIssues = ( data :any, callBack: Function) =>{
//     var returnvalue:any;
//     console.log("ISSUE CONTROLLEr --->",data);
    
//     for (let i = 0; i < data.length; ++i) {
//         db.transaction(function (tx: any) {
//             tx.executeSql(
//                 'INSERT INTO PICKUP_ISSUE_REASON (description, status) VALUES (?,?)',
//                 [data[i].description,data[i].status ],
//               (tx: any, results: any) => {
//                 console.log(results,',,,,,,Insert,,,,,');
                
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
//   export const insertsender = ( data :any, callBack: Function) =>{
//     var returnvalue:any;
//     for (let i = 0; i < data.length; ++i) {
//         db.transaction(function (tx: any) {
//             tx.executeSql(
//                 'INSERT INTO senderDetails (detailsId,TrackingId, name, namePickups,mobile,address,status) VALUES (?,?,?,?,?,?,?)',
//                 [ data[i].id,data[i].TrackingId,data[i].name,data[i].namePickups,data[i].mobile,data[i].address,data[i].status ],
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
//                 'INSERT INTO packageDetails (PdetailsId,TrackingId, Pwidth, Pheight,Plength,Pweight,NoofPieces,NoofPackaages,specialIntroduction,description,PType,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
//                 [ data[i].id,data[i].TrackingId,data[i].width,data[i].height,data[i].length,data[i].weight,data[i].NoofPieces,data[i].NoofPackaages,data[i].specialIntroduction,data[i].description,data[i].PType,data[i].status ],
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
  //}
