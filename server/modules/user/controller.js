import passport from 'passport';
import Users from './model';

export const registerUser = (req, res, next) => {

  const user = req.body.user;


  //validation user input 
  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }
  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  // initializing the value with schema
  const finalUser = new Users(user);

  //setting password salt and hash
  finalUser.setPassword(user.password);


  finalUser.save()
    .then(() => {
      return res.status(201).send({
        user: finalUser.toAuthJSON()
      })
    });
};

export const loginUser = (req, res, next) => {
  const user = req.body.user;


  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', {
      session: false
    },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();

        return res.json({
          user: user.toAuthJSON()
        });
      }
      console.log(info)
      return res.status(400).send({
        info
      });
    })(req, res, next);
};

export const current = (req, res, next) => {

  const id = req.params.id;
  console.log(id);

  return Users.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          error: true
        });
      }

      return res.json({
        user: user.toAuthJSON()
      });
    });
};

// export {registerUser, loginUser, current};
