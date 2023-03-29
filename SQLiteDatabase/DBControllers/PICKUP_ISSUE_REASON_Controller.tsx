import * as DB from '../DBService';

export const SAVE_PICKUP_ISSUE_REASON = (data:any, callBack:any) => {
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'PICKUP_ISSUE_REASON',
                    columns: `id,description,status,created_date,created_time`,
                    values: '?,?,?,?,?',   //5
                    params: [
                        data[i].id,      //1
                        data[i].description,      //2
                        data[i].status,        //3
                        data[i].created_date,     //4
                        data[i].created_time,      //5
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

