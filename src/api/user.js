import db from "./db";

export function login(userInfo){
    userInfo["tp"] = "login";
    return db.postData(userInfo);
}

export function loadMenu(){
    let para = {};
    para["tp"] = "loadMenu";
    return db.postData(para);
}