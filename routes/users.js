const authenticate = require('../authenticate');
const User = require('../models/user');
var express = require('express');
var router = express.Router();
const passport = require('passport');
const cors = require('./cors');

/* GET users listing - Admin only */
router.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    User.find()
    .then(users => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    })
    .catch(err => next(err));
});

router.post('/signup', cors.corsWithOptions, (req, res) => {
    const user = new User({ username: req.body.username });
    User.register(user, req.body.password)
    .then(registeredUser => {
        if (req.body.firstname) {
            registeredUser.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
            registeredUser.lastname = req.body.lastname;
        }
        return registeredUser.save();
    })
    .then(() => {
        passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registration Successful!' });
        });
    })
    .catch(err => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
    });
});

router.post('/login', cors.corsWithOptions, passport.authenticate('local'), (req, res) => {
    const token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, token: token, status: 'You are successfully logged in!' });
});

module.exports = router;







// const authenticate = require('../authenticate');
// const User = require('../models/user'); // ← ADD THIS LINE
// var express = require('express');
// var router = express.Router();
// const passport = require('passport');
// const cors = require('./cors');

// /* GET users listing - Admin only */
// router.get('/', authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
//     User.find()
//     .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
//     .then(users => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(users);
//     })
//     .catch(err => next(err));
// });

// router.post('/signup', (req, res) => {
//     const user = new User({ username: req.body.username });
//     User.register(user, req.body.password)
//     .then(registeredUser => {
//         if (req.body.firstname) {
//             registeredUser.firstname = req.body.firstname;
//         }
//         if (req.body.lastname) {
//             registeredUser.lastname = req.body.lastname;
//         }
//         return registeredUser.save();
//     })
//     .then(() => {
//         passport.authenticate('local')(req, res, () => {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json({ success: true, status: 'Registration Successful!' });
//         });
//     })
//     .catch(err => {
//         res.statusCode = 500;
//         res.setHeader('Content-Type', 'application/json');
//         res.json({ err: err });
//     });
// });

// router.post('/login', passport.authenticate('local'), (req, res) => {
//     const token = authenticate.getToken({_id: req.user._id});
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'application/json');
//     res.json({ success: true, token: token, status: 'You are successfully logged in!' });
// });

// module.exports = router;











// const authenticate = require('../authenticate');
// var express = require('express');
// var router = express.Router();

// const passport = require('passport');

// // /* GET users listing. */
// // router.get('/', function (req, res, next) {
// //   res.send('respond with a resource');
// // });


// /* GET users listing. */
// router.get('/', authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
//     User.find()
//     .then(users => req.status(200).json(users))
//     .catch(err => next(err))
// });




// router.post('/signup', (req, res) => {
//     const user = new User({ username: req.body.username });

//     User.register(user, req.body.password)
//         .then(registeredUser => {
//             if (req.body.firstname) {
//                 registeredUser.firstname = req.body.firstname;
//             }
//             if (req.body.lastname) {
//                 registeredUser.lastname = req.body.lastname;
//             }
//             return registeredUser.save();
//         })
//         .then(() => {
//             passport.authenticate('local')(req, res, () => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json({ success: true, status: 'Registration Successful!' });
//             });
//         })
//         .catch(err => {
//             res.statusCode = 500;
//             res.setHeader('Content-Type', 'application/json');
//             res.json({ err: err });
//         });
// });






// // router.post('/signup', (req, res) => {
// //   User.register(
// //     new User({ username: req.body.username }),
// //     req.body.password,
// //     err => {
// //       if (err) {
// //         res.statusCode = 500;
// //         res.setHeader('Content-Type', 'application/json');
// //         res.json({ err: err });
// //       } else {
// //         passport.authenticate('local')(req, res, () => {
// //           res.statusCode = 200;
// //           res.setHeader('Content-Type', 'application/json');
// //           res.json({ success: true, status: 'Registration Successful!' });
// //         });
// //       }
// //     }
// //   );
// // });

// router.post('/login', passport.authenticate('local'), (req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'application/json');
//   res.json({ success: true, status: 'You are successfully logged in!' });
// });



// module.exports = router;
