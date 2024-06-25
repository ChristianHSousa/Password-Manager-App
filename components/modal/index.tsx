import { View, StyleSheet, Text, TouchableOpacity, Pressable, KeyboardAvoidingView, TextInput } from "react-native";
import * as Clipboard from 'expo-clipboard'
import { Dropdown } from 'react-native-element-dropdown';
import { useCategoryDatabase, CategoryDatabaseType } from '@/database/useCategoryDatabase';
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";

export function ModalPassword({ password, handleClose }: any) {
    const CategoryDatabase = useCategoryDatabase();
    const focused = useIsFocused;
    const [listCategories, setListCategories] = useState<CategoryDatabaseType[]>([]);
    async function handleCopyPassword() {
        await Clipboard.setStringAsync(password)
    }

    useEffect(() => {
        async function loadCategories() {
            setListCategories([]);
            const categories = await CategoryDatabase.getAllName();

            setListCategories(categories);
        }
        loadCategories();
    }, [focused])

    return (

        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Senha gerada</Text>

                <Pressable style={styles.innerPassword} onLongPress={handleCopyPassword}>
                    <Text style={styles.text}>{password}</Text>
                </Pressable>
                <View style={styles.buttonArea}>

                    <TouchableOpacity style={styles.button} onPress={handleClose}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleCopyPassword}>
                        <Text style={[styles.buttonSaveText, styles.buttonText]}>Salvar</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(24,24,24,0.6)",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    content: {
        backgroundColor: "#FFF",
        width: "85%",
        paddingTop: 24,
        paddingBottom: 24,
        alignItems: "center",
        borderRadius: 8
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 24,
    },
    innerPassword: {
        backgroundColor: "#0E0E0E",
        width: "90%",
        padding: 14,
        borderRadius: 8
    },
    text: {
        color: "#FFF",
        textAlign: "center",
    },
    buttonArea: {
        flexDirection: "row",
        width: "90%",
        alignItems: "center",
        marginTop: 8,
        justifyContent: "space-between"
    },
    button: {
        flex: 1,
        alignItems: "center",
        marginTop: 14,
        marginBottom: 14,
        padding: 8,
        borderRadius: 8
    },
    buttonSave: {
        backgroundColor: "#392DE9",
    },
    buttonText: {
        fontWeight: "bold"
    },
    buttonSaveText: {
        color: "#FFF"
    }
})