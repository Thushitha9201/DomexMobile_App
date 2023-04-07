import * as DB from '../DBService';

export const saveLogin = (data, callBack) => {
    DB.indateData(
        [
            {
                table: 'LOGIN',
                columns: `loginId,userID,date,status`,
                values: '?,?,?,?,?,?,?,?,?',
                params: [
                    data.loginId,
                    data.userID,
                    data.startDate,
                    data.endDate,
                    data.itemDescription,
                    data.content,
                    data.assignTo,
                    data.priority,
                    data.status,
                ],
                primaryKey: 'loginId',
                subQuery: `userID = EXCLUDED.userID,
                date = EXCLUDED.date, endDate = EXCLUDED.endDate
                status = EXCLUDED.status`,
            },
        ],
        (res, err) => {
            callBack(res, err);
        },
    );
};

export const deleteAllLogin = (callBack) => {

    DB.deleteData(
        [
            {
                table: 'LOGIN',
                query: '',
                params: [],
            },
        ],
        (resp, err) => {
            callBack(resp, err);
        },
    );

};

export const getLoginByUserId = (userID, callBack) => {
    DB.searchData(
        'SELECT * FROM LOGIN WHERE userID=?',
        [userID],
        (resp, err) => {
            callBack(resp, err);
        },
    );
}

export const getTableNames = (callBack:any) => {
    DB.searchData(
       "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name",
        [],
        (resp, err) => {
            callBack(resp, err);
            
        },
    );

}

