const role = "admin";
function admin(req, res, next) {
  if (req.user.role !== role) {
    return res.status(403).send("Only admin can make changes on categories");
  }
  next();
}

module.exports = admin;
