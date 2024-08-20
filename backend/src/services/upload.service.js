const fs = require('fs');


const process = {
  upload: async (req, res) => {
    try {
      const { originName, filename, mimeType, path } = req.file;
    } catch { }
  }
}


export const uploadService = { process };