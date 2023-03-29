import * as DB from '../DBService';

export const saveMeterReading = (data:any, callBack:any) => {
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'METER_READING',
                    columns: `user_id,readingType,Creation_date,branch_id,longitude,
                    latitude,reader_value,remark,is_sync`,
                    values: '?,?,?,?,?,?,?,?,?',   //9
                    params: [
                        data[i].user_id,      //1
                        data[i].readingType,        //2
                        data[i].Creation_date,     //3
                        data[i].branch_id,      //4
                        data[i].longitude,      //5
                        data[i].latitude,      //6
                        data[i].reader_value,      //7
                        data[i].remark,      //8
                        data[i].is_sync,      //9
                    ],
                   primaryKey: '_ID',
                   subQuery: `user_id = EXCLUDED.user_id,
                   readingType = EXCLUDED.readingType,
                    Creation_date = EXCLUDED.Creation_date,
                   branch_id = EXCLUDED.branch_id,longitude = EXCLUDED.longitude,
                   latitude =EXCLUDED.latitude,reader_value=EXCLUDED.reader_value
                   is_sync = EXCLUDED.is_sync,remark =EXCLUDED.remark`,
                },
            ],
            (res:any, err:any) => {
                callBack(res, err);
            },
        );
    }
};


export const getLastMeterReadingValueType = (callBack:any) => {
    DB.searchData(
       "select ifnull(readingType,'')as readingType,ifnull(reader_value,'0')as reader_value,Creation_date from METER_READING order by  _ID desc LIMIT 1",
        [],
        (resp, err) => {
            callBack(resp, err);
            
        },
    );

}

