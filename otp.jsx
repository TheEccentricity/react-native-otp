import React, { useRef } from "react";
import { View, TextInput } from "react-native";

function OTPInput(props) {

    let inputs = [];
    let otpValue = [];
    for (let i = 0; i < props.length; i++) {
        inputs.push({ ref: useRef(i) });
        otpValue.push(props.value[i] !== undefined ? props.value[i] : "");
    }


    
    return (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
            {
                inputs.map((each, i) => {
                    return (
                        <View key={i} style={{ flex: 1 }}>
                            <TextInput
                                maxLength={1}
                                ref={each.ref}
                                keyboardType="numeric"
                                secureTextEntry={true}
                                textAlign="center"
                                style={{
                                    backgroundColor: '#F3F5F6',
                                    borderWidth: 1,
                                    borderColor: props?.invalid ? "#EE312A" : "#F3F5F6",
                                    borderRadius: 6,
                                    padding: 16,
                                    height: 48,
                                    width: 48,
                                    marginHorizontal: i > 1 ? 8 : 0,
                                    fontSize: 16,
                                    fontWeight: 'bold'
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