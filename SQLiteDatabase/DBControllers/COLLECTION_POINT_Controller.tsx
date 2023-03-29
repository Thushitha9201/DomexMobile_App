import * as DB from '../DBService';

export const SAVE_COLLECTION_POINT = (data:any, callBack:any) => {
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'COLLECTION_POINT',
                    columns: `id,location_tpye,address_1,address_2,address_3,gps_lat,gps_long,is_new,is_synced,audit_user,audit_date,audit_time`,
                    values: '?,?,?,?,?,?,?,?,?,?,?,?',   //12
                    params: [
                        data[i].id,      //1
                        data[i].location_tpye,      //2
                        data[i].address_1,        //3
                        data[i].address_2,     //4
                        data[i].address_3,     //5
                        data[i].gps_lat,        //6
                        data[i].gps_long,      //7
                        data[i].is_new,       //8
                        data[i].is_synced,         //9
                        data[i].audit_user,        //10
                        data[i].audit_date,      //11
                        data[i].audit_time,          //12
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

