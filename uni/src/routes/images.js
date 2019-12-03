var express = require('express');
var Image = require('../models/image');
var Profile = require('../models/profile')
var Account = require('../models/account')
var router = express.Router();
const multer = require('multer');
const path = require('path');
const images = require('../lib/imageHandler');
const student = require('../lib/studentHandler')
const fs = require('fs');

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    console.log('authenticating', req.session)
	if (req.session.user) {
        console.log(req.session.user)
		Account.findById(new ObjectID(req.session.user)).then((user) => {
			if (!user) {
				return Promise.reject()
			} else {
				req.user = user
				next()
			}
		}).catch((error) => {
			res.status(401).send("Unauthorized", error)
		})
	} else {
		res.status(401).send("Unauthorized page")
	}
}



// set the storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, 'public', 'uploads'));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Images Only!');
    }
  }

  // init upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 100
    },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});


// stores image in uploads folder using multer and creates a reference to the file
router.route("/all")
    .post(upload.single('imageData'), (req, res, next) => {
        console.log("POSTING")
        const path = fs.readFileSync(req.file.path).toString('base64')
        const newImage = new Image({
            email: req.body.email,
            id: req.body.id,
            imageName: req.body.imageName,
            imageData: req.file,
            type: req.body.type,
            path: path
        });

        if (req.body.type === 'profilepic') {
            // update student profile field
            Account.findOne({"email": req.body.email}).then((student) => {
                student.profilePicture = path
                student.save().then((result) => {
                    // console.log(result)
                }).catch((err) => {
                    console.log(err);
                    next(err);
                })
            }).catch((error) => {
                console.warn('WARN: This email is not correct!')
                res.send({success:false})
            })
        }
        console.log(newImage)

        newImage.save()
            .then((result) => {
                // console.log(result);
                res.status(200).json({
                    success: true,
                    document: result,
                    path: path
                });
            })
            .catch((err) => next(err));
    });

router.get('/all', (req, res) => {
    const email = req.session.email
    console.log(email)
    if (email) {
        images.getImagesByEmail(email, res)
    } else {
        res.sendFile(__dirname + '/permDenied.html')
    }
})

router.get('/all/:id', (req, res) => {
    const id = req.params.id;
    console.log("IMAGE GET BY ID: " + id)
    if (id) {
        images.getImagesById(id, res)
    } else {
        res.sendFile(__dirname + '/permDenied.html')
    }
})

module.exports = router;