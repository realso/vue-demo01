class DataTable {
    // 构造
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    toString(){
        return (this.x + "的年龄是" +this.y+"岁");
    }
}
export {DataTable};