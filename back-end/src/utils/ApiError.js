class ApiError extends Error{
    constructor(statusCode, message="Something Went Wrong", errors=[], stack="", data={}){
        
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.data= data;
        this.success = false;

        if (stack) {
            this.stack = stack;
        } else{
            Error.captureStackTrace(this, this.constuctor);
        }
    }
}
export default ApiError;