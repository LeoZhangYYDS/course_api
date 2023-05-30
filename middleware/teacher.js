const role1 = "teacher";
const role2 = "admin";

function teacher(req, res, next) {
  if (![role1, role2].includes(req.user.role)) {
    return res.status(403).send("Only teacher can make changes on the course.");
  }
  next();
}

module.exports = teacher;
