import * as DB from '../DBService';

export const SAVE_PACKAGE_BARCODE = (data:any, callBack:any) => {
    var response:any;
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'PACKAGE_BARCODE',
                    columns: `id,package_id,image,barcode_id,is_deleted,is_new,is_synced`,
                    values: '?,?,?,?,?,?,?',   //6
                    params: [
                        data[i].id,      //1
                        data[i].package_id,      //2
                        data[i].image,        //3
                        data[i].barcode_id,     //4
                        data[i].is_deleted,      //5
                        data[i].is_new,      //6
                        data[i].is_synced,      //7
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
                        console.log(" PACKAGE_BARCODE iwara unaaaaaaaa");

                    }else if(i == 0){
            
                        response =1;
                        callBack(response);
                        console.log("  PACKAGE_BARCODE first time .....");
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

