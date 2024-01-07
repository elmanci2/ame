export async function upload_image(req, res) {
  const uploadedFile =req.files;
  console.log(uploadedFile);
  return res.send({
    message: "imagen cargada correctamente",
  });
}
