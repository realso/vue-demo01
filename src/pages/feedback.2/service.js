import db from "@/api/db";
const doCall = function(param) {
    const api = { "namespace": "GJ.EBZ.RV", "class": "FDBK", "method": "DoExecute", params: [param] };
    return db.call(api);
}
const getAddData = function(param) {
    param["TYPE"] = "addData";
    return doCall(param);
}

const saveData = function(param) {
    param["TYPE"] = "save";
    return doCall(param);
}

const openData = function(param) {
    param["TYPE"] = "loadData";
    return doCall(param);
}

export { getAddData, saveData, openData }