// 通过邮箱查找用户
const getUserByEmail = async function(email) {
  const userInfo = await User.findOne({
    where: {
      UserEmail: email
    }
  });
  return userInfo;
};

module.exports = {
  getUserById,
  getUserByEmail
};