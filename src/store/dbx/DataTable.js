class DataTable {
  constructor(path, scm) {
    this.path = path;
    this.idx = 0;
    this.scm = scm;
    this.dataObj = {};
    this.data = [];
    this._changeInfo = {
      _rawData: [],
      _rawIdxData: {},
      _addIdxRows: {},
      _modifyIdxRows: {},
      _deleteIdxRows: {}
    }
  }

  initData(data) {
    this.idx = 0;
    this.data=[];
    this._changeInfo = {
      _rawData: [],
      _rawIdxData: {},
      _addIdxRows: {},
      _modifyIdxRows: {},
      _deleteIdxRows: {}
    }
    data.map(item => {
      item["_idx_"] = this.idx++;
      item["_type_"] = "old";
      this._changeInfo._rawIdxData[item["_idx_"]] = item;
      this.data.push(Object.assign({}, this.dataObj, item));
    })
    this._changeInfo._rawData = data;
  }

  getValue(field, idx) {
    let ret = "";
    idx = idx || 0;
    if (idx > this.data.length) {
      throw new Error("DataTable.getValue太长了");
    }
    if (this.data.length > 0) {
      ret = this.data[idx][field];
    }
    return ret;
  }

  setValue(field, value, idx) {
    let item = {};
    idx = idx || 0;
    if (this.data.length == 0) {
      this.add(item);
    }
    if (idx > this.data.length) {
      throw new Error("DataTable.getValue太长了");
    } else {
      item = this.data[idx];
    }
    item[field] = value;

    //放入修改记录
    const titem = this._changeInfo._rawIdxData[item["_idx_"]];
    if(titem&&Object.keys(titem).includes(field)){
       if(titem[field]!=value){
         this._changeInfo._modifyIdxRows[item["_idx_"]] = item;
       }
    }
  }

  getValues(field) {
    return this.data.map(function (item) {
      return item[field];
    })
  }

  add(item) {
    item = Object.assign({}, this.dataObj, item);
    this.data.push(item);
    item["_idx_"] = this.idx++;
    item["_type_"] = "new";
    this._changeInfo._addIdxRows[item["_idx_"]] = item;
  }

  del(index) {
    index = index || 0;
    if (index < 0 && index > this.data.length) {
      throw new Error("DataTable.del:index不正确");
    }
    let item = this.data.splice(index, 1)[0];
    if (item["_type_"] == "new") {
      delete this._changeInfo._rawIdxData[item["_idx_"]];
    } else {
      this._changeInfo._deleteIdxRows[item["_idx_"]] = item;
    }
  }

  count() {
    return this.data.length;
  }

  bindField(aFields) {
    aFields = aFields || [];
    let ret = {};
    let _this = this;
    for (let i = 0, field; i < aFields.length; i++) {
      field = aFields[i];
      let v = this.dataObj[field];
      if (typeof (v) == "undefined") {
        let robj = {};
        robj[field] = "";
        this.dataObj = Object.assign({}, this.dataObj, robj)
      }

      ret[field] = {
        get() {
          return _this.getValue(field);
        },
        set(value) {
          _this.setValue(field, value)
        }
      }
    }
    ret[this.path] = function () {
      return _this.data;
    };
    return ret;
  }

  getXML() {
    let fieldAll = [];
    Array.forEach(this.data, function (item) {
      fieldAll = fieldAll.concat(Object.keys(item));
    })
    Array.forEach(this._changeInfo._rawData, function (item) {
      fieldAll = fieldAll.concat(Object.keys(item));
    })
    fieldAll = Array.from(new Set(fieldAll));
    let strSave = '<?xml version="1.0" encoding="UTF-8"?>';
    let newitems = "";
    let modifyitems = "";
    let delitems = "";
    let rootitem = "<" + this.scm + ' l="u" c="' + fieldAll + '" t="">';

    Array.forEach(Object.keys(this._changeInfo._addIdxRows), (idx) => {
      let item = this._changeInfo._addIdxRows[idx];
      let newitem = "";
      Array.forEach(fieldAll, (field,i) => {
        newitem = newitem + " c" + i + '="' + encodeURIComponent(item[field]) + '"';
      });
      newitems = newitems + "<r" + newitem + "/>";
    });
    newitems = "<a>" + newitems + "</a>";

    Array.forEach(Object.keys(this._changeInfo._modifyIdxRows), (idx) => {
      let item = this._changeInfo._modifyIdxRows[idx];
      let modifyitem = "";
      let titem = this._changeInfo._rawIdxData[idx];
      Array.forEach(fieldAll, (field,i) => {
        modifyitem = modifyitem + " c" + i + '="' + encodeURIComponent(item[field]) + '"' + " oc" + i + '="' + encodeURIComponent(titem[field]) + '"';
      });
      modifyitems = modifyitems + "<r" + modifyitem + "/>";
    });

    Array.forEach(Object.keys(this._changeInfo._rawIdxData), (idx) => {
      let item = this._changeInfo._rawIdxData[idx];
      let modifyitem = "";
      let titem = this._changeInfo._rawIdxData[idx];
      if (!this._changeInfo._modifyIdxRows[idx] && !this._changeInfo._deleteIdxRows[idx]) {
        Array.forEach(fieldAll, (field,i) => {
          modifyitem = modifyitem + " c" + i + '="' + encodeURIComponent(item[field]) + '"' + " oc" + i + '="' + encodeURIComponent(titem[field]) + '"';
        });
        modifyitems = modifyitems + "<r" + modifyitem + "/>";
      }
    });

    modifyitems = "<m>" + modifyitems + "</m>";

    Array.forEach(Object.keys(this._changeInfo._deleteIdxRows), (idx) => {
      let item = this._changeInfo._deleteIdxRows[idx];
      let delitem = "";
      let titem = this._changeInfo._rawIdxData[idx];
      Array.forEach(fieldAll, field => {
        delitem = delitem +  " oc" + i + '="' + encodeURIComponent(titem[field]) + '"';
      });
      delitems = delitems + "<r" + delitem + "/>";
    });
    delitems = "<d>" + delitems + "</d>";
    var sts = newitems + modifyitems + delitems;
    strSave = strSave + rootitem + sts + "</" + this.scm + ">";
    return strSave;
  }

  acceptChange() {
    this.initData(this.data);
  }

  isModify() {
    return Object.keys(this._changeInfo._modifyIdxRows)>0;
  }

}
export {
  DataTable
};
