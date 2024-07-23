const setResponseJson = (res, code, message, data = {}) => {
    const result = {
        code: code,
        message: message,
        data: data
    };

    res.status(code).json(result);
};

export default setResponseJson;
