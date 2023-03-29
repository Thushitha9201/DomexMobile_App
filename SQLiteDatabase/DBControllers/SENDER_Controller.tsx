import * as DB from '../DBService';

export const SAVE_SENDER = (data:any, callBack:any) => {
    var response:any;
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'SENDER',
                    columns: `id,sender_type,sender_name,sender_mobile,sender_mobile_alter,
                     sender_address_1,sender_address_2,sender_address_3,
                      is_new,is_synced,audit_user,audit_date,audit_time`,
                    values: '?,?,?,?,?,?,?,?,?,?,?,?,?',   //13
                    params: [
                        data[i].id,      //1
                        data[i].sender_type,      //2
                        data[i].sender_name,        //3
                        data[i].sender_mobile,     //4
                        data[i].sender_mobile_alter,     //5
                        data[i].sender_address_1,        //6
                        data[i].sender_address_2,          //7
                        data[i].sender_address_3,       //8
                        data[i].is_new,       //9
                        data[i].is_synced,         //10
                        data[i].audit_user,        //11
                        data[i].audit_date,      //12
                        data[i].audit_time,          //13
                    ],
                    primaryKey: '_ID',
                },
            ],
            (res:any, err:any) => {
                if(res === 'success'){

                    // console.log(i,"___________Item________________",response);

                    if( i+1 == data.length){
                        response = 3;
            
                        callBack(response);
                        console.log(" Sender iwara unaaaaaaaa");

                    }else if(i == 0){
            
                        response =1;
                        callBack(response);
                        console.log(" Sender first time .....");
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


export const getAllSENDERINFO = (callBack:any) =>{

    DB.searchData(
        //'SELECT * FROM SENDER',

        
        "SELECT ifnull(SENDER.id,'') as id ," +
        " ifnull(SENDER.sender_type,'') as sender_type," +
        " ifnull(SENDER.sender_name,'') as sender_name ," +
        " ifnull(SENDER.sender_mobile,'-') as sender_mobile ," +
        " ifnull(SENDER.sender_address_1,'') as sender_address_1 ," +
        " ifnull(SENDER.sender_address_2,'') as sender_address_2 ," +
        " ifnull(SENDER.sender_address_3,'') as sender_address_3 " +
        " FROM SENDER ",
        [],
        (resp:any, err:any) => {
          //  console.log(" **************  all SENDER ************  " + resp);
            callBack(resp, err);
        },
    );
}

