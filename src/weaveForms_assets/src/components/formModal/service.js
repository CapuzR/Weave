
import login from "../../pages/Login/service";
BigInt.prototype.toJSON = function() { return this.toString()  };

export default {
    onAddedQuestion,
    onSelectedQuestion,
    onDeleteQuestion,
    onUpdateQuestion,
    onCreateForm,
    onUpdateForm
  };

async function onCreateForm(input) {    
    let actor = await login.newActor();
    let result = await actor.createFT(input.form);
    
    input.state.forms.push(input.form);
    const obj = Object.assign({}, input.state, {
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
  
  async function onUpdateForm(input) {
    let actor = await login.newActor();
    let result = await actor.updateFT(input.form);
  
    const index = input.state.forms.findIndex(
      (form) => form.id === input.state.selectedForm.id
    );
    input.state.forms[index] = input.form;
    const obj = Object.assign({}, input.state, {
      selectedForm: undefined,
      selectedQuestion: undefined,
    });
    localStorage.setItem("ownedForms", JSON.stringify(obj.forms));
    
    if("ok" in result) {
      return [true, input.state];
    } else {
      return false;
    }
  }

function onAddedQuestion(input) {
    input.state.selectedForm.questions.push(input.question);
    onSelectedQuestion({ state: input.state, question: input.question });
    return Promise.resolve(Object.assign({}, input.state));
  }
  
  function onUpdateQuestion(input) {
    let i = 0;
    const index = input.state.selectedForm.questions.findIndex(
      (item) => item.id === input.state.selectedQuestion.id
    );
    if ( !input.state.selectedForm.questions ) {
      input.state.selectedForm.questions = [];
      while (i < input.state.form.questions.length) {
        input.state.selectedForm.questions.push({question: input.question.question, qType: input.question.qType});
        i++;
      }
    };
    input.state.selectedForm.questions[index].question = input.question.question;
    input.state.selectedForm.questions[index].qType = input.question.qType;
      
    return Promise.resolve(Object.assign({}, input.state));
     
    // input.state.selectedForm.questions[index].question = input.question?.question;
    // input.state.selectedForm.questions[index].qType = input.question?.qType;
    // input.state.selectedQuestion = input.state.selectedForm.questions[index];
    // return Promise.resolve(Object.assign({}, input.state));
  }
  
  function onSelectedQuestion(input) {
    input.state.selectedQuestion = input.question;
    return Promise.resolve(Object.assign({}, input.state));
  }
  
  function onDeleteQuestion(input) {
    input.state.selectedForm.questions =
      input.state.selectedForm.questions.filter((item) => item.id !== input.id);
    return Promise.resolve(Object.assign({}, input.state));
  }
  