
export default {
    idsToNat
}


async function idsToNat(forms) {
    return await forms.map((f)=>{
      if(typeof f.id == "string"){
        f.id = parseInt(f.id);
      }
      f.questions = f.questions.map((q)=> {
      if(typeof q.id == "string"){
        q.id = parseInt(q.id);
      }
      return q;
      });
    return f;
    });
  }