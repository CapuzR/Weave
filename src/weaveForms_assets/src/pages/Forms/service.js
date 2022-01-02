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

async function newActor(identity){
  return await createActor(canisterId, {
    agentOptions: {
      identity: identity
    }
  })
};

async function init(formType, state) {

  let forms;
  let newState = {};
  
  if(localStorage.getItem("ownedForms") && formType == "owned"){
    forms = await utils.idsToNat(JSON.parse(localStorage.getItem("ownedForms")));
    newState = {
      forms: forms,
      page: { id: 0, title: "owned" }
    };
  } else if(localStorage.getItem("answeredForms") && formType == "answered") {
    forms = await utils.idsToNat(JSON.parse(localStorage.getItem("answeredForms")));
    newState = {
      forms: forms,
      page: { id: 1, title: "answered" }
    };
  } else {
  // const authClient = await AuthClient.create();
  // const identity = await authClient.getIdentity();
  let identity;
  let actor;
  if(localStorage.getItem("wallet") == 'Stoic') {
    identity = login.onSignInStoic();
    actor = await newActor(identity);
  } else if (localStorage.getItem('wallet') == 'Plug') {
    await login.verifyConnectionAndAgent();
    actor = await login.newActorPlug();
  }
  
  if(formType == "owned") {
    forms = await actor.readOwnedFT();
    if (Object.keys(forms) != 'err') {
      localStorage.setItem("ownedForms", JSON.stringify(forms.ok));
      forms = forms.ok;
    } else {
      localStorage.setItem("ownedForms", "[]");
      alert("Create your first 100% on-chain form now.");
      forms = [];
    }
    newState = {
      forms: forms,
      page: { id: 0, title: "owned" }
    };
  } else if (formType == "answered") {
    forms = await actor.readMyFFF();
    if (Object.keys(forms) != 'err') {
      localStorage.setItem("answeredForms", JSON.stringify(forms.ok));
      forms = forms.ok;
      newState = {
        forms: forms,
        page: { id: 1, title: "answered" }
      };
    } else {
      alert("You haven't answered any form yet.");
      location.reload();
    }
  }
}
    return Object.assign({}, state, newState);
}

async function getFormAnswers(id, state) {

  let identity;
  let actor;
  let newState = {};
  if(localStorage.getItem("wallet") == 'Stoic') {
    identity = login.onSignInStoic();
    actor = await newActor(identity);
  } else if (localStorage.getItem('wallet') == 'Plug') {
    await login.verifyConnectionAndAgent();
    actor = await login.newActorPlug();
  }
  
  let forms = await actor.readAnswersByFormId(id);
  if (Object.keys(forms) != 'err') {
    forms = forms.ok;
    newState = {
      forms: forms,
      page: { id: 0, title: "owned" }
    };
  } else {
    alert("You haven't answered any form yet.");
    location.reload();
  }
  return Object.assign({}, state, newState);
}

async function getNextFTId() {

  let identity;
  let actor;
  if(localStorage.getItem("wallet") == 'Stoic') {
    identity = login.onSignInStoic();
    actor = await newActor(identity);
  }  else if (localStorage.getItem('wallet') == 'Plug') {
    await login.verifyConnectionAndAgent();
    actor = await login.newActorPlug();
  }
  
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
  let actor = "";
  
  if(localStorage.getItem('wallet') == 'Stoic') {
    actor = await login.newActorStoic(await login.onSignInStoic());
  } else if (localStorage.getItem('wallet') == 'Plug') {
    await login.verifyConnectionAndAgent();
    actor = await login.newActorPlug();
  }

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
  // input.state.forms = input.state.forms.filter((item) => item.id !== input.id);
  // return Promise.resolve(Object.assign({}, input.state));
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


