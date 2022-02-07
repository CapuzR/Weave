import { AuthClient } from "@dfinity/auth-client"; 
import {StoicIdentity} from "ic-stoic-identity";
import { canisterId, createActor } from "../../../../declarations/weaveForms/index";
const whitelist = [ canisterId, 'vttjj-zyaaa-aaaal-aabba-cai', 'aipdg-waaaa-aaaah-aaq5q-cai' ];
import { idlFactory }  from '../../../../declarations/weaveForms/weaveForms.did.js';
const network =
  process.env.DFX_NETWORK ||
  (process.env.NODE_ENV === "production" ? "ic" : "local");
const host = network != "ic" ? "http://localhost:8080" : "https://mainnet.dfinity.network";

export default {
  onSignInII,
  onSignInStoic,
  onSignOutStoic,
  onSignInPlug,
  verifyConnectionAndAgent,
  newActorPlug,
  newActorStoic,
  newActor,
};

async function onSignInII() {

  const authClient = await AuthClient.create();
    authClient.login({
    onSuccess: async () => {
        const identity = await authClient.getIdentity();
        localStorage.setItem("identity", JSON.stringify(identity));
        return true;
    },
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? "https://identity.ic0.app/#authorize"
        : "http://localhost:8000?canisterId=rkp4c-7iaaa-aaaaa-aaaca-cai"
    });
}

async function onSignInStoic() {
  const identity = await StoicIdentity.load();
  if (identity !== false) {
    return identity;
  } else {
    const identity = await StoicIdentity.connect();
    return identity;
  }
};

async function onSignOutStoic() {
const identity = await StoicIdentity.load();
if (identity !== false) {
  StoicIdentity.disconnect();
  return true;
} else {
  return false;
}
};

async function onSignInPlug() {
const isConnected = await window.ic.plug.requestConnect({
  whitelist: whitelist,
  host: host
});
if(isConnected) {
  // Get the user principal id
  return isConnected;
} else {
  return false;
}
};

async function verifyConnectionAndAgent() {
  const connected = await window.ic.plug.isConnected();
  if (!connected) window.ic.plug.requestConnect({ whitelist: whitelist, host: host });
  if (connected && !window.ic.plug.agent) {
    await window.ic.plug.createAgent({ host, whitelist })
    await window.ic.plug.agent.fetchRootKey();
  }
};

async function newActorStoic(identity){
  return await createActor(canisterId, {
    agentOptions: {
      identity: identity
    }
  })
};

async function newActorPlug(){
  await verifyConnectionAndAgent();
  return await window.ic.plug.createActor({
    canisterId: canisterId,
    interfaceFactory: idlFactory
  })
};

async function newActor(){
  if(localStorage.getItem('wallet') == 'Stoic') {
    return await newActorStoic(await onSignInStoic());
  } else if (localStorage.getItem('wallet') == 'Plug') {
    await verifyConnectionAndAgent();
    return newActorPlug();
  }
};