const UserModel = require('../models/user.model')
const fs = require('fs')
const { promisify } = require('util')
const pipeline = promisify(require('stream').pipeline)
const { uploadErrors } = require('../utils/errors.utils')

module.exports.uploadProfile = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType !== "image/jpeg"&&
      req.file.detectedMimeType !== "image/jpg" &&
      req.file.detectedMimeType !== "image/png"
    )
      throw Error('invalid file')
     
      if (req.file.size > 50000000) throw Error('Max size')
  } catch (err) {
      const errors = uploadErrors(err)
      return res.status(201).json({errors })
  }
  const fileName = req.body.name + ".jpg";

  await pipeline(
      req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/profil/${fileName}`
        )
  )

  try {
    await UserModel.findByIdAndUpdate(
        req.body.userId,
        {$set : {picture : "./uploads/profil/" + fileName }},
        {new : true, upsert : true},
        (err, docs) => {
            if (!err) return res.send(docs)
            else return res.status(400).send({ message: err})
        }
    )
  } catch(err) {
    return res.status(400).send({ message: err })
  }
};
