const setResponseJson = (res, code, message , data) => {
    let result = {
        code : code,
        message : message,
        data : data
    };
    if(data) {
        try{
            JSON.stringify(data);
            result = data;
        }catch(err){
            result.data = {
                code : code,
                message : err.message,
            }
        }
    }
    res.status(code).json(result);
}
  

export default setResponseJson;