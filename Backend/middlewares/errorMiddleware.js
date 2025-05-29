class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}




export const errorMiddleware=(err,req,res,next)=>{
    err.message=err.message || "Internal Server Error",
    err.statusCode=err.statusCode ||500;
    if(err.code === 11000){ //code is a error type part
        const message=`Duplication ${Object.keys(err.keyValue)} Entered`;
        err=new ErrorHandler(message,400);
    }
    if(err.name === "JsoWebTokenError"){  //name is a error type part
         const message="Json Web Token is Invalid,Try Again!";
         err=new ErrorHandler(message,400);
    }
    if(err.name === "TokenExpiredError"){  //name=TokenExpiredError  is a error type part
        const message="Json Web Token is Expired,Try Again!";
        err=new ErrorHandler(message,400);
   }
   if(err.name === "CastError"){  //name=CastError(first name me number enter kar me error dega).
    const message=`Invalid ${err.path}`;
    err=new ErrorHandler(message,400);
}

    const errorMessage=err.errors
     ? Object.values(err.errors)
     .map((error)=>error.message)
     .join(" ")
     :err.message;


   return res.status(err.statusCode).json({
    success:false,
    message:errorMessage,
   })
}

export default ErrorHandler;