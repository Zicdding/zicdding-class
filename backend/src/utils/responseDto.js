const setResponseJson = (res, code, message, data = null, err = null) => {
  const result = { code, message };

  if (data !== null) {
    result.data = data;
  }

  if (err !== null) {
    // Error 객체인지 확인하고, Error 객체라면 message를 전달
    result.err = err instanceof Error ? { message: err.message, stack: err.stack } : err;
  }

  res.status(code).json(result);
};

export default setResponseJson;
