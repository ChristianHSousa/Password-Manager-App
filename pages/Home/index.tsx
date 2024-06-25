import React, { useState } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, KeyboardAvoidingView, TextInput, } from "react-native"
import Slider from '@react-native-community/slider'
import { ModalPassword } from '../../components/modal'
import { CategoryModalPanel } from "@/components/modal/Category"

export function Home() {

    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$"

    const [size, setSize] = useState(10);
    const [passwordValue, setPasswordValue] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [categoryModal, setCategoryModalVisible] = useState(false);
    function generatePassword() {

        let password = "";
        for (let i = 0, n = charset.length; i < size; i++) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
        setPasswordValue(password);
        setModalVisible(true);
    }

    function CallCategoryModal() {
        setCategoryModalVisible(true);
    }

    return (


        <View style={styles.container}>
            <Image
                source={require('@/assets/images/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>{size} caracteres</Text>
            <View style={styles.area}>
                <Slider
                    style={{ height: 50 }}
                    minimumValue={6}
                    maximumValue={20}
                    maximumTrackTintColor="#FF0000"
                    minimumTrackTintColor="#392de9"
                    thumbTintColor="#392de9"
                    value={size}
                    onValueChange={(value) => setSize(parseInt(value.toFixed(0)))}
                >

                </Slider>
            </View>

            <TouchableOpacity style={styles.button} onPress={generatePassword}>
                <Text style={styles.buttonText}>Gerar Senha</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.buttonCategory]} onPress={CallCategoryModal}>
                <Text style={styles.buttonText}>Gerenciar categorias</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="fade" transparent={true}>
                <ModalPassword password={passwordValue} handleClose={() => setModalVisible(false)} />
            </Modal>

            <Modal visible={categoryModal} animationType="fade" transparent={true}>
                <CategoryModalPanel handleClose={() => setCategoryModalVisible(false)} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F3FF",
        alignItems: "center"
    },
    logo: {
        marginTop: "10%",
        marginBottom: "30%"
    },
    area: {
        marginTop: 14,
        marginBottom: 14,
        width: "70%",
        backgroundColor: "#FFF",
        borderRadius: 8,
        padding: 8
    },
    button: {
        backgroundColor: "#392de9",
        width: "70%",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginBottom: 18
    },
    buttonCategory:{
        backgroundColor:"#FFA500"
    },
    buttonText: {
        color: "#FFF",
        fontSize: 20
    },
    title: {
        fontSize: 30,
        fontWeight: "bold"
    }
})