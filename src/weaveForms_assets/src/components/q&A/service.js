

export default {
    onUpdateAnswer
}


  function onUpdateAnswer(input) {
    let i = 0;
    const index = input.state.form.questions.findIndex(
      (item) => item.id === input.fQId
    );
    if ( !input.state.form.answers ) {
      input.state.form.answers = [];
      while (i < input.state.form.questions.length) {
        input.state.form.answers.push({answer: "", fQId: input.state.form.questions[i].id});
        i++;
      }
    }
      input.state.form.answers[index].answer = input.answer;
      input.state.form.answers[index].fQId = input.fQId;
     
      
    return Promise.resolve(Object.assign({}, input.state));
  }
  