const setResponseJson = (res, code, message , data) => {
    let result = {};
    if(data) {
        try{
            JSON.stringify(data);
            result = {
                code : code,
                message : message,
                data : data,
            };
        }catch(err){
            result = {
                code : code,
                message : message,
                data : {err : ''},
            };
        }
    }else{
        result = {
            code : code,
            message : message
        };
    }
    res.status(code).json(result);
}
  

module.exports = setResponseJson;