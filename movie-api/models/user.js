import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const schema = mongoose.Schema({
  user_name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  role: { type: String, required: true, default: 'USER' },
  password: { type: String, required: true },
});

// generate password before save
schema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

schema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Tutorial = mongoose.model('users', schema);

export default Tutorial;
