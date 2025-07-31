const express = require('express');
const Promotion = require('../models/promotion');
const authenticate = require('../authenticate');
const promotionRouter = express.Router();
const cors = require('./cors'); // Add this import

promotionRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200)) // Add this line
.get(cors.cors, (req, res, next) => { // Add cors.cors to GET
    Promotion.find()
    .then(promotions => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => { // Add cors.corsWithOptions to POST
    Promotion.create(req.body)
    .then(promotion => {
        console.log('Promotion Created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => { // Add cors.corsWithOptions to PUT
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => { // Add cors.corsWithOptions to DELETE
    Promotion.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

promotionRouter.route('/:promotionId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200)) // Add this line
.get(cors.cors, (req, res, next) => { // Add cors.cors to GET
    Promotion.findById(req.params.promotionId)
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res,) => { // Add cors.corsWithOptions to POST
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => { // Add cors.corsWithOptions to PUT
    Promotion.findByIdAndUpdate(req.params.promotionId, {
        $set: req.body
    }, { new: true })
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => { // Add cors.corsWithOptions to DELETE
    Promotion.findByIdAndDelete(req.params.promotionId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = promotionRouter;






// const express = require('express');
// const Promotion = require('../models/promotion');
// const authenticate = require('../authenticate');

// const promotionRouter = express.Router();

// promotionRouter.route('/')
// .get((req, res, next) => {
//     Promotion.find()
//     .then(promotions => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(promotions);
//     })
//     .catch(err => next(err));
// })
// .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
//     Promotion.create(req.body)
//     .then(promotion => {
//         console.log('Promotion Created ', promotion);
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(promotion);
//     })
//     .catch(err => next(err));
// })
// .put(authenticate.verifyUser, (req, res) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /promotions');
// })
// .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
//     Promotion.deleteMany()
//     .then(response => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(response);
//     })
//     .catch(err => next(err));
// });

// promotionRouter.route('/:promotionId')
// .get((req, res, next) => {
//     Promotion.findById(req.params.promotionId)
//     .then(promotion => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(promotion);
//     })
//     .catch(err => next(err));
// })
// .post(authenticate.verifyUser, (req, res) => {
//     res.statusCode = 403;
//     res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
// })
// .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
//     Promotion.findByIdAndUpdate(req.params.promotionId, {
//         $set: req.body
//     }, { new: true })
//     .then(promotion => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(promotion);
//     })
//     .catch(err => next(err));
// })
// .delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
//     Promotion.findByIdAndDelete(req.params.promotionId)
//     .then(response => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(response);
//     })
//     .catch(err => next(err));
// });

// module.exports = promotionRouter;





// // const express = require('express');
// // const Promotion = require('../models/promotion');

// // const promotionRouter = express.Router();

// // promotionRouter.route('/')
// // .get((req, res, next) => {
// //     Promotion.find()
// //     .then(promotions => {
// //         res.statusCode = 200;
// //         res.setHeader('Content-Type', 'application/json');
// //         res.json(promotions);
// //     })
// //     .catch(err => next(err));
// // })
// // .post((req, res, next) => {
// //     Promotion.create(req.body)
// //     .then(promotion => {
// //         console.log('Promotion Created ', promotion);
// //         res.statusCode = 200;
// //         res.setHeader('Content-Type', 'application/json');
// //         res.json(promotion);
// //     })
// //     .catch(err => next(err));
// // })
// // .put((req, res) => {
// //     res.statusCode = 403;
// //     res.end('PUT operation not supported on /promotions');
// // })
// // .delete((req, res, next) => {
// //     Promotion.deleteMany()
// //     .then(response => {
// //         res.statusCode = 200;
// //         res.setHeader('Content-Type', 'application/json');
// //         res.json(response);
// //     })
// //     .catch(err => next(err));
// // });

// // promotionRouter.route('/:promotionId')
// // .get((req, res, next) => {
// //     Promotion.findById(req.params.promotionId)
// //     .then(promotion => {
// //         res.statusCode = 200;
// //         res.setHeader('Content-Type', 'application/json');
// //         res.json(promotion);
// //     })
// //     .catch(err => next(err));
// // })
// // .post((req, res) => {
// //     res.statusCode = 403;
// //     res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
// // })
// // .put((req, res, next) => {
// //     Promotion.findByIdAndUpdate(req.params.promotionId, {
// //         $set: req.body
// //     }, { new: true })
// //     .then(promotion => {
// //         res.statusCode = 200;
// //         res.setHeader('Content-Type', 'application/json');
// //         res.json(promotion);
// //     })
// //     .catch(err => next(err));
// // })
// // .delete((req, res, next) => {
// //     Promotion.findByIdAndDelete(req.params.promotionId)
// //     .then(response => {
// //         res.statusCode = 200;
// //         res.setHeader('Content-Type', 'application/json');
// //         res.json(response);
// //     })
// //     .catch(err => next(err));
// // });

// // module.exports = promotionRouter;