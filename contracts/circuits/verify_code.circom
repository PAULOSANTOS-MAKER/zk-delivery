pragma circom 2.0.0;

include "poseidon.circom";
include "comparators.circom";

template VerifyCode() {
    signal input code;
    signal input hashCode;
    signal output valid;

    component hasher = Poseidon(1);
    hasher.inputs[0] <== code;

    component isEqual = IsEqual();
    isEqual.in[0] <== hasher.out;
    isEqual.in[1] <== hashCode;

    valid <== isEqual.out;
}

component main = VerifyCode();
