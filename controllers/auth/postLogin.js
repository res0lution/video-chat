const User = require("../../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const postLogin = async (req, res) => {
  try {
    const { mail, password } = req.body

    const user = await User.findOne({ mail: mail.toLowerCase() })

    if (user && bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          userId: user._id,
          mail
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: '24h'
        }
      )

      return res.status(201).json({
        userDetails: {
          mail: user.mail,
          token,
          username: user.username
        }
      })
    }


    return res.status(400).send("Invalid credentials. Please try again.")
  } catch (err) {
    return res.status(500).send("Error occured. Please try again.")
  }
};

module.exports = postLogin;
