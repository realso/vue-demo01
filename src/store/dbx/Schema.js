class Schema {
    // 构造
    constructor(scmString){
        this.scmString = scmString;
        this.scmName="";
        this.table = "";
        this.fields=[];
        this.fld={};
    }

    Parse(scmString){
         // 按照字符串初始化数据模型 V4.0
         var str = scmString;
         // 开始解析Modal
         // 按照[]分割为三段
         var i1 = str.indexOf(']');
         var ref = str.substr(1, i1 - 1);
         // 分析处理引用关系
         var refs = ref.split("|");
         this.subs = {};
         for (var k = 0; k < refs.length && refs[k].length > 0; k++) {
             var sub = {};
             var or = refs[k].split(";");
             for (var j = 0; j < or.length && or[j].length > 0; j++) {
                 var r = or[j].split(":");
                 sub[r[0]] = r[1];
             }
             if (sub["fm"]) this.subs[sub["fm"]] = sub;
         }
         var i2 = str.indexOf(']', i1 + 2);
         // 整个数据模型的信息
         var modalInfo = str.substr(i1 + 2, i2 - i1 - 2).split(';');
         for (var k = 0; k < modalInfo.length; k++) {
             if (modalInfo[k].length > 0) {
                 var om = modalInfo[k].split(':');
                 if ('m' == om[0]) this.table = om[1];
                 if ('n' == om[0]) this.scmName = om[1];
             }
         }
         // 字段的信息                
         var i3 = str.indexOf(']', i2 + 2);
         var fieldInfo = str.substr(i2 + 2, i3 - i2 - 2);
         var fields = fieldInfo.split('|');
         for (var k = 0; k < fields.length; k++) {
             // 一个字段
             if (fields[k].length > 0) {
                 var ff = fields[k].split(';');
                 var fld = new Field();
                 fld.schema = this;
                 fld.Parse(fields[k]);
                 this.fld[fld.fldname] = fld;
                 if (0 != fld.notVirtual) {
                     this.field.push(fld.fldname);
                 }
                 this.fieldAll.push(fld.fldname);
             }
         }
    }

    getField(){
    }
}
export {Schema};