export default class DataResponseList {
    private status : number;
    private message : string;
    private total : number;
    private data : Array<any> | any
    constructor(status : number,message : string,total: number, data : Array<any> | any){
        this.status = status;
        this.message = message;
        this.total = total;
        this.data = data;
    }
}