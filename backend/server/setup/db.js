import { createPool } from "mysql";

const {
    LOCAL_DB_HOST,
    LOCAL_DB_USER,
    LOCAL_DB_PASS,
    LOCAL_DB_NAME,
    } = process.env

const localConfig = {
    host: LOCAL_DB_HOST,
    user: LOCAL_DB_USER,
    password: LOCAL_DB_PASS,
    database: LOCAL_DB_NAME
}

const connection = createPool(localConfig);

export const doQuery = async (queryToDo) => {
    let promise = new Promise((resolve, reject) => {
        let query = queryToDo;
        connection.query(query, function (err, result) {
            if (err) throw err;
            resolve(result);
        });
    })
    return promise.then((result) => {
        return result;
    })
}
export const doQueryParams = async (queryToDo, array) => {
    let promise = new Promise((resolve, reject) => {
        let query = queryToDo;
        connection.query(query, array, function (err, result) {
            if (err) throw err;
            resolve(result);
        });
    })
    return promise.then((result) => {
        return result;
    })
}

export default connection;