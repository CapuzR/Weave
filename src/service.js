const state = {
  isLogged: false,
};

export default {
  SignIn,
  Logout,
};

function SignIn(input) {
  return Promise.resolve(
    Object.assign(input.state, {
      isLogged: true,
    })
  );
}

function Logout(input) {
  return Promise.resolve(
    Object.assign(input.state, {
      isLogged: false,
    })
  );
}
