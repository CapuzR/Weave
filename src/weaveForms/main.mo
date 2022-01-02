// Import base modules
import AssocList "mo:base/AssocList";
import Error "mo:base/Error";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Time = "mo:base/Time";
import D "mo:base/Debug";
import Types "./types";
import FormsService "./forms";
import QuestionsService "./questions";
import AnswersService "./answers";
 
import Trie "mo:base/Trie";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Result "mo:base/Result";

actor WeaveForms {
    
    stable var forms : [Form] = [];
    stable var questions : [Question] = [];
    stable var answers : [Answer] = [];
    stable var fNextId : Nat = 1;
    stable var qNextId : Nat = 1;
    stable var aNextId : Nat = 1;
    stable var profiles : Trie.Trie<Principal, Profile> = Trie.empty();

    type Form = Types.Form;
    type NewForm = Types.NewForm;
    type Question = Types.Question;
    type Answer = Types.Answer;
    type QType = Types.QType;
    type FType = Types.FType;

    type ProfileUpdate = Types.ProfileUpdate;
    type Bio = Types.Bio;
    type Profile = Types.Profile;
    type Error = Types.Error;

    public shared (msg) func whoami() : async Principal {
        msg.caller
    };

    func validateFType ( fType : Text ) : async FType {
      switch (fType) {
        case "priv" return #priv;
        case "pub" return #pub;
        case _ return #priv;
        };
      };

    
    //Editor-------------------------------------------------------------------------
      // Forms

    public shared({ caller }) func getMyEditableForms () : async [Form]  {
      await FormsService.getMyEditableForms(forms, caller);
    };

    //Creator-------------------------------------------------------------------------
      // Forms
    public shared({ caller }) func addForm ( title : Text, description : Text,  fType: FType ) : async () {
        forms := FormsService.add(forms, title, description, fNextId, caller, fType);
        fNextId += 1;
    };

    public shared({ caller }) func getFormById (formId: Nat) : async ?Form {
      var f = await FormsService.getFormById(forms, formId, caller);
      switch (f) {
          case null return null;
          case (_) { return f };
      };
    };

    public shared({ caller }) func getOwnedForms () : async [Form] {
      FormsService.getOwnedForms(forms, caller);
    };

    public shared({ caller }) func updateForm ( form : Form ) : async Bool {
        var f = await FormsService.getFormById(forms, form.id, caller);
        switch (f){
          case null return false;
          case (?f) 
            forms :=  FormsService.update(forms, form, caller);
        };
        return true;
    };

      // Questions
    public shared({ caller }) func addQuestion ( question : Text, qType : QType, formId : Nat ) : async () {
        questions := QuestionsService.add(questions, question, qNextId, qType, caller, formId);
        qNextId += 1;
    };

    public shared({ caller }) func getQuestionsByFormId (formId: Nat) : async [Question] {
      QuestionsService.getQuestionsByFormId(questions, formId, caller);
    };

    public shared({ caller }) func updateQuestion ( question : Question, qType : QType, formId : Nat ) : async () {
        questions := QuestionsService.update(questions, question, qType, caller, formId);
    };

    //Filler-------------------------------------------------------------------------------

    public shared ({ caller }) func getFormsAnsweredByMe( ppal : Principal ) : async [Form] {
      
      var myAnswers : [Answer] = await getAnswersByPrincipal( ppal );
      var myAnsweredQuestions : [Question] = await getMyAnsweredQuestions( myAnswers );
      var myAnsweredForms : [Form] = await getMyAnsweredForms( myAnsweredQuestions );

      myAnsweredForms;

    };

    public shared ({ caller }) func getQuestionsAnsweredByMe( ppal : Principal ) : async [Question] {

      var myAnswers : [Answer] = await getAnswersByPrincipal( ppal );
      var myAnsweredQuestions : [Question] = await getMyAnsweredQuestions( myAnswers );

      myAnsweredQuestions;

    };

    public shared({ caller }) func addAnswer ( answer : Text, qType : QType, questionId : Nat ) : async () {
        answers := AnswersService.add(answers, answer, aNextId, qType, caller, questionId);
        aNextId += 1;
    };

    public shared({ caller }) func addManyAnswers ( formAnswers : [Answer], qType : QType, questionId : Nat ) : async () {
        for ( a in formAnswers.vals() ) {
          answers := AnswersService.add(answers, a.answer, aNextId, qType, caller, questionId);
          aNextId += 1;
        }
    };

    public query func getAnswersByPrincipal ( ppal : Principal ) : async [Answer] {
      AnswersService.getAnswersByPrincipal(ppal, answers);
    };
    
    public query func getMyAnsweredQuestions ( myAnswers : [Answer] ) : async [Question] {
      QuestionsService.getMyAnsweredQuestions(myAnswers, questions);
    };
    
    public query func getMyAnsweredForms ( quests : [Question] ) : async [Form] {
      FormsService.getMyAnsweredForms(quests, forms);
    };

    public query func getAnswersByQuestionId (questionId: Nat) : async Text {
      AnswersService.getAnswersByQuestionId(answers, questionId);
    };


  //Profiles

    public shared(msg) func createProfile (profile: ProfileUpdate) : async Result.Result<(), Error> {
        // Get caller principal
        let callerId = msg.caller;

        // Reject AnonymousIdentity
        if(Principal.toText(callerId) == "2vxsx-fae") {
            return #err(#NotAuthorized);
        };

        // Associate user profile with their principal
        let userProfile: Profile = {
            bio = profile.bio;
            id = callerId;
        };

        let (newProfiles, existing) = Trie.put(
            profiles,           // Target trie
            key(callerId),      // Key
            Principal.equal,    // Equality checker
            userProfile
        );

        // If there is an original value, do not update
        switch(existing) {
            // If there are no matches, update profiles
            case null {
                profiles := newProfiles;
                #ok(());
            };
            // Matches pattern of type - opt Profile
            case (? v) {
                #err(#AlreadyExists);
            };
        };
    };

    public shared(msg) func readProfile () : async Result.Result<Profile, Error> {
        // Get caller principal
        let callerId = msg.caller;

        // Reject AnonymousIdentity
        if(Principal.toText(callerId) == "2vxsx-fae") {
            return #err(#NotAuthorized);
        };

        let result = Trie.find(
            profiles,           //Target Trie
            key(callerId),      // Key
            Principal.equal     // Equality Checker
        );
        return Result.fromOption(result, #NotFound);
    };


    public shared(msg) func updateProfile (profile : ProfileUpdate) : async Result.Result<(), Error> {
        // Get caller principal
        let callerId = msg.caller;

        // Reject AnonymousIdentity
        if(Principal.toText(callerId) == "2vxsx-fae") {
            return #err(#NotAuthorized);
        };

        // Associate user profile with their principal
        let userProfile: Profile = {
            bio = profile.bio;
            id = callerId;
        };

        let result = Trie.find(
            profiles,           //Target Trie
            key(callerId),     // Key
            Principal.equal           // Equality Checker
        );

        switch (result){
            // Do not allow updates to profiles that haven't been created yet
            case null {
                #err(#NotFound)
            };
            case (? v) {
                profiles := Trie.replace(
                    profiles,           // Target trie
                    key(callerId),      // Key
                    Principal.equal,    // Equality checker
                    ?userProfile
                ).0;
                #ok(());
            };
        };
    };

    // Delete profile
    public shared(msg) func deleteProfile () : async Result.Result<(), Error> {
        // Get caller principal
        let callerId = msg.caller;

        // Reject AnonymousIdentity
        if(Principal.toText(callerId) == "2vxsx-fae") {
            return #err(#NotAuthorized);
        };

        let result = Trie.find(
            profiles,           //Target Trie
            key(callerId),      // Key
            Principal.equal     // Equality Checker
        );

        switch (result){
            // Do not try to delete a profile that hasn't been created yet
            case null {
                #err(#NotFound);
            };
            case (? v) {
                profiles := Trie.replace(
                    profiles,           // Target trie
                    key(callerId),     // Key
                    Principal.equal,          // Equality checker
                    null
                ).0;
                #ok(());
            };
        };
    };

    private func key(x : Principal) : Trie.Key<Principal> {
        return { key = x; hash = Principal.hash(x) }
    };


    //Share forms












    // public shared({ caller }) func addQuestionsToForm ( ppal: Principal, id: Nat, qType : Text, quest : Array, formId : Nat ) : async () {
        
    //     for (question : Form in quest.vals()) {
    //         if(question.id) {
    //             questions := QuestionsService.update(questions, question, question.id, qType, ppal, formId);
    //         } else {
    //             QuestionsService.addQuestion(ppal, question, qType, formId);
    //         }
    //     };
    // };

















    // Establish role-based greetings to display
    // public shared({ caller }) func greet(name : Text) : async Text {
    //     if (has_permission(caller, #assign_role)) {
    //         return "Hello, " # name # ". You have a role with admin privileges."
    //     } else if (has_permission(caller, #participate)) {
    //         return "Welcome, " # name # ". You have a validated account. Would you like to win with a survey?";
    //     } else {
    //         return "Greetings, " # name # ". Nice to meet you!";
    //     }
    // };

    // Define custom types
//     public type Role = {
//         #owner;
//         #admin;
//         #user;
//     };

//     public type Permission = {
//         #assign_role;
//         #participate;
//         #lowest;
//     };
    
//     private stable var roles: AssocList.AssocList<Principal, Role> = List.nil();
//     private stable var role_requests: AssocList.AssocList<Principal, Role> = List.nil();

//     public func greets(lol: Text): async Text {
//         return lol;
//     };

//     func principal_eq(a: Principal, b: Principal): Bool {
//         return a == b;
//     };

//     func get_role(pal: Principal) : ?Role {
//         if (pal == initializer) {
//             ?#owner;
//         } else {
//             AssocList.find<Principal, Role>(roles, pal, principal_eq);
//         }
//     };

//     // Determine if a principal has a role with permissions
//     func has_permission(pal: Principal, perm : Permission) : Bool {
//         let role = get_role(pal);
//         switch (role, perm) {
//             case (?#owner or ?#admin, _) true;
//             case (?#user, #participate) true;
//             case (_, _) false;
//         }
//     };

//     // Reject unauthorized user identities
//     func require_permission(pal: Principal, perm: Permission) : async () {
//         if ( has_permission(pal, perm) == false ) {
//             throw Error.reject( "unauthorized" );
//         }
//     };

//     // Assign a new user role to a principal
//     public shared({ caller }) func assign_user_role( assignee: Principal, new_role: Text ) : async () {

//         switch new_role {
//             case ("owner") {
//                 throw Error.reject( "Cannot assign anyone to be the owner" );
//             };
//             case (_) {};
//         };
//         if (assignee == initializer) {
//             throw Error.reject( "Cannot assign a role to the canister owner" );
//         } else if ( new_role == "admin" or new_role == "owner" ) {
//             await require_permission( caller, #assign_role );
//         } else if ( new_role == "user" ) {
//             let user = #user;
//             roles := AssocList.replace<Principal, Role>(roles, assignee, principal_eq, ?user).0;
//             role_requests := AssocList.replace<Principal, Role>(role_requests, assignee, principal_eq, null).0;
//         };
//     };

//     // Assign a new admin role to a principal
//     public shared({ caller }) func assign_role( assignee: Principal, new_role: ?Role ) : async () {
//         D.print(debug_show(assignee));
//         D.print(debug_show(caller));
//         switch new_role {
//             case (?#owner) {
//                 throw Error.reject( "Cannot assign anyone to be the owner" );
//             };
//             case (_) {};
//         };
//         if (assignee == initializer) {
//             throw Error.reject( "Cannot assign a role to the canister owner" );
//         } else if ( new_role == ?#admin or new_role == ?#owner ) {
//             await require_permission( caller, #assign_role );
//         };
//         roles := AssocList.replace<Principal, Role>(roles, assignee, principal_eq, new_role).0;
//         role_requests := AssocList.replace<Principal, Role>(role_requests, assignee, principal_eq, null).0;
//     };

//     public shared({ caller }) func request_role( role: Role ) : async Principal {
//         role_requests := AssocList.replace<Principal, Role>(role_requests, caller, principal_eq, ?role).0;
//         return caller;
//     };

//     // Return the principal of the message caller/user identity
//     public shared({ caller }) func callerPrincipal() : async Principal {
//         return caller;
//     };

//     // Return the role of the message caller/user identity
//     public shared({ caller }) func my_role() : async ?Role {
//         return get_role(caller);
//     };

//     public shared({ caller }) func my_role_request() : async ?Role {
//         AssocList.find<Principal, Role>(role_requests, caller, principal_eq);
//     };

//     public shared({ caller }) func get_role_requests() : async List.List<(Principal,Role)> {
//         await require_permission( caller, #assign_role );
//         return role_requests;
//     };

//     public shared({ caller }) func get_roles() : async List.List<(Principal,Role)> {
//         await require_permission( caller, #assign_role );
//         return roles;
//     };
};
