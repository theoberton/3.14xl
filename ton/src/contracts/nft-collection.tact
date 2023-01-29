import "@stdlib/ownable";
import "@stdlib/deploy";

message MintItem {
    to: Address;
}

struct TokenTransferInternal {
    queryId: Int as uint64;
    from: Address;
    forwardTonAmount: Int as coins;
    forwardPayload: Slice as remaining;
}

contract NftCollection with Deployable, Ownable {
    owner: Address;
    // content: String;
    total_supply: Int = 0;


    init(owner: Address) {
        self.owner = owner;
    }

    receive(msg: MintItem) {
        // self.total_supply = self.total_supply + 1;

        let winit: StateInit = initOf NftItem(myAddress(), msg.to);
        let walletAddress: Address = contractAddress(winit);

        send(SendParameters{
            to: walletAddress, 
            value: 0, 
            bounce: false,
            mode: SendRemainingValue,
            body: TokenTransferInternal{ 
                queryId: 0,
                from: myAddress(),
                forwardTonAmount: 0,
                forwardPayload: emptySlice()
            }.toCell(),
            code: winit.code,
            data: winit.data
        });
    }

    get fun total_supply(): Int {
        return self.total_supply;
    }
}
    