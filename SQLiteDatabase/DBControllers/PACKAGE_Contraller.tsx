import * as DB from '../DBService';


export const SAVE_PACKAGE = (data: any, callBack: any) => {
    var response:any;
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'PACKAGE',
                    columns: `id,sender_id,receiver_id,details,special_instruct,
                    package_count,pieces_count,width,height,length,weight,
                    is_new,is_synced,created_user,created_date,
                    created_time,pickup_user,pickup_date,pickup_time,
                    pickup_lat,pickup_long,delivery_user,delivery_date,
                    delivery_time,delivery_lat,delivery_long,job_stage,
                    collection_ID,tracking_id,job_status,Payment_Mode_ID,
                    Payment_Mode_Des,Package_amount,issettle,InquiryID,AreaTypeID,PacakgeTypeID`,
                    values: '?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',  //37
                    params: [
                        data[i].id,              //1
                        data[i].sender_id,       //2
                        data[i].receiver_id,     //3
                        data[i].details,         //4
                        data[i].special_instruct,//5
                        data[i].package_count,   //6
                        data[i].pieces_count,    //7
                        data[i].width,           //8
                        data[i].height,          //9
                        data[i].length,          //10
                        data[i].weight,          //11
                        data[i].is_new,            //12
                        data[i].is_synced,          //13
                        data[i].created_user,       //14
                        data[i].created_date,       //15
                        data[i].created_time,       //16
                        data[i].pickup_user,        //17
                        data[i].pickup_date,        //18
                        data[i].pickup_time,        //19
                        data[i].pickup_lat,         //20
                        data[i].pickup_long,        //21
                        data[i].delivery_user,      //22
                        data[i].delivery_date,      //23
                        data[i].delivery_time,      //24
                        data[i].delivery_lat,       //25
                        data[i].delivery_long,      //26
                        data[i].job_stage,          //27     1 =pickup------   2 = DElevary
                        data[i].collection_ID,          //28
                        data[i].tracking_id,          //29
                        data[i].job_status,          //30    1 = ongoing   2 =complete  3= Pending 0* incomplete
                        data[i].Payment_Mode_ID,          //31    
                        data[i].Payment_Mode_Des,          //32   
                        data[i].Package_amount,          //33  
                        data[i].issettle,          //34   
                        data[i].InquiryID,  //35
                        data[i].AreaTypeID,  //36
                        data[i].PacakgeTypeID,  //37 

                    ],
                    primaryKey: '_ID',
                },
            ],
            (res: any, err: any) => {
                if(res === 'success'){

                    // console.log(i,"___________Item________________",response);

                    if( i+1 == data.length){
                        response = 3;
            
                        callBack(response);
                        console.log(" Package iwara unaaaaaaaa");

                    }else if(i == 0){
            
                        response =1;
                        callBack(response);
                        console.log(" Package first time .....");
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


export const Get_Packages = (choosestatus:any,data:any,callBack:any) => {
    console.log(choosestatus,'----',data);
    
    DB.searchData(
        // 'SELECT * FROM PACKAGE WHERE job_status =1',
        'SELECT PACKAGE.*,RECEIVER.*, SENDER.* FROM PACKAGE JOIN RECEIVER ON PACKAGE.receiver_id = RECEIVER.id JOIN SENDER ON PACKAGE.sender_id = SENDER.id WHERE PACKAGE.job_stage=? AND PACKAGE.job_status =?',
        [data,choosestatus],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
};
export const Get_Packages_Specific_Data = (data:any,callBack:any) => {
    console.log('----',data);
    
    DB.searchData(
        // 'SELECT * FROM PACKAGE WHERE job_status =1',
        'SELECT PACKAGE.*,RECEIVER.*, SENDER.* FROM PACKAGE JOIN RECEIVER ON PACKAGE.receiver_id = RECEIVER.id JOIN SENDER ON PACKAGE.sender_id = SENDER.id WHERE PACKAGE.tracking_id=?',
        [data],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
};
export const  Get_AreaPackage_Type_Data = (data:any,callBack:any) => {
    console.log('----',data);
    
    DB.searchData(
        // 'SELECT * FROM PACKAGE WHERE job_status =1',
        'SELECT PACKAGE.*, AREA_Type.description AS areatype, PACAKGE_Type.description AS packagetype FROM PACKAGE JOIN AREA_Type ON PACKAGE.AreaTypeID = AREA_Type.id JOIN PACAKGE_Type ON PACKAGE.PacakgeTypeID = PACAKGE_Type.id WHERE PACKAGE.tracking_id=?',
        [data],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
};
export const getPackageDetails = (data:any,callBack:any) => {
    DB.searchData(
        'SELECT * FROM PACKAGE WHERE id=?',
        [data],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
};
export const UpdatePendingOrderStart = (Status: any, Trackingid: any, callBack: any) => {
    DB.updateData(
        'UPDATE PACKAGE SET job_status=? where tracking_id=?',
        [Status, Trackingid],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
}



//-------------------------GET PENDING/NEW PICKUP INFO for HOME SCREEN

export const getALLPendigPickupsAndDelivery = (job_stage: any, job_status: any, callBack: any) => {
   // console.log(job_stage, '----', job_status);

    DB.searchData(

        "SELECT PACKAGE.*, ifnull(RECEIVER.recevier_name,'') as recevier_name ," +
        " ifnull(RECEIVER.recevier_mobile,'') as recevier_mobile," +
        " ifnull(RECEIVER.recevier_address_1,'') as recevier_address_1 ," +
        " ifnull(RECEIVER.recevier_address_2,'-') as recevier_address_2 ," +
        " ifnull(RECEIVER.recevier_address_3,'-') as recevier_address_3 ," +
        " ifnull(SENDER.sender_name,'-') as sender_name ," +
        " ifnull(SENDER.sender_mobile,'-') as sender_mobile ," +
        " ifnull(SENDER.sender_address_1,'-') as sender_address_1 , " +
        " ifnull(SENDER.sender_address_3,'-') as sender_address_3 " +
        " FROM PACKAGE INNER JOIN RECEIVER ON PACKAGE.receiver_id = RECEIVER.id " +
        " INNER JOIN SENDER ON PACKAGE.sender_id = SENDER.id " +
        " WHERE PACKAGE.job_stage=? AND PACKAGE.job_status =?",
        [job_stage, job_status],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};

//--------------Displays the number of active pick ups that are assigned to the logged in user.

export const getNumberOFPickupsandDelivery = (job_stage: any, job_status: any, callBack: any) => {
   // console.log(job_stage, '----', job_status);

    DB.searchData(

        "select  count(_ID)as count from PACKAGE" +
        " WHERE PACKAGE.job_stage=? AND PACKAGE.job_status =?",
        [job_stage, job_status],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
};

//-------------------------GET PACKAGE BARCODE LIST 

export const getPackage_barcodeList = (trackid: any, callBack: any) => {
    // console.log(job_stage, '----', job_status);
 
     DB.searchData(
 
         "SELECT ifnull(PACKAGE_BARCODE.id,'') as id ," +
         " ifnull(PACKAGE_BARCODE.package_id,'') as package_id," +
         " ifnull(PACKAGE_BARCODE.image,'') as image ," +
         " ifnull(PACKAGE_BARCODE.barcode_id,'0') as barcode_id ," +
         " ifnull(PACKAGE_BARCODE.is_deleted,'') as is_deleted ," +
         " ifnull(PACKAGE_BARCODE.is_new,'') as is_new ," +
         " ifnull(PACKAGE_BARCODE.is_synced,'') as is_synced " +
         " FROM PACKAGE_BARCODE JOIN PACKAGE ON PACKAGE.id = PACKAGE_BARCODE.package_id" +
         " WHERE PACKAGE.tracking_id =?",
         [trackid],
         (resp: any, err: any) => {
             callBack(resp, err);
         },
     );
 };
 //---------------TEMP create UINQUE KEY for INSTANCE PIKUPSAVE---------------

 export const getLastPackgeId = (callBack:any) => {
    DB.searchData(
      'SELECT _ID FROM PACKAGE ORDER BY _ID DESC LIMIT 1',
      [],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };
  
 export const UpdatePackageDetails = (width:any,height:any,lenght:any,weight:any,nofpieces:any,nofpackages:any,TrackingID:any,callBack:any) => {

    DB.updateData(
      'UPDATE PACKAGE SET width=?,height=?,length=?,weight=?,pieces_count=?,package_count=? WHERE tracking_id=?',
      [width,height,lenght,weight,nofpieces,nofpackages,TrackingID],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };
  
//complete,ongoing etc.. pickup data func DaySummaryReportScreen
export const getStatusOfPickups = (job_stage: any, job_status: any, callBack: any) => {
    // console.log(job_stage, '----', job_status);
 
     DB.searchData(
 
         "select  count(_ID)as count from PACKAGE" +
         " WHERE PACKAGE.job_stage=? AND PACKAGE.job_status =?",
         [job_stage, job_status],
         (resp: any, err: any) => {
             callBack(resp, err);
         },
     );
 };


 //complete,ongoing etc.. pickup data func DaySummaryReportScreen
export const getStatusOfDelivery = (job_stage: any, job_status: any, callBack: any) => {
    // console.log(job_stage, '----', job_status);
 
     DB.searchData(
 
         "select  count(_ID)as count from PACKAGE" +
         " WHERE PACKAGE.job_stage=? AND PACKAGE.job_status =?",
         [job_stage, job_status],
         (resp: any, err: any) => {
             callBack(resp, err);
         },
     );
 };

 export const  Get_DaySummaryReport = (choosestatus:any,data:any,callBack:any) => {
    console.log(choosestatus,'----',data);
    
    DB.searchData(
        // 'SELECT * FROM PACKAGE WHERE job_status =1',
        'SELECT PACKAGE.*,RECEIVER.*, SENDER.* FROM PACKAGE JOIN RECEIVER ON PACKAGE.receiver_id = RECEIVER.id JOIN SENDER ON PACKAGE.sender_id = SENDER.id WHERE PACKAGE.job_stage=? AND PACKAGE.job_status =?',
        [data,choosestatus],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
};

// .........................Get All Data from Trasaction DaySummaryReportScreen...........

export const Get_Packages_Data = (data:any,callBack:any) => {
    
    
    DB.searchData(
        'SELECT PACKAGE.*,RECEIVER.*, SENDER.* FROM PACKAGE JOIN RECEIVER ON PACKAGE.receiver_id = RECEIVER.id JOIN SENDER ON PACKAGE.sender_id = SENDER.id WHERE  PACKAGE.issettle=?',
        [data],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
};

// ------------------------------------Settled report---------------------

export const UpdateSellteled_Data = (Status: any, Trackingid: any, callBack: any) => {
    DB.updateData(
        'UPDATE PACKAGE SET issettle=? where tracking_id=?',
        [Status, Trackingid],
        (resp: any, err: any) => {
            callBack(resp, err);
        },
    );
}

export const getslectedAmount = (trackingID:any,callBack:any) => {
    DB.searchData(
      'SELECT Package_amount FROM PACKAGE WHERE tracking_id=?',
      [trackingID],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };

  export const getNumberOFPackage = (inquiryID: any, callBack: any) => {
 console.log(inquiryID, '---getNumberOFPackage---->', inquiryID);
 
     DB.searchData(
 
         "select  count(_ID)as count from PACKAGE" +
         " WHERE PACKAGE.InquiryID=?",
         [inquiryID],
         (resp: any, err: any) => {
             callBack(resp, err);
         },
     );
 };
 //-------------------------GET PACKAGEiNFO FOR PAYMET SCREEN-->INSTANCE PICK UP

export const getPakageAndReciverInfoPayment = (InquriyID: any, callBack: any) => {
    // console.log(job_stage, '----', job_status);
 
     DB.searchData(
 
         "SELECT ifnull(PACKAGE.tracking_id,'-') as tracking_id," + 
         " ifnull(PACKAGE.Package_amount,'') as Package_amount ," +
         " ifnull(RECEIVER.recevier_name,'') as recevier_name ," +
         " ifnull(RECEIVER.recevier_mobile,'') as recevier_mobile," +
         " ifnull(RECEIVER.recevier_address_1,'') as recevier_address_1 ," +
         " ifnull(RECEIVER.recevier_address_2,'-') as recevier_address_2 ," +
         " ifnull(RECEIVER.recevier_address_3,'-') as recevier_address_3 ," +
         " ifnull(RECEIVER.DistrictId,'') as DistrictId, " +
         " ifnull(RECEIVER.MainCityID,'') as MainCityID, " +
         " ifnull(RECEIVER.CityID,'') as CityID " +
         " FROM PACKAGE INNER JOIN RECEIVER ON PACKAGE.receiver_id = RECEIVER.id " +
         " WHERE PACKAGE.InquiryID=? ",
         [InquriyID],
         (resp: any, err: any) => {
             callBack(resp, err);
         },
     );
 };

 export const getSumPakagePrice = (inquiryID: any, callBack: any) => {

        DB.searchData(
    
            "select  SUM(Package_amount)as Package_amount from PACKAGE" +
            " WHERE PACKAGE.InquiryID=?",
            [inquiryID],
            (resp: any, err: any) => {
                callBack(resp, err);
            },
        );
    };

    export const UpdatePackegsbyIquryID = (Status: any, InquiryID: any, callBack: any) => {
        DB.updateData(
            'UPDATE PACKAGE SET job_status=? where InquiryID=?',
            [Status, InquiryID],
            (resp: any, err: any) => {
                callBack(resp, err);
            },
        );
    }

    export const DeletePakagebyReciver = ( receiverid:any,InquiryID:any,callBack:any) => {

        DB.deleteData(
            [
                {
                    table: 'PACKAGE',
                    query: 'WHERE receiver_id=?,InquiryID=?',
                    params: [receiverid,InquiryID],
                },
            ],
            (resp:any, err:any) => {
                console.log(resp,">>PACKAGE delete q uery>>>>",err);
                
                callBack(resp, err);
            },
        );
    }; 

    export const Get_PackageID_VS_TrackingID = (TrackingID: any, callBack: any) => {

        DB.searchData(
    
            "select id  from PACKAGE" +
            " WHERE PACKAGE.tracking_id=?",
            [TrackingID],
            (resp: any, err: any) => {
                callBack(resp, err);
            },
        );
    };