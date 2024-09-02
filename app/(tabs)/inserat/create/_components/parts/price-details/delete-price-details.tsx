import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";

const DeletePriceDetails = () => {

    const [showModal, setShowModal] = useState(false);

    return (
        <View>
            <TouchableOpacity>
                                                <FontAwesome name="trash" size={24} color="white" />
                                            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(false);
                }}

            >
                
            </Modal>
        </View>
    );
}

export default DeletePriceDetails;