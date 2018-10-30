class DataTable {
  constructor(path, scm) {
    this.path = path;
    this.idx = 0;
    this.scm = scm;
    this.dataObj = {};
    this.data = [];
    this._changeInfo = {
      _rowData: [],
      _addRows: [],
      _modifyRows: [],
      _deleteRows: []
    }
  }

  initData(data) {

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
  }

  add(item) {
    item = Object.assign({}, this.dataObj, item);
    this.data.push(item);
    item["_idx_"] = this.idx++;
    item["_type_"] = "new";
    this._changeInfo._addRows.push(item);
  }

  del(index) {
    index = index || 0;
    if (index < 0 && index > this.data.length) {
      throw new Error("DataTable.del:index不正确");
    }
    let item = this.data.splice(index, 1)[0];
    if (item["_type_"] != "new") {
      this._changeInfo._deleteRows.push(item);
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
}
export {
  DataTable
};
