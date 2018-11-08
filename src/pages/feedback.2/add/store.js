import Store from "@/store"
import { mapState } from 'vuex'
import { DataTable } from "@/store/dbx/DataTable";
import { getAddData, saveData, openData } from "../service";

const Constants = {
    "STORE_NAME": "feedback-add",
    "F_INITDATA": "initData",
    "P_MAIN": "main",
    "P_DTS": "dts",
}
const state = {
    params: { ACTION: "", SNODEID: "", FDBKTYPEID: "" },
    dt: {
        [Constants.P_MAIN]: new DataTable(Constants.P_MAIN, "TMH_FDBK_M"),
        "dts": new DataTable("dts", "TMH_FDBKDTS_M"),
        "imgdts": new DataTable("imgdts", "TBS_VISITIMG")
    }
}
const mutations = {
    [Constants.F_INITDATA]: function(state) {
        this.dt["main"].data = {};
    },
    "setValue": function(state, { path, field, value, idx }) {
        state.dt[path].setValue(field, value, idx);
    },
    "setEmp": function(state, { path, item, idx }) {
        const dt = state.dt[path];
        dt.setValue("MKEMPID", item["EMPID"], idx);
        dt.setValue("MKEMPID.EMPCODE", item["EMPCODE"], idx);
        dt.setValue("MKEMPID.EMPNAME", item["EMPNAME"], idx);
    },
    "addEmp": function(state, { path, item }) {
        let vitem = {};
        vitem["EMPID"] = item["EMPID"];
        vitem["EMPID.EMPCODE"] = item["EMPCODE"];
        vitem["EMPID.EMPNAME"] = item["EMPNAME"];
        state.dt[path].add(vitem);
    },
    "delEmp": function(state, { index }) {
        state.dt["dts"].del(index);
    },
    "setParams": function(state, params) {
        state.params = params;
    }
}

const actions = {
    add: function({
        state
    }, param) {
        state.dt["main"].initData([]);
        state.dt["dts"].initData([]);
        state.dt["imgdts"].initData([]);
        if (param.SNODEID) {
            return getAddData(param).then(function(data) {
                const {
                    data: {
                        ADTS: {
                            items: items1
                        },
                        AMAIN: {
                            items: items2
                        }
                    }
                } = data;
                items2.map(function(item) {
                    state.dt["main"].add(item)
                });
                items1.map(function(item) {
                    state.dt["dts"].add(item)
                });
            })
        } else {
            state.dt["main"].add();
        }
    },
    delete: function() {},
    save: function({
        state
    }) {
        const main = state.dt["main"];
        const dts = state.dt["dts"];
        const imgdts = state.dt["imgdts"];
        let param = {};
        param["MAIN"] = main.getXML();
        param["DTS"] = dts.getXML();
        param["IMGDTS"] = imgdts.getXML();
        return saveData(param).then(function(data) {
            const {
                data: {
                    DTS: {
                        items: items1
                    },
                    MAIN: {
                        items: items2
                    }
                }
            } = data;
            main.initData(items2);
            dts.initData(items1);
        });
    },
    open: function({ state }, param) {
        const main = state.dt["main"];
        const dts = state.dt["dts"];
        const imgdts = state.dt["imgdts"];
        return openData(param).then(function(data) {
            const {
                data: {
                    DTS: {
                        items: items1
                    },
                    MAIN: {
                        items: items2
                    }
                }
            } = data;
            main.initData(items2);
            dts.initData(items1);
        });
    }
}
Store.registerModule(Constants.STORE_NAME, {
    namespaced: true,
    state,
    mutations,
    actions
});

const mapGetters = function(path, aFields) {
    aFields = aFields || [];
    let dt = state.dt[path];
    return dt.bindField(aFields);
}

export { mapState, mapGetters, Constants };