import * as DB from '../DBService';

export const SAVE_GPS_LOG = (data:any, callBack:any) => {
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'USER',
                    columns: `id,user_id,gps_lat,gps_long,gps_date,gps_time,battery,speed,gps_type,is_synced`,
                    values: '?,?,?,?,?,?,?,?,?,?',   //10
                    params: [
                        data[i].id,      //1
                        data[i].user_id,      //2
                        data[i].gps_lat,        //3
                        data[i].gps_long,     //4
                        data[i].gps_date,      //5
                        data[i].gps_time,      //6
                        data[i].battery,      //7
                        data[i].speed,      //8
                        data[i].gps_type,      //9
                        data[i].is_synced,      //10
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

