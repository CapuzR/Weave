import type { Principal } from '@dfinity/principal';
export interface Answer {
  'id' : bigint,
  'principal' : Principal,
  'fQId' : bigint,
  'qType' : QType,
  'createdOn' : bigint,
  'lastUpdate' : bigint,
  'answer' : string,
}
export interface Answer__1 {
  'id' : bigint,
  'principal' : Principal,
  'fQId' : bigint,
  'qType' : QType,
  'createdOn' : bigint,
  'lastUpdate' : bigint,
  'answer' : string,
}
export type Error = { 'NotFound' : null } |
  { 'NotAuthorized' : null } |
  { 'AlreadyExists' : null } |
  { 'Other' : string };
export interface FF {
  'id' : bigint,
  'principal' : Principal,
  'fTId' : bigint,
  'createdOn' : bigint,
  'formBase' : FormBase,
}
export interface FFF {
  'id' : bigint,
  'principal' : Principal,
  'fTId' : bigint,
  'createdOn' : bigint,
  'formBase' : FormBase,
  'questions' : Array<FFilledQuestion>,
}
export interface FFilledQuestion {
  'id' : bigint,
  'principal' : Principal,
  'question' : string,
  'answers' : Array<Answer>,
  'fFId' : Array<bigint>,
  'qType' : QType,
  'createdOn' : bigint,
}
export interface FT {
  'id' : bigint,
  'principal' : Principal,
  'formBase' : FormBase,
  'sharedWith' : Array<SharedType>,
  'nFTCol' : NFTCol,
  'questions' : Array<QT>,
  'fType' : FType,
}
export interface FTInit {
  'formBase' : FormBaseUpdate,
  'sharedWith' : Array<SharedType>,
  'nFTCol' : NFTCol,
  'questions' : Array<QT>,
  'fType' : FType,
}
export interface FTUpdate {
  'id' : bigint,
  'formBase' : FormBaseUpdate,
  'sharedWith' : Array<SharedType>,
  'nFTCol' : NFTCol,
  'questions' : Array<QT>,
  'fType' : FType,
}
export type FType = { 'pub' : null } |
  { 'priv' : null };
export interface FilledQuestion {
  'id' : bigint,
  'principal' : Principal,
  'question' : string,
  'fFId' : Array<bigint>,
  'qType' : QType,
  'createdOn' : bigint,
}
export interface FormBase {
  'title' : string,
  'createdOn' : bigint,
  'description' : string,
}
export interface FormBaseUpdate { 'title' : string, 'description' : string }
export interface NFTCol {
  'name' : string,
  'standard' : string,
  'canisterId' : string,
}
export interface NFTCol__1 {
  'name' : string,
  'standard' : string,
  'canisterId' : string,
}
export interface NewAnswer { 'fQId' : bigint, 'answer' : string }
export interface NewFF { 'fTId' : bigint }
export interface QT { 'id' : bigint, 'question' : string, 'qType' : QType }
export type QType = { 'principal' : null } |
  { 'checkboxes' : null } |
  { 'date' : null } |
  { 'text' : null } |
  { 'time' : null } |
  { 'shortAnswer' : null } |
  { 'multipleChoice' : null } |
  { 'paragraph' : null } |
  { 'dropdown' : null };
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : Array<FT> } |
  { 'err' : Error };
export type Result_2 = { 'ok' : Array<FilledQuestion> } |
  { 'err' : Error };
export type Result_3 = { 'ok' : Array<FFF> } |
  { 'err' : Error };
export type Result_4 = { 'ok' : Array<FF> } |
  { 'err' : Error };
export type Result_5 = { 'ok' : Array<Answer__1> } |
  { 'err' : Error };
export type Result_6 = { 'ok' : NFTCol__1 } |
  { 'err' : Error };
export type SType = { 'owner' : null } |
  { 'editor' : null } |
  { 'reader' : null };
export interface SharedType { 'ppal' : string, 'sType' : SType }
export interface _SERVICE {
  'createAnswers' : (arg_0: Array<NewAnswer>) => Promise<Result>,
  'createFF' : (arg_0: NewFF, arg_1: Array<NewAnswer>) => Promise<Result>,
  'createFT' : (arg_0: FTInit) => Promise<Result>,
  'deleteFT' : (arg_0: bigint) => Promise<Result>,
  'getNextFTId' : () => Promise<bigint>,
  'nFTGatedWith' : (arg_0: bigint) => Promise<Result_6>,
  'readAnswersByFormId' : (arg_0: bigint) => Promise<Result_3>,
  'readFTById' : (arg_0: bigint) => Promise<Result_1>,
  'readMyAbyQId' : (arg_0: bigint) => Promise<Result_5>,
  'readMyFF' : () => Promise<Result_4>,
  'readMyFFF' : () => Promise<Result_3>,
  'readMyFQbyFormId' : (arg_0: bigint) => Promise<Result_2>,
  'readOwnedFT' : () => Promise<Result_1>,
  'updateFT' : (arg_0: FTUpdate) => Promise<Result>,
}
