const express = require('express');
const router = express.Router();
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})

const postFriendInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email().required()
})

router.post(
  '/invite',
  auth,
  validator.body(postFriendInvitationSchema), 
  friendsInvitationsControllers.controllers.postInvite
)

module.exports = router