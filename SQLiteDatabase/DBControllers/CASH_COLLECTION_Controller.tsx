import * as DB from '../DBService';

export const SAVE_CASH_COLLECTION = (data:any, callBack:any) => {
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'CASH_COLLECTION',
                    columns: `id,package_id,total_amount,paid_amount,paid_user,collected_user,paid_date,paid_time`,
                    values: '?,?,?,?,?,?,?,?',   //8
                    params: [
                        data[i].id,      //1
                        data[i].package_id,      //2
                        data[i].total_amount,        //3
                        data[i].paid_amount,     //4
                        data[i].paid_user,      //5
                        data[i].collected_user,      //6
                        data[i].paid_date,      //7
                        data[i].paid_time,      //8
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

