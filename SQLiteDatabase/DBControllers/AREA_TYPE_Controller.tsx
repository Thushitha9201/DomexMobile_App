import * as DB from '../DBService';

export const SAVE_AREA_TYPE = (data:any, callBack:any) => {
    var response:any;
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'AREA_Type',
                    columns: `id,description,status`,
                    values: '?,?,?',   //5
                    params: [
                        data[i].id,      //1
                        data[i].description,      //2
                        data[i].status,        //3     //5
                    ],
                    primaryKey: 'id',
                },
            ],
            (res:any, err:any) => {
                if(res === 'success'){

                    // console.log(i,"___________Item________________",response);

                    if( i+1 == data.length){
                        response = 3;
            
                        callBack(response);
                        console.log(" AREA_TYPE iwara unaaaaaaaa");

                    }else if(i == 0){
            
                        response =1;
                        callBack(response);
                        console.log("  AREA_TYPE first time .....");
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

export const getAreaTypes= (callBack:any) => {
    DB.searchData(
        " SELECT ifnull(id,'') as id ,"+
        " ifnull(description,'') as description "+
        " FROM AREA_Type where  status=0",
        [],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
  }