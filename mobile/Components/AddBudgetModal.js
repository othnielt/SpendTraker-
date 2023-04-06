

import React, { useRef } from "react";
import { Modal, View, TextInput, Button } from "react-native";
import { AddBudget } from "../Repository/Database";

export function AddBudgetModal({ show, handleClose, currentUser }) {
  const nameRef = useRef();
  const maxRef = useRef();

  function handleSubmit() {
    const name = nameRef.current.value;
    const max = parseFloat(maxRef.current.value);

    // Call the AddBudget function with the name and max values
    AddBudget(currentUser, name, max);

    // Close the modal
    handleClose();
  }

  return (
    <Modal visible={show} onRequestClose={handleClose}>
      <View>
        <TextInput
          ref={nameRef}
          placeholder="Name"
          style={{ margin: 10 }}
          required
        />
        <TextInput
          ref={maxRef}
          placeholder="Maximum Spending"
          keyboardType="numeric"
          style={{ margin: 10 }}
          required
          min={0}
          step={0.01}
        />
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Button title="Add" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
}
