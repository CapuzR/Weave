export default {
  onSignIn,
};

function onSignIn(input) {
  localStorage.setItem("user", "Usuario logueado");
}
