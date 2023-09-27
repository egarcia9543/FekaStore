const supabase = require("../../config/supabase");
const clientData = require("../../data/clientes.data");

exports.uploadPicture = async (bucketName, filePath, fileData, options) => {
  const {error} = await supabase.storage
      .from(bucketName)
      .upload(filePath, fileData, options);
  if (error) {
    return {error};
  }
  console.log(`Subido a ${bucketName}/${filePath}`);
};

