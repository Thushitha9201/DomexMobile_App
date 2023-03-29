import * as DB from '../DBService';

export const SAVE_SERVICE_CHARGE_TYPE = (data:any, callBack:any) => {
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'SERVICE_CHARGE_TYPE',
                    columns: `id,charge_name,is_act`,
                    values: '?,?,?',   //3
                    params: [
                        data[i].id,      //1
                        data[i].charge_name,      //2
                        data[i].is_act,        //3 
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

