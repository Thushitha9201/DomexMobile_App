import * as DB from '../DBService';

export const SAVE_RECEIVER = (data:any, callBack:any) => {
    var response:any;
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'RECEIVER',
                    columns: `id,recevier_name,recevier_mobile,
                    recevier_mobile_alter,
                    recevier_address_1,recevier_address_2,recevier_address_3,
                    is_new,is_synced,audit_user,audit_date,audit_time,InquiryID,DistrictId,MainCityID,
                    CityID,Tempory_Credit_Status,Tempory_Credit_Outstanding`,
                    values: '?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',   //18
                    params: [
                        data[i].id,      //1
                        data[i].recevier_name,      //2
                        data[i].recevier_mobile,        //3
                        data[i].recevier_mobile_alter,     //4
                        data[i].recevier_address_1,      //5
                        data[i].recevier_address_2,      //6
                        data[i].recevier_address_3,      //7
                        data[i].is_new,      //8
                        data[i].is_synced,      //9
                        data[i].audit_user,      //10
                        data[i].audit_date,      //11
                        data[i].audit_time,      //12
                        data[i].InquiryID,//13
                        data[i].DistrictId,//14
                        data[i].MainCityID,//15
                        data[i].CityID,//16
                        data[i].Tempory_Credit_Status,//17   0 = Credit Not avalable  1 = Credit Avalable
                        data[i].Tempory_Credit_Outstanding,//18
                    ],
                    primaryKey: '_ID',
                },
            ],
            (res:any, err:any) => {
                if(res === 'success'){

                    // console.log(i,"___________Item________________",response);

                    if( i+1 == data.length){
                        response = 3;
            
                        callBack(response);
                        console.log(" Reciver iwara unaaaaaaaa");

                    }else if(i == 0){
            
                        response =1;
                        callBack(response);
                        console.log("  Reciver first time .....");
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

export const getLastReciverId = (callBack:any) => {
    DB.searchData(
      'SELECT _ID FROM RECEIVER ORDER BY _ID DESC LIMIT 1',
      [],
      (resp, err) => {
        callBack(resp, err);
      },
    );
  };

  export const getReciverByTrackingID = (InquriyID: any,callBack:any) =>{
    console.log(" **************  all RECEIVER 1************  " + InquriyID);
    DB.searchData(
        "SELECT ifnull(RECEIVER.id,'') as id ," +
        " ifnull(RECEIVER.recevier_name,'') as recevier_name," +
        " ifnull(RECEIVER.recevier_mobile,'-') as recevier_mobile ," +
        " ifnull(RECEIVER.recevier_address_1,'') as recevier_address_1 ," +
        " ifnull(RECEIVER.recevier_address_2,'') as recevier_address_2 ," +
        " ifnull(RECEIVER.recevier_address_3,'') as recevier_address_3," +
        " ifnull(RECEIVER.DistrictId,'') as DistrictId, " +
        " ifnull(RECEIVER.MainCityID,'') as MainCityID, " +
        " ifnull(RECEIVER.CityID,'') as CityID, " +
        " ifnull(PACKAGE.tracking_id,'-') as tracking_id," + 
        " ifnull(PACKAGE.Package_amount,'') as Package_amount " +
        " FROM RECEIVER RECEIVER "+
        " INNER JOIN PACKAGE ON PACKAGE.receiver_id = RECEIVER.id " +
         " where RECEIVER.InquiryID =?",
        [InquriyID],
        (resp:any, err:any) => {
           console.log(" **************  all RECEIVER ************  " + resp);
            callBack(resp, err);
        },
    );
}

export const getNumberOFReciver = (inquiryID: any, callBack: any) => {
    // console.log(inquiryID, '----', inquiryID);
 
     DB.searchData(
 
         "select  count(_ID)as count from RECEIVER" +
         " WHERE RECEIVER.InquiryID=?",
         [inquiryID],
         (resp: any, err: any) => {
             callBack(resp, err);
         },
     );
 };
 export const DeleteReceiver = ( id:any,callBack:any) => {

    DB.deleteData(
        [
            {
                table: 'RECEIVER',
                query: 'WHERE id=?',
                params: [id],
            },
        ],
        (resp:any, err:any) => {
            console.log(resp,">>>>>>",err);
            
            callBack(resp, err);
        },
    );
}; 