import * as DB from '../DBService';

export const SAVE_USER = (data:any, callBack:any) => {
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'USER',
                    columns: `id,user_id,profile_name,full_name,branch_id,user_type,login_attempts,device_id,login_date,login_time,is_act,hash_key`,
                    values: '?,?,?,?,?,?,?,?,?,?,?,?',   //12
                    params: [
                        data[i].id,      //1
                        data[i].user_id,      //2
                        data[i].profile_name,        //3
                        data[i].full_name,     //4
                        data[i].branch_id,      //5
                        data[i].user_type,      //6
                        data[i].login_attempts,      //7
                        data[i].device_id,      //8
                        data[i].login_date,      //9
                        data[i].login_time,      //10
                        data[i].is_act,      //11
                        data[i].hash_key,      //12
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
export const Get_All_User_Data = (callBack:any) => {
    DB.searchData(
      'SELECT * FROM USER',
      [],
      (resp:any, err:any) => {
        callBack(resp, err);
      },
    );
  };
