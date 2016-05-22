import mongoose from 'mongoose'

import GridFS from './gridfs'

const gfs = GridFS()
const ObjectId = mongoose.Types.ObjectId

export function readStream (id) {
  const query = { _id: ObjectId(id) }
  return gfs.createReadStream({ _id: ObjectId(id) })
}

export function writeStream (options = {}) {
  return gfs.createWriteStream({
    filename: options.name,
    content_type: options.type,
    metadata: options.metadata
  })
}

export function findOne (id) {
  const query = { _id: ObjectId(id) }
  return new Promise((resolve, reject) => {
    gfs.files.findOne(query, (err, file) =>
      err ? reject(err) : resolve(file)
    )
  })
}

export function exist (id) {
  const query = { _id: ObjectId(id) }
  return new Promise((resolve, reject) => {
    gfs.exist(query, (err, found) =>
      err ? reject(err) : resolve(found)
    )
  })
}

export function remove (id) {
  const query = { _id: ObjectId(id) }
  return new Promise((resolve, reject) => {
    gfs.remove(query, (err) =>
      err ? reject(err) : resolve()
    )
  })
}
