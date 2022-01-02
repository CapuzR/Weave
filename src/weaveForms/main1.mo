//Part of the code is based on Kyle Peacock IC Avatar Tutorial series.

// Import base modules
import AssocList "mo:base/AssocList";
import Error "mo:base/Error";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Time = "mo:base/Time";
import Prim "mo:⛔";
import D "mo:base/Debug";
import Types "./types1";
import FTService "./forms";
import QTService "./questions";
import AnswersService "./answers";
 
import Trie "mo:base/Trie";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Result "mo:base/Result";

actor WeaveForms {
    
    // stable var formTemplates : [FormTemplate] = [];

    // stable var questionTemplates : [QuestionTemplate] = [];

    // stable var filledForms : [FilledForm] = [];

    // stable var filledQuestions : [FilledQuestion] = [];

    // stable var answers : [Answer] = [];
    stable var fTNextId : Nat = 1;
    stable var fFNextId : Nat = 1;
    stable var qTNextId : Nat = 1;
    stable var fQNextId : Nat = 1;
    stable var aNextId : Nat = 1;
    // stable var fNextId : Nat = 1;
    // stable var qNextId : Nat = 1;
    // stable var profiles : Trie.Trie<Principal, Profile> = Trie.empty();


    // stable var questionTemplates : Trie.Trie<Nat, QuestionTemplate> = Trie.empty();

    // stable var filledQuestions : Trie.Trie<Nat, QuestionTemplate> = Trie.empty();
    // stable var filledForms : Trie.Trie<Nat, FormTemplate> = Trie.empty();

    // stable var answers : Trie.Trie<Nat, Answers> = Trie.empty();

    // type Form = Types.Form;
    // type NewForm = Types.NewForm;
    // type QuestionTemplate = Types.Question;
    // type Answer = Types.Answer;
    // type QType = Types.QType;
    // type FType = Types.FType;

    type ProfileUpdate = Types.ProfileUpdate;
    type Bio = Types.Bio;
    type Profile = Types.Profile;
    type FormBase = Types.FormBase;
    type Error = Types.Error;

  //------------------------------------------------------------------------------------Form Templates

    type FTUpdate = Types.FTUpdate;
    type FTInit = Types.FTInit;
    type FT = Types.FT;
    stable var formTemplates : Trie.Trie<Nat, FT> = Trie.empty();

    // public func fT () : async Trie.Trie<Nat, FT> {
    //     return formTemplates;
    // };

    public query func getNextFTId () : async Nat {
        return fTNextId;
    };

    public shared(msg) func createFT (ft: FTInit) : async Result.Result<(), Error> {
        
        let callerId = msg.caller;

        if(Principal.toText(callerId) == "2vxsx-fae") {
            return #err(#NotAuthorized);
        };

        let formBase : FormBase = {
            createdOn = Time.now();
            title = ft.formBase.title;
            description = ft.formBase.description;
        };

        let fT: FT = {
            id = fTNextId;
            formBase = formBase;
            principal = callerId;
            fType = ft.fType;
            sharedWith = ft.sharedWith;
            nFTCol = ft.nFTCol;
            questions = ft.questions;
        };

        let (newFT, existing) = Trie.put(
            formTemplates,           // Target trie
            natKey(fTNextId),      // Key
            Nat.equal,
            fT
        );

        switch(existing) {
            
            case null {
                formTemplates := newFT;
                fTNextId := fTNextId + 1;
                #ok(());
            };
            case (? v) {
                #err(#AlreadyExists);
            };
        };
    };

    public shared(msg) func readOwnedFT () : async Result.Result<[FT], Error> {
        // Get caller principal
        let callerId = msg.caller;

        // Reject AnonymousIdentity
        if(Principal.toText(callerId) == "2vxsx-fae") {
            return #err(#NotAuthorized);
        };

        let ownedForms : Trie.Trie<Nat, FT> = Trie.filter<Nat, FT>(formTemplates, func (k, v) { Principal.equal(v.principal, callerId) });
        let result : [FT] = Trie.toArray<Nat, FT, FT>(ownedForms, func (k, v) { v });

        if(Nat.notEqual(result.size(), 0)) {
            #ok(result);
        } else {
            #err(#NotFound);
        };
    };

    public shared(msg) func readFTById (id : Nat) : async Result.Result<[FT], Error> {
        // Get caller principal
        let callerId = msg.caller;

        // Reject AnonymousIdentity
        if(Principal.toText(callerId) == "2vxsx-fae") {
            return #err(#NotAuthorized);
        };

        let form : Trie.Trie<Nat, FT> = Trie.filter<Nat, FT>(formTemplates, func (k, v) { v.id == id });
        let result : [FT] = Trie.toArray<Nat, FT, FT>(form, func (k, v) { v });

        if(Nat.notEqual(result.size(), 0)) {
            #ok(result);
        } else {
            #err(#NotFound);
        };
    };

    public shared(msg) func updateFT (ft : FTUpdate) : async Result.Result<(), Error> {
        // Get caller principal
        let callerId = msg.caller;

        // Reject AnonymousIdentity
        if(Principal.toText(callerId) == "2vxsx-fae") {
            return #err(#NotAuthorized);
        };

        let ownedForm = Trie.get<Nat, FT>(formTemplates, natKey(ft.id), Nat.equal);

        switch (ownedForm){
            case null {
                #err(#NotFound)
            };
            case (? v) {

                if(Principal.notEqual(v.principal, callerId)) {
                    return #err(#NotAuthorized);
                };

                let formBase : FormBase = {
                    createdOn = v.formBase.createdOn;
                    title = ft.formBase.title;
                    description = ft.formBase.description;
                };

                let fT: FT = {
                    id = v.id;
                    formBase = formBase;
                    principal = v.principal;
                    fType = ft.fType;
                    sharedWith = ft.sharedWith;
                    questions = ft.questions;
                    nFTCol = ft.nFTCol;
                };

                formTemplates := Trie.replace(
                    formTemplates,           // Target trie
                    natKey(fT.id),      // Key
                    Nat.equal,
                    ?fT
                ).0;
                #ok(());
            };
        };
    };

    public shared(msg) func deleteFT (id : Nat) : async Result.Result<(), Error> {
        // Get caller principal
        let callerId = msg.caller;

        // Reject AnonymousIdentity
        if(Principal.toText(callerId) == "2vxsx-fae") {
            return #err(#NotAuthorized);
        };

        let ownedForm = Trie.get<Nat, FT>(formTemplates, natKey(id), Nat.equal);

        switch (ownedForm){
            case null {
                #err(#NotFound)
            };
            case (?v) {

                if(Principal.notEqual(v.principal, callerId)) {
                    return #err(#NotAuthorized);
                };

                formTemplates := Trie.replace(
                    formTemplates,           // Target trie
                    natKey(id),      // Key
                    Nat.equal,
                    null
                ).0;
                #ok(());
            };
        };
    };


  //------------------------------------------------------------------------------------Filled Forms

    type NewFF = Types.NewFF;
    type FF = Types.FF;
    type FFF = Types.FFF;
    stable var forms : Trie.Trie<Nat, FF> = Trie.empty();
    //Have to validate if FT is public or if callerId has permissions to answer the form.
    //FT could be filled one or many times per principal.

    // public func ff () : async Trie.Trie<Nat, FF> {
    //     return forms;
    // };

    public shared(msg) func createFF (ff: NewFF, a: [NewAnswer]) : async Result.Result<(), Error> {
        // Get caller principal
        let callerId = msg.caller;

        // Reject AnonymousIdentity
        if(Principal.toText(callerId) == "2vxsx-fae") {
            return #err(#NotAuthorized);
        };


        var fT = Trie.get<Nat, FT>(formTemplates, natKey(ff.fTId), Nat.equal);

        switch(fT) {
            case null {
                return #err(#NotFound);
            };
            case (?v) {

                let formBase : FormBase = {
                    createdOn = Time.now();
                    title = v.formBase.title;
                    description = v.formBase.description;
                };

                let fF: FF = {
                    id = fFNextId;
                    fTId = v.id;
                    formBase = formBase;
                    principal = callerId;
                    createdOn = Time.now();
                };
                
                let (newFF, existing) = Trie.put(
                    forms,
                    natKey(fFNextId),
                    Nat.equal,
                    fF
                );
 
                switch(existing) {
                    case (null) {
                        forms := newFF;
                        fFNextId := fFNextId + 1;
                        let filledQ = createFilledQuestion({ formId = fF.id; createdOn = fF.createdOn }, a, callerId);

                        switch (filledQ) {
                            case (#err NotFound) {
                                return #err(#NotFound);
                            };
                            case (#ok q) {
                                return #ok(());
                            };
                        };
                    };
                    case (? v) {
                        return #err(#AlreadyExists);
                    };
                };
            };
        }; 
    };

    public shared(msg) func readMyFF () : async Result.Result<[FF], Error> {
        // Get caller principal
        let callerId = msg.caller;

        // Reject AnonymousIdentity
        if(Principal.toText(callerId) == "2vxsx-fae") {
            return #err(#NotAuthorized);
        };

        let myFF : Trie.Trie<Nat, FF> = Trie.filter<Nat, FF>(forms, func (k, v) { Principal.equal(v.principal, callerId) });
        let result : [FF] = Trie.toArray<Nat, FF, FF>(myFF, func (k, v) { v });

        if(Nat.notEqual(result.size(), 0)) {
            #ok(result);
        } else {
            #err(#NotFound);
        };
    };


  //------------------------------------------------------------------------------------Filled Questions

    type NewFilledQuestion = Types.NewFilledQuestion;
    type FilledQuestion = Types.FilledQuestion;
    type QT = Types.QT;
    type FFilledQuestion = Types.FFilledQuestion;
    stable var filledQuestions : Trie.Trie<Nat, FilledQuestion> = Trie.empty();

    // public func fq () : async Trie.Trie<Nat, FilledQuestion> {
    //     return filledQuestions;
    // };

    private func createFilledQuestion (fq: NewFilledQuestion, a: [NewAnswer], callerId : Principal) : Result.Result<(), Error> {

        var fF = Trie.get<Nat, FF>(forms, natKey(fq.formId), Nat.equal); //This needs to be pass through args

        switch(fF) {
            case null {
                return #err(#NotFound);
            };
            case (?ff) {

                var fT = Trie.get<Nat, FT>(formTemplates, natKey(ff.fTId), Nat.equal); //This needs to be pass through args

                switch(fT) {
                    case null {
                        return #err(#NotFound);
                    };
                    case (?ft) {
                        var fQCount : Nat = 0;
                        label qt for(questionT in ft.questions.vals()) {

                            let fQ: FilledQuestion = {
                                id = fQNextId;
                                fFId = [fq.formId];
                                principal = ff.principal; //AQUI
                                question = questionT.question;
                                qType = questionT.qType;
                                createdOn = fq.createdOn;
                            };
                            
                            let (newFQ, existing) = Trie.put(
                                filledQuestions,           // Target trie
                                natKey(fQNextId),      // Key
                                Nat.equal,
                                fQ
                            );

                            switch(existing) {
                                case null {
                                    filledQuestions := newFQ;
                                    fQNextId := fQNextId + 1;

                                            let answer = createAnswer({ fQId = fQ.id; answer = a[fQCount].answer }, callerId);

                                            switch (answer) {
                                                case (#err NotFound) {
                                                    return #err(#NotFound);
                                                };
                                                case (#ok ans) {
                                                    fQCount := fQCount + 1;
                                                    continue qt;
                                                };
                                            };
                                };
                                case (?_) {
                                    return #err(#Other("Question already created."));
                                };
                            };
                        };
                            return #ok(());
                    };
                };
            };
        }; 
    };

    public shared(msg) func readMyFQbyFormId (formId : Nat) : async Result.Result<[FilledQuestion], Error> {
        let callerId = msg.caller;

        if(Principal.toText(callerId) == "2vxsx-fae") {
            return #err(#NotAuthorized);
        };

        let filledQ : [FilledQuestion] = Trie.toArray<Nat, FilledQuestion, FilledQuestion>(filledQuestions, func (k, v) { v });

        let result : [FilledQuestion] = Array.filter<FilledQuestion>(filledQ, func (v) {
            var t : Nat = 0;
            for (x in v.fFId.vals()) {
                t := x;
            };
            if(t == formId) {
                true;
            } else {
                false;
            };
        } );

        if(Nat.notEqual(result.size(), 0)) {
            #ok(result);
        } else {
            #err(#NotFound);
        };
    };

  //------------------------------------------------------------------------------------Filled Answers

    type NewAnswer = Types.NewAnswer;
    type Answer = Types.Answer;
    stable var answers : Trie.Trie<Nat, Answer> = Trie.empty();

    // public func getAllAnswers () : async Trie.Trie<Nat, Answer> {
    //     return answers;
    // };

    private func createAnswer(newAnswer : NewAnswer, callerId : Principal) : Result.Result<(), Error> {

        var question = Trie.get<Nat, FilledQuestion>(filledQuestions, natKey(newAnswer.fQId), Nat.equal);

        switch(question) {
            case null {
                return #err(#NotFound);
            };
            case (?q) {
                if(q.principal != callerId) {
                    return #err(#NotAuthorized);
                };
                
                let answer = {
                    id = aNextId;
                    principal = q.principal;
                    fQId = q.id;
                    qType = q.qType;
                    answer = newAnswer.answer;
                    createdOn = Time.now(); 
                    lastUpdate = Time.now(); 
                };
                        
                let (newA, existing) = Trie.put(
                    answers,
                    natKey(aNextId),
                    Nat.equal,
                    answer
                );

                switch (existing) {
                    case null {
                        answers := newA;
                        aNextId := aNextId + 1;
                        return #ok(());
                    };
                    case (?_) {
                        return #err(#Other("Answer already created."));
                    };
                };
            };
        };
    };

    public shared ({caller}) func createAnswers(newAnswers : [NewAnswer]) : async Result.Result<(), Error> {

        if(Principal.toText(caller) == "2vxsx-fae") {
            return #err(#NotAuthorized);
        };

        for ( newAnswer in newAnswers.vals() ) {

            var question = Trie.get<Nat, FilledQuestion>(filledQuestions, natKey(newAnswer.fQId), Nat.equal);

            switch(question) {
                case null {
                    return #err(#NotFound);
                };
                case (?q) {
                    if(q.principal != caller) {
                        return #err(#NotAuthorized);
                    };
                    
                    let answer = {
                        id = aNextId;
                        principal = q.principal;
                        fQId = q.id;
                        qType = q.qType;
                        answer = newAnswer.answer;
                        createdOn = Time.now(); 
                        lastUpdate = Time.now(); 
                    };
                            
                    let (newA, existing) = Trie.put(
                        answers,
                        natKey(aNextId),
                        Nat.equal,
                        answer
                    );

                    switch (existing) {
                        case null {
                            answers := newA;
                            fQNextId := fQNextId + 1;
                        };
                        case (?_) {
                        };
                    };
                };
            };
        };
        return #ok(());
    };

    public shared(msg) func readMyAbyQId (questionId : Nat) : async Result.Result<[Answer], Error> {
        let callerId = msg.caller;

        if(Principal.toText(callerId) == "2vxsx-fae") {
            return #err(#NotAuthorized);
        };

        let answersArr : [Answer] = Trie.toArray<Nat, Answer, Answer>(answers, func (k, v) { v });

        let result : [Answer] = Array.filter<Answer>(answersArr, func (v) {
            // var t : Nat = 0;
            // for (x in v.vals()) {
            //     t := x;
            // };
            if(v.fQId == questionId) {
                true;
            } else {
                false;
            };
        } );

        if(Nat.notEqual(result.size(), 0)) {
            #ok(result);
        } else {
            #err(#NotFound);
        };
    };


    public shared(msg) func readMyFFF () : async Result.Result<[FFF], Error> {
        // Get caller principal
        let callerId = msg.caller;

        // Reject AnonymousIdentity
        if(Principal.toText(callerId) == "2vxsx-fae") {
            return #err(#NotAuthorized);
        };

        let myFF : Trie.Trie<Nat, FF> = Trie.filter<Nat, FF>(forms, func (k, v) { Principal.equal(v.principal, callerId) });
        let iterFF = Trie.iter<Nat, FF>(myFF);
        let result : Buffer.Buffer<FFF> = Buffer.Buffer(1);
        
        label l for (f in iterFF) {
            switch(f) {
                case(k, ff) {
                    let questions : Result.Result<[FilledQuestion], Error> = await readMyFQbyFormId(ff.id);
                    switch (questions) {
                        case (#err NotFound) {
                            continue l;
                        };
                        case (#ok qs) {
                            let fullQuestions : Buffer.Buffer<FFilledQuestion> = Buffer.Buffer(qs.size());
                            for ( fq in qs.vals()) {
                                let answers : Result.Result<[Answer], Error> = await readMyAbyQId(fq.id);
                                switch (answers) {
                                    case (#err NotFound) {
                                        continue l;
                                    };
                                    case (#ok a) {
                                        let newfQ : FFilledQuestion ={
                                            id = fq.id;
                                            fFId = [ff.id];
                                            principal = fq.principal;
                                            question = fq.question;
                                            qType = fq.qType;
                                            createdOn = fq.createdOn;
                                            answers = a;
                                        };

                                        fullQuestions.add(newfQ);
                                    };
                                };
                            };

                            let newfF : FFF = {
                                id = ff.id;
                                fTId = ff.fTId;
                                formBase = ff.formBase;
                                createdOn = ff.createdOn;
                                principal = ff.principal;
                                questions = fullQuestions.toArray();
                            };

                            result.add(newfF);
                        };
                    };
                };
            };
        };

        if(Nat.notEqual(result.size(), 0)) {
            #ok(result.toArray());
        } else {
            #err(#NotFound);
        };
    };

    public shared(msg) func readAnswersByFormId (id : Nat) : async Result.Result<[FFF], Error> {
        // Get caller principal
        let callerId = msg.caller;

        // Reject AnonymousIdentity
        if(Principal.toText(callerId) == "2vxsx-fae") {
            return #err(#NotAuthorized);
        };

        let isMyFT : Trie.Trie<Nat, FF> = Trie.filter<Nat, FF>(forms, func (k, v) { v.id == id and Principal.equal(v.principal, callerId) });
        
        if(Trie.size(isMyFT) == 0){
            return #err(#Other("You can only get your Forms, please try again."));
        };
        let myFF : Trie.Trie<Nat, FF> = Trie.filter<Nat, FF>(forms, func (k, v) { v.fTId == id });
        let iterFF = Trie.iter<Nat, FF>(myFF);
        let result : Buffer.Buffer<FFF> = Buffer.Buffer(1);
        
        label l for (f in iterFF) {
            switch(f) {
                case(k, ff) {
                    let questions : Result.Result<[FilledQuestion], Error> = await readMyFQbyFormId(ff.id);
                    switch (questions) {
                        case (#err NotFound) {
                            continue l;
                        };
                        case (#ok qs) {
                            let fullQuestions : Buffer.Buffer<FFilledQuestion> = Buffer.Buffer(qs.size());
                            for ( fq in qs.vals()) {
                                let answers : Result.Result<[Answer], Error> = await readMyAbyQId(fq.id);
                                switch (answers) {
                                    case (#err NotFound) {
                                        continue l;
                                    };
                                    case (#ok a) {
                                        let newfQ : FFilledQuestion ={
                                            id = fq.id;
                                            fFId = [ff.id];
                                            principal = fq.principal;
                                            question = fq.question;
                                            qType = fq.qType;
                                            createdOn = fq.createdOn;
                                            answers = a;
                                        };

                                        fullQuestions.add(newfQ);
                                    };
                                };
                            };

                            let newfF : FFF = {
                                id = ff.id;
                                fTId = ff.fTId;
                                formBase = ff.formBase;
                                createdOn = ff.createdOn;
                                principal = ff.principal;
                                questions = fullQuestions.toArray();
                            };

                            result.add(newfF);
                        };
                    };
                };
            };
        };

        if(Nat.notEqual(result.size(), 0)) {
            #ok(result.toArray());
        } else {
            #err(#NotFound);
        };
    };

    // public shared(msg) func updateFF (ff : FF) : async Result.Result<(), Error> {
    //     // Get caller principal
    //     let callerId = msg.caller;

    //     // Reject AnonymousIdentity
    //     if(Principal.toText(callerId) == "2vxsx-fae") {
    //         return #err(#NotAuthorized);
    //     };

    //     let ownedForm = Trie.get<Nat, FF>(formTemplates, natKey(ff.id), Nat.equal);

    //     switch (ownedForm){
    //         case null {
    //             #err(#NotFound)
    //         };
    //         case (? v) {

    //             if(Principal.notEqual(ff.principal, callerId)) {
    //                 return #err(#NotAuthorized);
    //             };

    //             formTemplates := Trie.replace(
    //                 formTemplates,           // Target trie
    //                 natKey(ft.id),      // Key
    //                 Nat.equal,
    //                 ?ft
    //             ).0;
    //             #ok(());
    //         };
    //     };
    // };

    // public shared(msg) func deleteFT (id : Nat) : async Result.Result<(), Error> {
    //     // Get caller principal
    //     let callerId = msg.caller;

    //     // Reject AnonymousIdentity
    //     if(Principal.toText(callerId) == "2vxsx-fae") {
    //         return #err(#NotAuthorized);
    //     };

    //     let ownedForm = Trie.get<Nat, FT>(formTemplates, natKey(id), Nat.equal);

    //     switch (ownedForm){
    //         case null {
    //             #err(#NotFound)
    //         };
    //         case (?v) {

    //             if(Principal.notEqual(v.principal, callerId)) {
    //                 return #err(#NotAuthorized);
    //             };

    //             formTemplates := Trie.replace(
    //                 formTemplates,           // Target trie
    //                 natKey(id),      // Key
    //                 Nat.equal,
    //                 null
    //             ).0;
    //             #ok(());
    //         };
    //     };
    // };

    //Not possible to update or delete Filled Forms.

    // // Delete profile
    // public shared(msg) func deleteProfile () : async Result.Result<(), Error> {
    //     // Get caller principal
    //     let callerId = msg.caller;

    //     // Reject AnonymousIdentity
    //     if(Principal.toText(callerId) == "2vxsx-fae") {
    //         return #err(#NotAuthorized);
    //     };

    //     let result = Trie.find(
    //         profiles,           //Target Trie
    //         key(callerId),      // Key
    //         Principal.equal     // Equality Checker
    //     );

    //     switch (result){
    //         // Do not try to delete a profile that hasn't been created yet
    //         case null {
    //             #err(#NotFound);
    //         };
    //         case (? v) {
    //             profiles := Trie.replace(
    //                 profiles,           // Target trie
    //                 key(callerId),     // Key
    //                 Principal.equal,          // Equality checker
    //                 null
    //             ).0;
    //             #ok(());
    //         };
    //     };
    // };

    private func natKey(x : Nat) : Trie.Key<Nat> {

        return { key = x; hash = Prim.natToNat32(x); }
    };













//     public shared (msg) func whoami() : async Principal {
//         msg.caller
//     };

//     func validateFType ( fType : Text ) : async FType {
//       switch (fType) {
//         case "priv" return #priv;
//         case "pub" return #pub;
//         case _ return #priv;
//         };
//       };

    
//     //Editor-------------------------------------------------------------------------
//       // formTemplates

//     public shared({ caller }) func getMyEditableformTemplates () : async [Form]  {
//       await FTService.getMyEditableformTemplates(formTemplates, caller);
//     };

//     //Creator-------------------------------------------------------------------------
//       // formTemplates
//     public shared({ caller }) func addFormTemplate ( title : Text, description : Text,  fType: FType ) : async () {
//         formTemplates := FTService.add(formTemplates, title, description, fNextId, caller, fType);
//         fNextId += 1;
//     };

//     public shared({ caller }) func getFormById (formId: Nat) : async ?Form {
//       var f = await FTService.getFormById(formTemplates, formId, caller);
//       switch (f) {
//           case null return null;
//           case (_) { return f };
//       };
//     };

//     public shared({ caller }) func getOwnedformTemplates () : async [Form] {
//       D.print(debug_show("caller"));
//       D.print(debug_show(caller));
//       FTService.getOwnedformTemplates(formTemplates, caller);
//     };

//     public shared({ caller }) func updateFormTemplate ( form : Form ) : async Bool {
//         var f = await FTService.getFormById(formTemplates, form.id, caller);
//         switch (f){
//           case null return false;
//           case (?f) 
//             formTemplates :=  FTService.update(formTemplates, form, caller);
//         };
//         return true;
//     };

//       // Questions
//     public shared({ caller }) func addQT ( qt : Text, qType : QType, fTId : Nat ) : async () {
//         questionTemplates := QTService.add(questionTemplates, question, qNextId, qType, caller, fTId);
//         qNextId += 1;
//     };

//     public shared({ caller }) func getQTByFTId (fTId: Nat) : async [QuestionTemplate] {
//       QTService.getQTByFTId(qt, fTId, caller);
//     };

//     public shared({ caller }) func updateQT ( question : QuestionTemplate, qType : QType, fTId : Nat ) : async () {
//         questionTemplates := QTService.update(qt, question, qType, caller, fTId);
//     };

//     //Filler-------------------------------------------------------------------------------

//     public shared ({ caller }) func getFormsAnsweredByMe( ppal : Principal ) : async [Form] {
      
//       var myAnswers : [Answer] = await getAnswersByPrincipal( ppal );
//       var myAnsweredQuestions : [Question] = await getMyAnsweredQuestions( myAnswers );
//       var myAnsweredForms : [Form] = await getMyAnsweredForms( myAnsweredQuestions );

//       myAnsweredForms;

//     };

//     public shared ({ caller }) func getQuestionsAnsweredByMe( ppal : Principal ) : async [Question] {

//       var myAnswers : [Answer] = await getAnswersByPrincipal( ppal );
//       var myAnsweredQuestions : [Question] = await getMyAnsweredQuestions( myAnswers );

//       myAnsweredQuestions;

//     };

//     public shared({ caller }) func addAnswer ( answer : Text, qType : QType, questionId : Nat ) : async () {
//         answers := AnswersService.add(answers, answer, aNextId, qType, caller, questionId);
//         aNextId += 1;
//     };

//     public shared({ caller }) func addManyAnswers ( formAnswers : [Answer], qType : QType, questionId : Nat ) : async () {
//         for ( a in formAnswers.vals() ) {
//           answers := AnswersService.add(answers, a.answer, aNextId, qType, caller, questionId);
//           aNextId += 1;
//         }
//     };

//     public query func getAnswersByPrincipal ( ppal : Principal ) : async [Answer] {
//       AnswersService.getAnswersByPrincipal(ppal, answers);
//     };
    
//     public query func getMyAnsweredQuestions ( myAnswers : [Answer] ) : async [Question] {
//       QTService.getMyAnsweredQuestions(myAnswers, questions);
//     };
    
//     public query func getMyAnsweredForms ( quests : [Question] ) : async [Form] {
//       FormsService.getMyAnsweredForms(quests, forms);
//     };

//     public query func getAnswersByQuestionId (questionId: Nat) : async Text {
//       AnswersService.getAnswersByQuestionId(answers, questionId);
//     };


//   //Profiles

//     public shared(msg) func createProfile (profile: ProfileUpdate) : async Result.Result<(), Error> {
//         // Get caller principal
//         let callerId = msg.caller;

//         // Reject AnonymousIdentity
//         if(Principal.toText(callerId) == "2vxsx-fae") {
//             return #err(#NotAuthorized);
//         };

//         // Associate user profile with their principal
//         let userProfile: Profile = {
//             bio = profile.bio;
//             id = callerId;
//         };

//         let (newProfiles, existing) = Trie.put(
//             profiles,           // Target trie
//             key(callerId),      // Key
//             Principal.equal,    // Equality checker
//             userProfile
//         );

//         // If there is an original value, do not update
//         switch(existing) {
//             // If there are no matches, update profiles
//             case null {
//                 profiles := newProfiles;
//                 #ok(());
//             };
//             // Matches pattern of type - opt Profile
//             case (? v) {
//                 #err(#AlreadyExists);
//             };
//         };
//     };

//     public shared(msg) func readProfile () : async Result.Result<Profile, Error> {
//         // Get caller principal
//         let callerId = msg.caller;

//         // Reject AnonymousIdentity
//         if(Principal.toText(callerId) == "2vxsx-fae") {
//             return #err(#NotAuthorized);
//         };

//         let result = Trie.find(
//             profiles,           //Target Trie
//             key(callerId),      // Key
//             Principal.equal     // Equality Checker
//         );
//         return Result.fromOption(result, #NotFound);
//     };


//     public shared(msg) func updateProfile (profile : ProfileUpdate) : async Result.Result<(), Error> {
//         // Get caller principal
//         let callerId = msg.caller;

//         // Reject AnonymousIdentity
//         if(Principal.toText(callerId) == "2vxsx-fae") {
//             return #err(#NotAuthorized);
//         };

//         // Associate user profile with their principal
//         let userProfile: Profile = {
//             bio = profile.bio;
//             id = callerId;
//         };

//         let result = Trie.find(
//             profiles,           //Target Trie
//             key(callerId),     // Key
//             Principal.equal           // Equality Checker
//         );

//         switch (result){
//             // Do not allow updates to profiles that haven't been created yet
//             case null {
//                 #err(#NotFound)
//             };
//             case (? v) {
//                 profiles := Trie.replace(
//                     profiles,           // Target trie
//                     key(callerId),      // Key
//                     Principal.equal,    // Equality checker
//                     ?userProfile
//                 ).0;
//                 #ok(());
//             };
//         };
//     };

//     // Delete profile
//     public shared(msg) func deleteProfile () : async Result.Result<(), Error> {
//         // Get caller principal
//         let callerId = msg.caller;

//         // Reject AnonymousIdentity
//         if(Principal.toText(callerId) == "2vxsx-fae") {
//             return #err(#NotAuthorized);
//         };

//         let result = Trie.find(
//             profiles,           //Target Trie
//             key(callerId),      // Key
//             Principal.equal     // Equality Checker
//         );

//         switch (result){
//             // Do not try to delete a profile that hasn't been created yet
//             case null {
//                 #err(#NotFound);
//             };
//             case (? v) {
//                 profiles := Trie.replace(
//                     profiles,           // Target trie
//                     key(callerId),     // Key
//                     Principal.equal,          // Equality checker
//                     null
//                 ).0;
//                 #ok(());
//             };
//         };
//     };

    private func key(x : Principal) : Trie.Key<Principal> {
        return { key = x; hash = Principal.hash(x) }
    };


    //Share forms












    // public shared({ caller }) func addQuestionsToForm ( ppal: Principal, id: Nat, qType : Text, quest : Array, formId : Nat ) : async () {
        
    //     for (question : Form in quest.vals()) {
    //         if(question.id) {
    //             questions := QTService.update(questions, question, question.id, qType, ppal, formId);
    //         } else {
    //             QTService.addQuestion(ppal, question, qType, formId);
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
