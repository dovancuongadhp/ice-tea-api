export default class DataResponse {
    private status : number;
    private message : string;
    private data : Array<any> | any
    constructor(status : number,message : string,data : Array<any> | any){
        this.status = status;
        this.message = message;
        this.data = data;
    }
}