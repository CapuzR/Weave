export default {
  onSignIn,
};

function onSignIn() {
  localStorage.setItem("user", "Usuario logueado");
}
