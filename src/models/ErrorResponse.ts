interface ErrorResponseType{
    errorCode: number;
    message: string;
    data : any;
}
export default function ErrorResponse({errorCode, message,data}: ErrorResponseType){
   return {
    errorCode : errorCode ,
    message : message,
    data : data
   }
}