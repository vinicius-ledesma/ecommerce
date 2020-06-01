import { api } from './api';
import { local } from './local';

const selectBackEnd = "check";

function daoFactory() {
    if(selectBackEnd === "check"){
        return api.online().then((online) => {
            if (online) {
                return api;
            }
            return local;
        })
    }
    return new Promise((resolve) => {
        if(selectBackEnd === "api"){
            resolve(api);
        };
        resolve(local);
    });
}

export default daoFactory;
