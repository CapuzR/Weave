
import login from "../../pages/Login/service";
BigInt.prototype.toJSON = function() { return this.toString()  };
import { Principal } from '@dfinity/principal';
import { getAllNFTS } from '@psychedelic/dab-js';
import { HttpAgent } from "@dfinity/agent";

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
    const agent = new HttpAgent({ host: 'https://ic0.app' });
    const collections = await getAllNFTS(
      agent,
      Principal.from(principal)
    );
    console.log(collections);
    return collections;
  };
  