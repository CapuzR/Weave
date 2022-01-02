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
    type Question = Types.Question;
    type Answer = Types.Answer;
    type QType = Types.QType;

      // Add question utility
      public func add(questions : [Question], question : Text, id : Nat, qType: QType, principal : Principal, formId : Nat) : [Question] {

            let quest : Question = {
              id = id;
              formId = formId;
              principal = principal;
              question = question;
              qType = qType;
            };
          
          Array.append(questions, [quest]);
      };

      // func ifQuest (questA: Text, questB : Text) : Boolean {
      //   if ( questA == questB ) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // }

      
      // Update question utility
      public func update(questions : [Question], question : Question, qType: QType, principal : Principal, formId : Nat) : [Question] {
        var updated : [Question] = [];
        for (quest : Question in questions.vals()) {
          if(Principal.equal(quest.principal, principal)) {
            if (quest.id == question.id) {
              updated := Array.append(updated, [question]);
            } else {
              updated := Array.append(updated, [quest]);
            };
          };
        };
        // D.print(debug_show(updated));
        updated
      };
      //MMMMMM...aqui requeriria preguntar por el ppal? Ya tengo las preguntas
      public func getMyAnsweredQuestions(answers : [Answer], questions : [Question]) : [Question] {
        var q : [Question] = [];

        for ( a in answers.vals() ) {
          q := Array.filter(questions, func (q: Question) : Bool {  a.questionId == q.id });
        };
        return q;
      };

      // Show to-do item utility
      // public func show(questions : [Question]) : Text {
      //   var output : Text = "\n___Questions___";
      //   for (question : Question in questions.vals()) {
      //     output #= "\n(" # Nat.toText(question.id) # ") " # question.question # " - " # Principal.toText(question.principal);
      //   };
      //   output
      // };

      public func getQuestionsByFormId(questions : [Question], formId : Nat, ppal: Principal) : [Question] {
        var output : [Question] = [];
        var filteredQuest : [Question] = Array.filter(questions, func (q : Question) : Bool { return q.formId == formId });
        
        for (question : Question in filteredQuest.vals()) {
          if(Principal.equal(question.principal, ppal)) {
            output := Array.append(output, [question]);
          };
        };
        output
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