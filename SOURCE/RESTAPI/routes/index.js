var express = require('express');
var router = express.Router();
var Authen = require("../controllers/API/Authentication")
var ConversationController = require("../controllers/API/ConversationController")
var FeeController = require("../controllers/API/FeeController")
var LocationController = require("../controllers/API/LocationController")
var MessengerController = require("../controllers/API/MessengerController")
var PlaceController = require("../controllers/API/PlaceController")
var PostController = require("../controllers/API/PostController")
var StopController = require("../controllers/API/StopController")
var TripController = require("../controllers/API/TripController")
var UserController = require("../controllers/API/UserController")

/* HomePage */
router.get('/', function(req, res, next) {
//  clearres.send("./authen/login");
});
/* Authentication */
router.post('/authen/login',Authen.login,function(req, res, next) {});
router.post('/authen/logout',Authen.login,function(req, res, next) {});
router.post('/authen/check',Authen.check_token,function(req, res, next) {});
/*Fee*/
router.get('/fee/all', FeeController.SelectAllFee, function(req, res, next) {});
router.get('/fee/:id', FeeController.SelectOneFee, function(req, res, next) {});
router.post('/fee/', FeeController.CreateFee, function(req, res, next) {});
router.put('/fee/:id', FeeController.UpdateFee, function(req, res, next) {});
router.delete('/fee/:id', FeeController.DeleteFee, function(req, res, next) {});
/*Location*/
router.get('/location/all', LocationController.SelectAllLocation, function(req, res, next) {});
router.get('/location/:id', LocationController.SelectOneLocation, function(req, res, next) {});
router.post('/location/', LocationController.CreateLocation, function(req, res, next) {});
router.put('/location/:id', LocationController.UpdateLocation, function(req, res, next) {});
router.delete('/location/:id', LocationController.DeleteLocation, function(req, res, next) {});
/*Place*/
router.get('/place/all', PlaceController.SelectAllPlace, function(req, res, next) {});
router.get('/place/:id', PlaceController.SelectOnePlace, function(req, res, next) {});
router.post('/place/', PlaceController.CreatePlace, function(req, res, next) {});
router.put('/place/:id', PlaceController.UpdatePlace, function(req, res, next) {});
router.delete('/place/:id', PlaceController.DeletePlace, function(req, res, next) {});
/*Post*/
router.get('/post/all', PostController.SelectAllPost, function(req, res, next) {});
router.get('/post/:id', PostController.SelectOnePost, function(req, res, next) {});
router.post('/post/', PostController.CreatePost, function(req, res, next) {});
router.put('/post/:id', PostController.UpdatePost, function(req, res, next) {});
router.delete('/post/:id', PostController.DeletePost, function(req, res, next) {});
/*Stop*/
router.get('/stop/all', StopController.SelectAllStop, function(req, res, next) {});
router.get('/stop/:id', StopController.SelectOneStop, function(req, res, next) {});
router.post('/stop/', StopController.CreateStop, function(req, res, next) {});
router.put('/stop/:id', StopController.UpdateStop, function(req, res, next) {});
router.delete('/stop/:id', StopController.DeleteStop, function(req, res, next) {});
/*Trip*/
router.get('/Trip/all', TripController.SelectAllTrip, function(req, res, next) {});
router.get('/Trip/:id', TripController.SelectOneTrip, function(req, res, next) {});
router.post('/Trip/', TripController.CreateTrip, function(req, res, next) {});
router.put('/Trip/:id', TripController.UpdateTrip, function(req, res, next) {});
router.delete('/Trip/:id', TripController.DeleteTrip, function(req, res, next) {});
/**User */
router.post('/users/')
module.exports = router;

