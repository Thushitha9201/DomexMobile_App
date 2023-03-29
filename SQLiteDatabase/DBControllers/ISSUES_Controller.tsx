import * as DB from '../DBService';

export const SAVE_ISSUES = (data:any, callBack:any) => {
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'ISSUES',
                    columns: `id,package_id,collection_type,issue_type_id,remarks,is_new,is_synced,audit_user,audit_date,audit_time`,
                    values: '?,?,?,?,?,?,?,?,?,?',   //10
                    params: [
                        data[i].id,      //1
                        data[i].package_id,      //2
                        data[i].collection_type,        //3
                        data[i].issue_type_id,     //4
                        data[i].remarks,      //5
                        data[i].is_new,       //6
                        data[i].is_synced,         //7
                        data[i].audit_user,        //8
                        data[i].audit_date,      //9
                        data[i].audit_time,          //10
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

