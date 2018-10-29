class Field {
  // 构造
  constructor(args) {
    //字段名  
    this.fldname = "";
    //类型
    this.type = "";
    //空
    this.isNull = "";
    //显示名
    this.showName = "";
    //长度
    this.length = "255";
    //默认值
    this.defaultVal = "";
    //非空否
    this.notVirtual = "";
    //主键否
    this.isKey = "";
    //精度
    this.cm = "";
    //引用数据模型
    this.refModal = "";
  }

  Parse(strField) {
    var ff = strField.split(';');
    this.notVirtual = 1;
    for (var k2 = 0; k2 < ff.length; k2++) {
      if (ff[k2].length > 0) {
        var attrName = ff[k2].split(":")[0];
        var attrValue = ff[k2].split(":")[1];
        switch (attrName) {
          case 'f':
            this.fldname = attrValue;
            break;
          case 't':
            this.type = attrValue == 1 ? 'i' : (attrValue == 2 ? 's' : (attrValue == 3 ? 'd' : (attrValue == 4 ? 'f' : (attrValue == 5 ? '5' : (attrValue == 6 ? 'm' : (attrValue == 7 ? 'b' : ('s')))))));
            break;
          case 'n':
            this.isNull = attrValue;
            break;
          case 'l':
            this.length = attrValue;
            break;
          case 'd':
            this.defaultVal = attrValue;
            break;
          case 'k':
            this.isKey = attrValue;
            break;
          case 'x':
            this.showName = attrValue;
            break;
          case 'r':
            this.refModal = attrValue;
            break;
          case 'cm':
            this.cm = attrValue;
            break;
          default:
            this[attrName] = attrValue;
            break;
        }
      }
    }
  }
}
export {
  Field
};
