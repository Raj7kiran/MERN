import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router();

//congfig for multer
const storage = multer.diskStorgae({
	destination(req, file, cb){
		cb(null, 'uploads/')
	},
	filename(req, file, cb){
		cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.orignalname)}`)
	}
})

function checkFileType(file, cb){
	const filetypes = /jpeg|jpg|png/
	const extname = filetypes.test(path.extname(file.orignalname).toLowerCase())
	const mimetype = filetypes.test(file.mimetype)

	if(extname && mimetype){
		return cb( null, true)
	} else{
		cb('Images Only')
	}
}

const upload = multer({
	storage,
	fileFilter : function(req, file, cb ) {
		checkFileType(file, cb)
	}
})


router.post('/', upload.single('image'), (req, res) => {
	res.send(`/${req.file.path}`)
})


export default router