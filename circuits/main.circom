include "../circomlib/circuits/poseidon.circom";
include "../circomlib/circuits/comparators.circom";

template Main() {
    signal input hash_code;
    signal input locker_id;
    signal input codigo_secreto;

    signal output is_valid;

    component hasher = Poseidon(1);
    hasher.inputs[0] <== codigo_secreto;

    component check = IsEqual();
    check.in[0] <== hasher.out;
    check.in[1] <== hash_code;

    is_valid <== check.out;
}

component main = Main();

