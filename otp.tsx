import React, { useRef } from "react";
import { View, TextInput } from "react-native";

function OTPInput(props: OtpInputProps) {
    type Ref = {
        ref: React.MutableRefObject<any>
    };
    let inputs: Array<Ref> = [];
    let otpValue: Array<string> = [];
    for (let i = 0; i < props.length; i++) {
        inputs.push({ ref: useRef(i) });
        otpValue.push(props.value[i] !== undefined ? props.value[i] : "");
    }

    return (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
            {
                inputs.map((each, i) => {
                    return (
                        <View key={i} style={{ flex: 1 }}>
                            <TextInput
                                maxLength={1}
                                ref={each.ref}
                                keyboardType="numeric"
                                textAlign="center"
                                style={{
                                    borderWidth: 0.5,
                                    borderColor: props?.invalid ? "#B42318" : "#D8D8DD",
                                    color: props.invalid ? "#B42318" : "#5F738C",
                                    borderRadius: 6,
                                    padding: 16,
                                    height: 64,
                                    width: '90%',
                                    fontSize: 24,
                                    fontWeight: '500',
                                    margin: 'auto'
                                }}
                                onChangeText={(e) => {
                                    if (e.length > 0) {
                                        otpValue.splice(i, 1, e);
                                        props.onChange && props.onChange(otpValue.join(""));
                                        if (i >= props.length - 1) return;
                                        inputs[i + 1].ref.current.focus();
                                    } else {
                                        otpValue.splice(i, 1, "");
                                        props.onChange && props.onChange(otpValue.join(""));
                                        if (i <= 0) return;
                                        inputs[i - 1].ref.current.focus();
                                    }

                                }}
                                onKeyPress={(e) => {
                                    if (e.nativeEvent.key.toLowerCase() === "backspace") {
                                        if (i <= 0) return;
                                        inputs[i - 1].ref.current.focus();
                                    }
                                }}
                            />
                        </View>
                    )
                })
            }
        </View>
    )
}

export default OTPInput;