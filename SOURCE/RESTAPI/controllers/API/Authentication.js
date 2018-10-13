var User = require("../../models/User")
var jwt    = require('jsonwebtoken');
var secret = require('../../config/secret.js');
var bcrypt = require('bcryptjs');
// Ten API: Check Token _ Kiem tra token co dung khong
// Param  : @token: Token cua mot user
exports.check_token = function(req, res) {
    var token = req.body.token.toString();
    jwt.verify(token, secret.value, function(err, decoded) {
        console.log("okkkkk")
        return true;
      });
    return false;
};

// Ten API: Login _ Dang nhap vao he thong
// Param  : @email: Email cua nguoi dung
//          @password Mat khau truy cap, se duoc bcrypt truoc khi so sanh
exports.login = function(req, res) {
    var email = req.body.email.toString();
    var password = bcrypt.hashSync(req.body.password.toString(), 8);
    console.log(password);
    User.findOne({ where: {email: email} }).then(user => {
        console.log(email);
        if (!user) {
            res.status(404).send({ auth: 'User is not exist', token: 'false' });
        } else 
            var token = jwt.sign({ id: user.email }, secret.value, {
                expiresIn: 86400 // expires in 24 hours
              });
            res.status(200).send({ auth: true, token: token });
        } 
    )
};