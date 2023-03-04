interface ErrorResponseType{
    errorCode: number;
    message: any;
    data : any;
}
export default function ErrorResponse({errorCode, message,data}: ErrorResponseType){
   return {
    errorCode : errorCode ,
    message : message,
    data : data
   }
}