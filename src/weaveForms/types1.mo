module {

  //Form Templates (w/Questions)

  public type FType = {
    #pub;
    #priv;
  };

  public type SType = {
    #owner; //change in ownership have to be notified and approved by every form filler.
    #editor;
    #reader;
  };
  
  public type SharedType = {
    // username: Username;
    ppal: Text;
    sType: SType; 
  };

  public type FormBase = {
    createdOn : Int;
    title : Text;
    description : Text;
  };

  public type FormBaseUpdate = {
    title : Text;
    description : Text;
  };

  public type FT = {
    id : Nat;
    formBase: FormBase;
    principal: Principal;
    fType: FType;
    sharedWith: [SharedType];
    questions: [QT];
    nFTCol: Text;
  };

  public type QT = {
    id : Nat;
    // createdOn : Int;
    question : Text;
    qType : QType;
  };

  public type FTInit = {
    formBase: FormBaseUpdate;
    fType: FType;
    sharedWith: [SharedType];
    questions: [QT];
    nFTCol: Text;
  };
  
  public type FTUpdate = {
    id : Nat;
    formBase: FormBaseUpdate;
    fType: FType;
    sharedWith: [SharedType];
    questions: [QT];
    nFTCol: Text;
  };
  
//Filled Forms

  public type FF = {
    id : Nat;
    fTId : Nat;
    formBase: FormBase;
    createdOn : Int;
    principal: Principal;
  };

  public type FFF = {
    id : Nat;
    fTId : Nat;
    formBase: FormBase;
    createdOn : Int;
    principal: Principal;
    questions: [FFilledQuestion];
  };

  public type NewFF = {
    fTId : Nat;
  };

//Filled Questions

  public type FilledQuestion = {
    id : Nat;
    fFId : [Nat];
    principal: Principal;
    question : Text;
    qType : QType;
    createdOn : Int;
  };

  public type FFilledQuestion = {
    id : Nat;
    fFId : [Nat];
    principal: Principal;
    question : Text;
    qType : QType;
    createdOn : Int;
    answers: [Answer];
  };

  public type NewFilledQuestion = {
    formId: Nat;
    createdOn : Int;  
  };

//Answers

  public type Answer = {
    id : Nat;
    principal : Principal;
    fQId : Nat;
    answer : Text;
    qType : QType;
    createdOn : Int;
    lastUpdate : Int;
  };

  public type NewAnswer = {
    fQId : Nat;
    answer : Text;
  };

  public type QType = {
    #text;
    #shortAnswer;
    #paragraph;
    #multipleChoice;
    #checkboxes;
    #dropdown;
    #date;
    #time;
    #principal;
  };

  //Profile

    public type Bio = {
        givenName: ?Text;
        familyName: ?Text;
        username: ?Text;
        displayName: ?Text;
        location: ?Text;
        about: ?Text;
        email: ?Text;
        phone: ?Text;
    };

    public type Profile = {
        bio: Bio;
        id: Principal;
    };
    
    public type ProfileUpdate = {
        bio: Bio;
    };

    public type Error = {
        #NotFound;
        #AlreadyExists;
        #NotAuthorized;
        #Other : Text;
    };

};