import { weaveForms } from "../../declarations/weaveForms";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with weaveForms actor, calling the greet method
  const greeting = await weaveForms.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
