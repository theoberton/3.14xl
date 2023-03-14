message Claim {
    password: Int;
}

contract Locker {
    hash: Int;
    item: Cell;

    init(hash: Int, item: Cell) {
        self.hash = hash;
        self.item = item;
    }

    receive(msg: Claim) {
        // check hash
        require(self.hash == msg.password, "Wrong password");

        send(SendParameters{
            to: sender(),
            bounce: true,
            value: 0,
            body: self.item,
            mode: SendRemainingBalance + SendIgnoreErrors
        });
    }
}