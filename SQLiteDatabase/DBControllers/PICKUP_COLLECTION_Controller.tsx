import * as DB from '../DBService';

export const SAVE_PICKUP_COLLECTION = (data:any, callBack:any) => {
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'PICKUP_COLLECTION',
                    columns: `id,delivery_type,is_multiple,pref_pick_date,pref_pick_time,tracking_id,sender_id,created_date,created_time,total_cost,paid_amount,is_fully_paid,paid_date,paid_time,job_stage,audit_user,audit_date,audit_time,received_method,mobile_serial_number`,
                    values: '?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?',   //20
                    params: [
                        data[i].id,                  //1
                        data[i].delivery_type,      //2
                        data[i].is_multiple,        //3
                        data[i].pref_pick_date,     //4
                        data[i].pref_pick_time,     //5
                        data[i].tracking_id,        //6
                        data[i].sender_id,          //7
                        data[i].created_date,       //8
                        data[i].created_time,       //9
                        data[i].total_cost,         //10
                        data[i].paid_amount,        //11
                        data[i].is_fully_paid,      //12
                        data[i].paid_date,          //13
                        data[i].paid_time,          //14
                        data[i].job_stage,          //15
                        data[i].audit_user,         //16
                        data[i].audit_date,         //17
                        data[i].audit_time,         //18
                        data[i].received_method,    //19
                        data[i].mobile_serial_number,    //20
                    ],
                    primaryKey: '_ID',
                },
            ],
            (res:any, err:any) => {
                callBack(res, err);
            },
        );
    }
};

export const Get_FilterData = (choosestatus:any,data:any,query:any,callBack:any) => {
    console.log(choosestatus,'----',data,'////////',query);
    
    DB.searchData(
        // 'SELECT * FROM PACKAGE WHERE job_status =1',
        'SELECT PACKAGE.*,RECEIVER.*, SENDER.* FROM PACKAGE JOIN RECEIVER ON PACKAGE.receiver_id = RECEIVER.id JOIN SENDER ON PACKAGE.sender_id = SENDER.id WHERE tracking_ID LIKE ? AND PACKAGE.job_stage=? AND PACKAGE.job_status =?',
        [`%${query}%`,data,choosestatus],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
};


