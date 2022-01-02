module {

  // public type Username = Text;

  public type SType = {
    #owner; //change in ownership have to be notified and approved by every form filler.
    #editor;
    #reader;
  };

  public type SharedType = {
    // username: Username;
    principal: Principal;
    sType: SType; 
  };
    
  public type Form = {
    id : Nat;
    createdOn : Int;
    principal: Principal;
    title : Text;
    description : Text;
    fType: FType;
    sharedWith: [SharedType];
    
    // questions: [Question];
  };

  public type NewForm = {
    id : Nat;
    title : Text;
    description : Text;
    fType: FType;
    // questions: [Question];
  };


  public type FType = {
    #pub;
    #priv;
  };

  public type Question = {
    id : Nat;
    principal: Principal;
    formId: Nat;
    question : Text;
    qType : QType;
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
  };

  public type Answer = {
    id : Nat;
    principal: Principal;
    questionId: Nat;
    answer : Text;
    qType : QType;
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