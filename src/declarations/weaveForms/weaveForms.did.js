export const idlFactory = ({ IDL }) => {
  const NewAnswer = IDL.Record({ 'fQId' : IDL.Nat, 'answer' : IDL.Text });
  const Error = IDL.Variant({
    'NotFound' : IDL.Null,
    'NotAuthorized' : IDL.Null,
    'AlreadyExists' : IDL.Null,
    'Other' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : Error });
  const NewFF = IDL.Record({ 'fTId' : IDL.Nat });
  const FormBaseUpdate = IDL.Record({
    'title' : IDL.Text,
    'description' : IDL.Text,
  });
  const SType = IDL.Variant({
    'owner' : IDL.Null,
    'editor' : IDL.Null,
    'reader' : IDL.Null,
  });
  const SharedType = IDL.Record({ 'ppal' : IDL.Text, 'sType' : SType });
  const NFTCol = IDL.Record({
    'name' : IDL.Text,
    'standard' : IDL.Text,
    'canisterId' : IDL.Text,
  });
  const QType = IDL.Variant({
    'principal' : IDL.Null,
    'checkboxes' : IDL.Null,
    'date' : IDL.Null,
    'text' : IDL.Null,
    'time' : IDL.Null,
    'shortAnswer' : IDL.Null,
    'multipleChoice' : IDL.Null,
    'paragraph' : IDL.Null,
    'dropdown' : IDL.Null,
  });
  const QT = IDL.Record({
    'id' : IDL.Nat,
    'question' : IDL.Text,
    'qType' : QType,
  });
  const FType = IDL.Variant({ 'pub' : IDL.Null, 'priv' : IDL.Null });
  const FTInit = IDL.Record({
    'formBase' : FormBaseUpdate,
    'sharedWith' : IDL.Vec(SharedType),
    'nFTCol' : NFTCol,
    'questions' : IDL.Vec(QT),
    'fType' : FType,
  });
  const NFTCol__1 = IDL.Record({
    'name' : IDL.Text,
    'standard' : IDL.Text,
    'canisterId' : IDL.Text,
  });
  const Result_6 = IDL.Variant({ 'ok' : NFTCol__1, 'err' : Error });
  const FormBase = IDL.Record({
    'title' : IDL.Text,
    'createdOn' : IDL.Int,
    'description' : IDL.Text,
  });
  const Answer = IDL.Record({
    'id' : IDL.Nat,
    'principal' : IDL.Principal,
    'fQId' : IDL.Nat,
    'qType' : QType,
    'createdOn' : IDL.Int,
    'lastUpdate' : IDL.Int,
    'answer' : IDL.Text,
  });
  const FFilledQuestion = IDL.Record({
    'id' : IDL.Nat,
    'principal' : IDL.Principal,
    'question' : IDL.Text,
    'answers' : IDL.Vec(Answer),
    'fFId' : IDL.Vec(IDL.Nat),
    'qType' : QType,
    'createdOn' : IDL.Int,
  });
  const FFF = IDL.Record({
    'id' : IDL.Nat,
    'principal' : IDL.Principal,
    'fTId' : IDL.Nat,
    'createdOn' : IDL.Int,
    'formBase' : FormBase,
    'questions' : IDL.Vec(FFilledQuestion),
  });
  const Result_3 = IDL.Variant({ 'ok' : IDL.Vec(FFF), 'err' : Error });
  const FT = IDL.Record({
    'id' : IDL.Nat,
    'principal' : IDL.Principal,
    'formBase' : FormBase,
    'sharedWith' : IDL.Vec(SharedType),
    'nFTCol' : NFTCol,
    'questions' : IDL.Vec(QT),
    'fType' : FType,
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Vec(FT), 'err' : Error });
  const Answer__1 = IDL.Record({
    'id' : IDL.Nat,
    'principal' : IDL.Principal,
    'fQId' : IDL.Nat,
    'qType' : QType,
    'createdOn' : IDL.Int,
    'lastUpdate' : IDL.Int,
    'answer' : IDL.Text,
  });
  const Result_5 = IDL.Variant({ 'ok' : IDL.Vec(Answer__1), 'err' : Error });
  const FF = IDL.Record({
    'id' : IDL.Nat,
    'principal' : IDL.Principal,
    'fTId' : IDL.Nat,
    'createdOn' : IDL.Int,
    'formBase' : FormBase,
  });
  const Result_4 = IDL.Variant({ 'ok' : IDL.Vec(FF), 'err' : Error });
  const FilledQuestion = IDL.Record({
    'id' : IDL.Nat,
    'principal' : IDL.Principal,
    'question' : IDL.Text,
    'fFId' : IDL.Vec(IDL.Nat),
    'qType' : QType,
    'createdOn' : IDL.Int,
  });
  const Result_2 = IDL.Variant({
    'ok' : IDL.Vec(FilledQuestion),
    'err' : Error,
  });
  const FTUpdate = IDL.Record({
    'id' : IDL.Nat,
    'formBase' : FormBaseUpdate,
    'sharedWith' : IDL.Vec(SharedType),
    'nFTCol' : NFTCol,
    'questions' : IDL.Vec(QT),
    'fType' : FType,
  });
  return IDL.Service({
    'createAnswers' : IDL.Func([IDL.Vec(NewAnswer)], [Result], []),
    'createFF' : IDL.Func([NewFF, IDL.Vec(NewAnswer)], [Result], []),
    'createFT' : IDL.Func([FTInit], [Result], []),
    'deleteFT' : IDL.Func([IDL.Nat], [Result], []),
    'getNextFTId' : IDL.Func([], [IDL.Nat], ['query']),
    'nFTGatedWith' : IDL.Func([IDL.Nat], [Result_6], ['query']),
    'readAnswersByFormId' : IDL.Func([IDL.Nat], [Result_3], []),
    'readFTById' : IDL.Func([IDL.Nat], [Result_1], []),
    'readMyAbyQId' : IDL.Func([IDL.Nat], [Result_5], []),
    'readMyFF' : IDL.Func([], [Result_4], []),
    'readMyFFF' : IDL.Func([], [Result_3], []),
    'readMyFQbyFormId' : IDL.Func([IDL.Nat], [Result_2], []),
    'readOwnedFT' : IDL.Func([], [Result_1], []),
    'updateFT' : IDL.Func([FTUpdate], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
