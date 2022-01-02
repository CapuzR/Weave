

public shared(msg) func createFT (ft: FTUpdate) : async Result.Result<(), Error> {
        // Get caller principal
        let callerId = msg.caller;

        // Reject AnonymousIdentity
        if(Principal.toText(callerId) == "2vxsx-fae") {
            return #err(#NotAuthorized);
        };
        //Debo insertar el owner aqui.
        // Associate user profile with their principal
        let fT: FT = {
            id = fTNextId;
            formBase = ft.formBase;
            principal = callerId;
            fType = ft.fType;
            sharedWith = ft.sharedWith;
        };

        let (newFT, existing) = Trie.put(
            formTemplates,           // Target trie
            natKey(fTNextId),      // Key
            Nat.equal,
            fT
        );

        // If there is an original value, do not update
        switch(existing) {
            // If there are no matches, update profiles
            case null {
                formTemplates := newFT;
                fTNextId := fTNextId + 1;
                #ok(());
            };
            // Matches pattern of type - opt Profile
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


    public shared(msg) func updateFT (ft : FT) : async Result.Result<(), Error> {
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

                if(Principal.notEqual(ft.principal, callerId)) {
                    return #err(#NotAuthorized);
                };

                formTemplates := Trie.replace(
                    formTemplates,           // Target trie
                    natKey(ft.id),      // Key
                    Nat.equal,
                    ?ft
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