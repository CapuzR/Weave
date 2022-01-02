
import login from "../Login/service";

const state = {
  form: [],
  selectedForm: undefined,
  user: JSON.parse(localStorage.getItem("identity")),
  selectedQuestion: undefined,
};


export default {
    getFormData,
    submitAnswers,
    state
}

async function getFormData(formId) {
  let identity;
  let actor;
  if(localStorage.getItem("wallet") == 'Stoic') {
    identity = login.onSignInStoic();
    actor = await login.newActorStoic(identity);
  } else if (localStorage.getItem('wallet') == 'Plug') {
    await verifyConnectionAndAgent();
    actor = login.newActorPlug(await login.onSignInPlug());
  }

  const form = await actor.readFTById(parseInt(formId));
  
  if (Object.keys(form) != 'err') {
    state.form = form.ok[0];
    const s = Object.assign({}, state, {
      selectedForm: undefined,
      selectedQuestion: undefined,
    });
    return s;
  } else {
    alert("Error, you don't have access to this form.");
    location.reload();
  }
};

async function submitAnswers(form) {
    let identity;
    let actor;
    if(localStorage.getItem("wallet") == 'Stoic') {
      identity = login.onSignInStoic();
      actor = await login.newActorStoic(identity);
    } else if (localStorage.getItem('wallet') == 'Plug') {
      await verifyConnectionAndAgent();
      actor = login.newActorPlug(await login.onSignInPlug());
    }

    const res = await actor.createFF({fTId: parseInt(form.id)}, form.answers);
    
    if (Object.keys(res) != 'err') {
        return form;
    } else {
      alert("Error, you don't have access to this form.");
      location.reload();
    }
  };