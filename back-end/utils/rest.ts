import  {ApiError}  from "./exception";

export class Response{
    constructor(public data:any | null, public error:ApiError | null){

    }
}