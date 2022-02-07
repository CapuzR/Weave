
import login from "../../pages/Login/service";
BigInt.prototype.toJSON = function() { return this.toString()  };
import { Principal } from '@dfinity/principal';
import { getAllNFTS } from '@psychedelic/dab-js';
import { HttpAgent } from "@dfinity/agent";

const network =
  process.env.DFX_NETWORK ||
  (process.env.NODE_ENV === "production" ? "ic" : "local");
const host = network != "ic" ? "http://localhost:8080" : "https://mainnet.dfinity.network";

export default {
    getNFTList
  };

  async function getNFTList() {
    let principal;
    if(localStorage.getItem('wallet') == 'Stoic') {
      principal = JSON.parse(localStorage.getItem('_scApp')).principal;
    } else if (localStorage.getItem('wallet') == 'Plug') {
      principal = await window.ic.plug.getPrincipal();
    }
    const agent = new HttpAgent({ host: host });
    const collections = await getAllNFTS(
      agent,
      Principal.from(principal)
    );
    return collections;
  };
  