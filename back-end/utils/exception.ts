export class ApiError extends Error{
    constructor(public code: number, message: string){
        super(message);
    }

    static formErrorFormat(errorCode:number, errorMessage: string){
        let error = null;

        if(errorCode !== null) {

            error = new ApiError(errorCode, errorMessage);

        }
        
        return error;
    }
}
