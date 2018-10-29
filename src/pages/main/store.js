import Store from "../../store"
const state = {
    title:"测试",
    dt:{
        "main":{scm:"",data:{title:"123"}},
        "dts1":{scm:"",data:[]},
        "dts2":{scm:"",data:[]}
    }
}
const mutations = {
  "initData": function (state) {
  },
  "setValue":function(state,{path,field,idx}) {
  }
}
const getters = {
    getValue: (state, getters) => (path,field,idx) => {
       idx = idx||0;
       //debugger;
       let items = state.dt[path].data;
       let ret = "";
       if(items.length>0){
            ret = items[idx][field];
       }
       if(typeof(items.length)=="undefined"){
          ret = items[field];
          if(typeof(ret) =="undefined"){
            let robj = {};
            robj[field] = "";
            state.dt[path].data = Object.assign({}, items, robj)
          }
       }
       
       return ret;
    }
}
const actions = {
}
Store.registerModule("main",{
  namespaced: true,
  state,
  mutations,
  getters,
  actions
});

const mapGetters =function(path,aFields){
  aFields=aFields||['title'];
  let ret = {};
  for(let i=0,field;i<aFields.length;i++){
    field = aFields[i];
    let v = state.dt[path].data[field];
    if(typeof(v) =="undefined"){
      let robj = {};
      robj[field] = "";
      state.dt[path].data = Object.assign({}, state.dt[path].data, robj)
    }
    ret[field] = function(){
      return  state.dt[path].data[field];
    }
  }
  return ret;
}

export {mapGetters};
