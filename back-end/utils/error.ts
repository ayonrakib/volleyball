function getErrorFormat(errorCode:number, errorMessage:string):{errorCode:number, errorMessage:string}{
    return {
        errorCode: errorCode,
        errorMessage: errorMessage
    }
}

module.exports = getErrorFormat;