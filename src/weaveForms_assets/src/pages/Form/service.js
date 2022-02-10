
import login from "../Login/service";
BigInt.prototype.toJSON = function() { return this.toString()  };
import { Principal } from '@dfinity/principal';
import { getAllUserNFTs } from '@psychedelic/dab-js';
import { getNFTActor } from '@psychedelic/dab-js';
import { HttpAgent } from "@dfinity/agent";
import { canisterId } from "../../../../declarations/weaveForms/index";
const whitelist = [ canisterId, 'vttjj-zyaaa-aaaal-aabba-cai', 'aipdg-waaaa-aaaah-aaq5q-cai' ];

const network =
  process.env.DFX_NETWORK ||
  (process.env.NODE_ENV === "production" ? "ic" : "local");
const host = network != "ic" ? "http://localhost:8080" : "https://mainnet.dfinity.network";

const state = {
  form: [],
  selectedForm: undefined,
  user: JSON.parse(localStorage.getItem("identity")),
  selectedQuestion: undefined,
};


export default {
    getFormData,
    submitAnswers,
    isAccessible,
    state,
}

const getUserNFTs = async (nFTCol, principal, agent) => {
  const NFTActor = await getNFTActor({ canisterId: nFTCol.canisterId, agent: agent, standard: nFTCol.standard });
  console.log('Pasa 3')
  await NFTActor.getUserTokens(Principal.fromText(principal));
  console.log('nFTActor', await NFTActor.getUserTokens(Principal.fromText(principal)));
}

async function isAccessible(formId) {

  let actor = await login.newActor();
  let principal = JSON.parse(localStorage.getItem('_scApp')).principal;
  console.log('pasa 1');
  //Recibe el canisterID de la colección
  const lockedFormBy = await actor.nFTGatedWith(parseInt(formId));
  console.log('lockedFormBy', lockedFormBy)
  //consultar en DAB

    const agent = new HttpAgent({ host: host });
    console.log('Pasa 2')
    await getUserNFTs(lockedFormBy.ok, principal, agent);

};

async function getFormData(formId) {
  let actor = await login.newActor();
  const form = await actor.readFTById(parseInt(formId));
  
  if (Object.keys(form) != 'err') {
    state.form = form.ok[0];
    const s = Object.assign({}, state, {
      selectedForm: undefined,
      selectedQuestion: undefined,
    });
    return s;
  } else {
    alert("Error, you don't have access to this form.");
    location.reload();
  }
};

async function submitAnswers(form) {
    let actor = await login.newActor();
    const res = await actor.createFF({fTId: parseInt(form.id)}, form.answers);
    
    if (Object.keys(res) != 'err') {
        return form;
    } else {
      alert("Error, you don't have access to this form.");
      location.reload();
    }
  };