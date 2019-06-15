module.exports = (UserModel, bcrypt, jwt) => {
  const loginQuery = async (_, { email, password }) => {
    let data = await UserModel.findOne({
      $or: [{ email }, { username: email }]
    });
    if (!data) {
      throw new Error("Invalid credentials!");
    }
    let verifyPassword = await bcrypt
      .compare(password, data.password)
      .then(res => res)
      .catch(err => err);

    if (verifyPassword) {
      return jwt.sign({
        id: data._id,
        registeredAsSeller: data.registeredAsSeller
      });
    } else {
      throw new Error("Invalid credentials!");
    }
  };

  const registerMutation = async (_, { username, password, email }) => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(String(email).toLowerCase())) {
      throw new Error("Email is not valid!!");
    }
    let checkUser = await UserModel.findOne({ $or: [{ username }, { email }] });
    if (checkUser != null) {
      throw new Error("Username or email is exists!");
    }
    let hash = await bcrypt.hash(password, 10);
    let data = await UserModel.create({
      username,
      password: hash,
      email,
      registeredAsSeller: false
    })
      .then(value => value)
      .catch(err => console.error(err));
    return data != Error && data != null;
  };

  return {
    Query: {
      login: loginQuery
    },
    Mutation: {
      register: registerMutation
    },
    User: {
      id: u => u._id.toString()
    }
  };
};
