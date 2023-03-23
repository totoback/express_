const mongoose = require('mongoose');

const { Schema } = mongoose;

//스키마 설정
const userSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'mongoose-user',
  },
);

module.exports = mongoose.model('User', userSchema);
//밖에서 사용할 때는 대문자 User을 사용하고 userSchema 로 사용
