const User = require("../../models/user")

const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body
  const { userId, mail } = req.user

  if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
    return res.status(409).send(
      'Sorry you can`t become friend with yourself'
    )
  }

  const targetUser = await User.findOne({
    mail: targetMailAddress.toLowerCase()
  })

  if (!targetUser) {
    return res.status(404).send(
      `Friend of ${targetMailAddress} has not been found.`
    )
  }

  return res.send('Controller is working')
}

module.exports = postInvite