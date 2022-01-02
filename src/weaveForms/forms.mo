// Import base modules
import AssocList "mo:base/AssocList";
import Error "mo:base/Error";
import List "mo:base/List";
import D "mo:base/Debug";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Questions "./questions";
import Types "./types";
import Option "mo:base/Option";
import Bool "mo:base/Bool";
import Time = "mo:base/Time";


module {
  
    type Form = Types.Form;
    type NewForm = Types.NewForm;
    type Question = Types.Question;
    type QType = Types.QType;
    type FType = Types.FType;
    type SharedType = Types.SharedType;
    type SType = Types.SType;

    public func add(forms : [Form], title : Text, description : Text, formId: Nat, principal : Principal, fType : FType) : [Form] {

          let formI : Form = {
            createdOn = Time.now();
            id = formId;
            principal = principal;
            title = title;
            description = description;
            fType = fType;
            sharedWith = [ { principal = principal; sType = #owner; } ];
          };
        
        Array.append(forms, [formI]);
    };

    public func getMyEditableForms(forms : [Form], ppal: Principal) : async [Form] {
      var output : [Form] = [];
      for (form : Form in forms.vals()) {
        if(await isMyRoleEditor(form, ppal)) {
          output := Array.append(output, [form]);
        };
      };
      output
    };

    public func getOwnedForms(forms : [Form], ppal: Principal) : [Form] {
      var output : [Form] = [];
      for (form : Form in forms.vals()) {
        if(Principal.equal(form.principal, ppal)) {
          output := Array.append(output, [form]);
        };
      };
      output
    };
    
    public func update(forms : [Form], form: Form, ppal : Principal) : [Form] {
      var updated : [Form] = [];
      var newF : Form = {
            id = form.id;
            principal = form.principal;
            createdOn = form.createdOn;
            title = form.title;
            description = form.description;
            fType = form.fType;
            sharedWith = form.sharedWith;
          };
      for (f : Form in forms.vals()) {
        if(Principal.equal(f.principal, ppal)) {
          if (f.id == form.id) {
            updated := Array.append(updated, [newF]);
          } else {
            updated := Array.append(updated, [f]);
          }
        };
      };
      updated
    };

    public func getMyAnsweredForms(questions : [Question], forms : [Form]) : [Form] {
      var f : [Form] = [];

      for ( q : Question in questions.vals() ) { 
        f := Array.filter(forms, func (f: Form) : Bool { q.formId == f.id });
      };
      return f;
    };

    private func isSharedWithMe ( form : Form, ppal : Principal ) : async Bool {

      let sharedWith : ?SharedType =  Array.find(form.sharedWith, func (s : SharedType): Bool { return Principal.equal(s.principal, ppal) });
      switch (sharedWith) {
        case null false;
        case _ true;
      }
    };


    private func isMyRoleEditor ( form : Form, ppal : Principal ) : async Bool {

      let isEditor : ?SharedType =  Array.find(form.sharedWith, func (s : SharedType): Bool { 
        return (Principal.equal(s.principal, ppal) and s.sType == #editor)
        });
      switch (isEditor) {
        case null false;
        case _ true;
      }
    };

    public func getFormById(forms : [Form], formId : Nat, ppal : Principal) : async ?Form {
      var form : ?Form = Array.find(forms:[Form], func (f : Form) : Bool { return f.id == formId });
      switch (form) {
        case null {
          null;
        };
        case (?form) {
          if((Principal.equal(ppal, form.principal)) or (await isSharedWithMe(form, ppal))) {
            return ?form;
          };
          null;
        };
      }; 
    };
};