const {Router} = require('express');
const authController = require('../controllers/AuthController')
const { requireAuth } = require('../middleware/authmiddleware');
const router = Router();

router.get('/login' , authController.login_get)
router.post('/login' , authController.login_Post)
router.get('/create' , authController.create_get)
router.post('/create', authController.create_Post)


// Losbeat Landing Page
router.get('/' , (req , res) =>{
    res.render('Losbeats');
 })
 // Losbeat Family Page
 router.get('/family' , (req , res) => {
    res.render('Family');
 })
 // Losbeat HomePage
  router.get('/homepage' , (req,res) =>{
    res.render('HomeLanding')
  })
    
  
  // Losbeat Discover Page
  router.get('/discover' , (req , res) => {
     res.render('Discover');
  })
  // Losbeat Subscription Page
  router.get('/subscription' , (req , res) => {
   res.render('Plans');
  })
  // Losbeat Forgot Password
 router.get('/forgotpassword' , (req , res) => {
 res.render('forgotpassword');
 })
 // Reset Password
 router.get('/Resetpassword' , (req , res) => {
res.render('afterforgot');
 })
 // Losbeat Premium Duo Page
 router.get('/duo' , (req , res) => {
 res.render('Duo');
 })
 // Losbeat Premium Page
 router.get('/premium' , (req , res) => {
res.render('purchase');
 })
    // Losbeat Terms And Conditions
 
 
 
module.exports = router;