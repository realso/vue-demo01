import Store from "@/store"
import {DataTable} from "@/store/dbx/DataTable";
const state = {
  title: "测试",
  dt: {
    "main": new DataTable("main",""),
    "dts": new DataTable("dts","")
  }
}
const mutations = {
  "initData": function (state) {
    this.dt["main"].data = {};
  },
  "setValue": function (state, {
    path,
    field,
    value,
    idx
  }) {
    state.dt[path].setValue(field,value,idx);
  },
  "setEmp": function (state, {
    path,
    item,
    idx
  }) {
    const dt = state.dt[path];
    dt.setValue("EMPID",item["EMPID"],idx);
    dt.setValue("EMPID.EMPCODE",item["EMPCODE"],idx);
    dt.setValue("EMPID.EMPNAME",item["EMPNAME"],idx);
  },
  "addEmp": function (state, {
    path,
    item
  }) {
    let vitem = {};
    vitem["EMPID"] = item["EMPID"];
    vitem["EMPID.EMPCODE"] = item["EMPCODE"];
    vitem["EMPID.EMPNAME"] = item["EMPNAME"];
    state.dt[path].add(vitem);
  },
  "delEmp": function (index) {
    state.dt["dts"].del(index);
  }
}

const actions = {}
Store.registerModule("feedback-add", {
  namespaced: true,
  state,
  mutations,
  actions
});

const mapGetters = function (path, aFields) {
  aFields = aFields || [];
  let dt = state.dt[path];
  return dt.bindField(aFields);
}

export {
  mapGetters
};
