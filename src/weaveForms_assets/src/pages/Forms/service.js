import { AuthClient } from "@dfinity/auth-client";
import { createActor, canisterId } from "../../../../declarations/weaveForms/index";
import login from "../Login/service";
import utils from "../../utils/utils";
import { Navigate } from "react-router-dom";
BigInt.prototype.toJSON = function() { return this.toString()  };

const state = {
  forms: [],
  selectedForm: undefined,
  user: JSON.parse(localStorage.getItem("identity")),
  selectedQuestion: undefined,
  page: {
    id: 0,
    title: "owned",
  },
};

export default {
  init,
  onSignOut,
  onSelectedForm,
  onDeleteForm,
  onChangePage,
  state,
  getFormAnswers,
  getNextFTId
};

async function init(formType, state) {
  let forms;
  let newState = {};
  let id = 0;
  const type = formType+"Forms";
  console.log("inicio");
  if(localStorage.getItem(type)){
    console.log("type existe");
    forms = await utils.idsToNat(JSON.parse(localStorage.getItem(type)));
  } else {
    console.log("type no existe");
    let actor = await login.newActor();
    if(formType == "owned") {
      console.log("owned");
      id = 0;
      forms = await actor.readOwnedFT();
      console.log("aja");
      if (Object.keys(forms) != 'err') {
        console.log("Owned Bien");
        localStorage.setItem("ownedForms", JSON.stringify(forms.ok));
        forms = forms.ok;
      } else {
        alert("Crea tu primer formulario ahora.");
      }
    } else if (formType == "answered") {
      console.log("Answered");
      id = 1;
      forms = await actor.readMyFFF();
      if (Object.keys(forms) != 'err') {
        console.log("Answered Bien");
        localStorage.setItem("answeredForms", JSON.stringify(forms.ok));
        forms = forms.ok;
      } else {
        console.log("Answered Mal");
        alert("You haven't answered any form yet.");
        location.reload();
      }
    }
  }
  console.log("id", id);
  console.log("formType", formType);
  console.log("forms", forms);
  newState = {
    forms: forms,
    page: { id: id, title: formType }
  };
  return Object.assign({}, state, newState);
}

async function getFormAnswers(id, state) {

  let actor = await login.newActor();
  
  let forms = await actor.readAnswersByFormId(id);
  if (Object.keys(forms) != 'err') {
    forms = forms.ok;
    newState = {
      forms: forms,
      page: { id: 0, title: "owned" }
    };
  } else {
    alert("Your Form hasn't been answered yet.");
    location.reload();
  }
  return Object.assign({}, state, newState);
}

async function getNextFTId() {
  let actor = await login.newActor();
  return await actor.getNextFTId();
}

async function onSignOut() {
  const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      await authClient.logout();
      localStorage.clear();
    }
}

function onSelectedForm(input) {
  return Promise.resolve(
    Object.assign({}, input.state, {
      selectedForm: input.form,
    })
  );
}

async function onDeleteForm(id, state) {
  let actor = await login.newActor();
  let result = await actor.deleteFT(id);

  const index = state.forms.findIndex(
    (form) => form.id === id
  );
  const newState = state;
  newState.forms = [...newState.forms.slice(0, index), ...newState.forms.slice(index+1,)];
  const obj = Object.assign({}, newState, {
    selectedForm: undefined,
    selectedQuestion: undefined,
  });
  localStorage.setItem("ownedForms", JSON.stringify(obj.forms));

  if("ok" in result) {
    return true;
  } else {
    return false;
  }
}

function onChangePage(input) {
  return Promise.resolve(
    Object.assign({}, input.state, {
      page: {
        id: input.page.id,
        title: input.page.title,
      },
    })
  );
}


