// Import base modules
import AssocList "mo:base/AssocList";
import Error "mo:base/Error";
import List "mo:base/List";
import D "mo:base/Debug";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Types "./types";

module {
  
    // type Form = Types.Form;
    type Answer = Types.Answer;
    type QType = Types.QType;

      // Add question utility
      public func add(answers : [Answer], answer : Text, id : Nat, qType: QType, principal : Principal, questionId : Nat) : [Answer] {

            let answ : Answer = {
              id = id;
              questionId = questionId;
              principal = principal;
              answer = answer;
              qType = qType;
            };
          
          Array.append(answers, [answ]);
      };
      

      // Update question utility
      public func update(answers : [Answer], answer : Answer, qType: QType, principal : Principal, questionId : Nat) : [Answer] {
        var updated : [Answer] = [];
        for (answ : Answer in answers.vals()) {
          if (answ.id == answer.id) {
            updated := Array.append(updated, [answer]);
          } else {
            updated := Array.append(updated, [answ]);
          };
        };
        // D.print(debug_show(updated));
        updated
      };

      // Show to-do item utility
      // public func show(answers : [Answer]) : Text {
      //   var output : Text = "\n___Answers___";
      //   for (answer : Answer in answers.vals()) {
      //     output #= "\n(" # Nat.toText(answer.id) # ") " # answer.answer # " - " # Principal.toText(answer.principal);
      //   };
      //   output
      // };
      //Qué hace esto devolviendo un Text? Debería devolver una respuesta.
      public func getAnswersByQuestionId(answers : [Answer], questionId : Nat) : Text {
        var output : Text = "\n___Answers___";
        var filteredAnsw : [Answer] = Array.filter(answers, func (a : Answer) : Bool { return a.questionId == questionId });
        
        for (answer : Answer in filteredAnsw.vals()) {
          output #= "\n(" # Nat.toText(answer.id) # ") " # answer.answer # " - " # Nat.toText(answer.questionId);
        };
        output
      };

      public func getAnswersByPrincipal(ppal : Principal, answers : [Answer]) : [Answer] {
        Array.filter(answers, func (a : Answer) : Bool { return a.principal == ppal });
      };
      

      // public func findOne(questions : [Question], questionId : Nat) : ?Question {
      //   let findQ : Question;
      //   for (question : Question in questions.vals()) {
      //     if(question.id == questionId){
      //       findQ = question;
      //     }
      //   };
      //   ?findQ
      // };

      // public func exists(questions : [Question], questionId : Nat) : Boolean {
      //   let questionExists : Boolean = false;
      //   for (question : Question in questions.vals()) {
      //     if(question.id == questionId){
      //       questionExists = true;
      //     }
      //   };
      //   questionExists;
      // };
};