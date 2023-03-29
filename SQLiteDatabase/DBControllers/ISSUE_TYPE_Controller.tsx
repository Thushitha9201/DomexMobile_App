import * as DB from '../DBService';

export const SAVE_ISSUE_TYPE = (data:any, callBack:any) => {
    var response :any;
    for (let i = 0; i < data.length; ++i) {
        DB.indateData(
            [
                {
                    table: 'ISSUE_TYPE',
                    columns: `id,collection_type,issue_name,is_act,is_deleted`,
                    values: '?,?,?,?,?',   //5
                    params: [
                        data[i].id,      //1
                        data[i].collection_type,      //2
                        data[i].issue_name,        //3
                        data[i].is_act,     //4
                        data[i].is_deleted,      //5
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
                        console.log(" ISSUE_TYPE iwara unaaaaaaaa");

                    }else if(i == 0){
            
                        response =1;
                        callBack(response);
                        console.log("  ISSUE_TYPE first time .....");
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
export const getIssuesDataForSelectModule = (typeOfmodule: any,callBack:any) => {
    DB.searchData(
        'SELECT * FROM ISSUE_TYPE where collection_type =? and is_act=1 and is_deleted=0',
        [typeOfmodule],
        (resp:any, err:any) => {
            callBack(resp, err);
        },
    );
  }
