import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: true
    },
    avatar: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', async function () {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
    console.log("No esquema " + this.password);
});
 


/*UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
    await bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) {
        console.log("something went wrong for hashing");
      }
      if (hash) {
        console.log(hash);
        this.password = hash;
      }
    });
  });*/

  UserSchema.methods.comparePassword = async function (yourPassword) {
    return await bcrypt.compare(yourPassword, this.password);  
  }
const User = mongoose.model('User', UserSchema);

export default User;    