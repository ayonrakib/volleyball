export class ApiError extends Error{
    constructor(public code: number, message: string){
        console.log("message in the constructor of ApiError: ",message)
        super(message);
    }

    static formErrorFormat(errorCode:number, errorMessage: string){
        console.log("error message in static formErrorFormat method in exception file: ",errorMessage)
        let error = null;

        if(errorCode !== null) {
            
            error = new ApiError(errorCode, errorMessage);
            // console.log("error obj in static formErrorFormat method in exception file: ",error)
        }
        
        return error;
    }
}
