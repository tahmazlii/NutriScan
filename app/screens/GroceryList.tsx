import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, TouchableOpacity, TextInput, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";

const initialGroceries = [
  { id: "1", name: "Apples", quantity: 2, unit: "kg", image: "https://placehold.co/100x100/green/white?text=Apples" },
  { id: "2", name: "Bananas", quantity: 1, unit: "dozen", image: "https://placehold.co/100x100/yellow/black?text=Bananas" },
  { id: "3", name: "Carrots", quantity: 1.5, unit: "kg", image: "https://placehold.co/100x100/orange/white?text=Carrots" },
];

const GroceryList = () => {
  const navigation = useNavigation();
  const [groceries, setGroceries] = useState(initialGroceries);
  const [modalVisible, setModalVisible] = useState(false);
  const [newGrocery, setNewGrocery] = useState({ name: "", quantity: "", unit: "" });
  const [editing, setEditing] = useState<{ [key: string]: boolean }>({});
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  // Handle opening the add modal
  const handleOpenModal = () => {
    console.log('Opening modal...');
    setNewGrocery({ name: "", quantity: "", unit: "" }); // Reset form
    setModalVisible(true);
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setNewGrocery((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Reset form
  const resetForm = () => {
    setNewGrocery({ name: "", quantity: "", unit: "" });
    setModalVisible(false);
  };

  // Add New Grocery
  const handleAddGrocery = () => {
    const name = newGrocery.name.trim();
    const quantity = newGrocery.quantity.trim();
    const unit = newGrocery.unit.trim();
    
    if (!name || !quantity || !unit) {
      // Add validation feedback here if needed
      return;
    }

    const parsedQuantity = parseFloat(quantity);
    if (isNaN(parsedQuantity)) {
      // Add validation feedback here if needed
      return;
    }

    const newItem = {
      id: Date.now().toString(), // Use timestamp for unique ID
      name: name,
      quantity: parsedQuantity,
      unit: unit,
      image: `https://placehold.co/100x100/green/white?text=${encodeURIComponent(name)}`,
    };

    setGroceries((currentGroceries) => [...currentGroceries, newItem]);
    resetForm();
  };

  // Increase Quantity
  const increaseQuantity = (id: string) => {
    setGroceries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id: string) => {
    setGroceries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item))
    );
  };

  // Toggle Edit Mode
  const toggleEditMode = (id: string) => {
    setEditing((prev) => ({ ...prev, [id]: !prev[id] }));
    setInputValues((prev) => ({ ...prev, [id]: groceries.find((item) => item.id === id)?.quantity.toString() || "0" }));
  };

  // Confirm Edited Quantity
  const confirmQuantity = (id: string) => {
    const numericValue = parseFloat(inputValues[id] || "0");
    if (!isNaN(numericValue) && numericValue >= 0) {
      setGroceries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity: numericValue } : item))
      );
    }
    setEditing((prev) => ({ ...prev, [id]: false })); // Exit edit mode
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔙 Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Grocery List</Text>

      {/* ➕ Floating Add Button */}
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={handleOpenModal}
        activeOpacity={0.7}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <FlatList
        data={groceries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.itemName}>{item.name}</Text>

              {editing[item.id] ? (
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={inputValues[item.id]}
                  onChangeText={(value) => setInputValues((prev) => ({ ...prev, [item.id]: value }))}
                />
              ) : (
                <Text style={styles.itemQuantity}>
                  {item.quantity} {item.unit}
                </Text>
              )}
            </View>

            {/* ➖ Minus Button (Darker Green) */}
            <TouchableOpacity style={styles.minusButton} onPress={() => decreaseQuantity(item.id)}>
              <Text style={styles.buttonText}>−</Text>
            </TouchableOpacity>

            {/* ✏️ Edit/Confirm Button (White Background) */}
            <TouchableOpacity
              style={editing[item.id] ? styles.confirmButton : styles.editButton}
              onPress={() => (editing[item.id] ? confirmQuantity(item.id) : toggleEditMode(item.id))}
            >
              <Text style={styles.editButtonText}>{editing[item.id] ? "✔" : "✏️"}</Text>
            </TouchableOpacity>

            {/* ➕ Plus Button (Darker Green) */}
            <TouchableOpacity style={styles.plusButton} onPress={() => increaseQuantity(item.id)}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* 📌 Add Grocery Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>Add New Grocery</Text>
            
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.modalInput} 
                placeholder="Grocery Name" 
                value={newGrocery.name} 
                onChangeText={(text) => handleInputChange('name', text)}
                placeholderTextColor="#666"
              />
              <TextInput 
                style={styles.modalInput} 
                placeholder="Quantity" 
                keyboardType="numeric" 
                value={newGrocery.quantity} 
                onChangeText={(text) => handleInputChange('quantity', text)}
                placeholderTextColor="#666"
              />
              <TextInput 
                style={styles.modalInput} 
                placeholder="Unit (kg, pcs, etc.)" 
                value={newGrocery.unit} 
                onChangeText={(text) => handleInputChange('unit', text)}
                placeholderTextColor="#666"
              />
            </View>
            
            <TouchableOpacity 
              style={[
                styles.modalAddButton,
                (!newGrocery.name || !newGrocery.quantity || !newGrocery.unit) && styles.modalAddButtonDisabled
              ]} 
              onPress={handleAddGrocery}
              disabled={!newGrocery.name || !newGrocery.quantity || !newGrocery.unit}
            >
              <Text style={styles.modalAddButtonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#E8F5E9" },

  backButton: { padding: 10 },
  backText: { fontSize: 16, fontWeight: "bold", color: "#2E7D32" },

  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 },

  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  image: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
  details: { flex: 1 },
  itemName: { fontSize: 18, fontWeight: "bold", color: "#2E7D32" },
  itemQuantity: { fontSize: 16, color: "#333" },

  // 📝 Input Field for Editing
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 5,
    width: 60,
    textAlign: "center",
    fontSize: 16,
    backgroundColor: "white",
  },

  // ➖➕ Buttons
  minusButton: { backgroundColor: "#145A32", width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" },
  plusButton: { backgroundColor: "#145A32", width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },

  // ✏️ Edit Button (White Background)
  editButton: { backgroundColor: "white", borderWidth: 1, borderColor: "#FFA726", width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" },
  editButtonText: { color: "#FFA726", fontSize: 18, fontWeight: "bold" },

  // ✔ Confirm Button (Green)
  confirmButton: { backgroundColor: "#2E7D32", width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" },

  // ➕ Floating Add Button
  addButton: { 
    position: "absolute", 
    bottom: 20, 
    right: 20, 
    backgroundColor: "#2E7D32", 
    width: 60,  // Increased size
    height: 60, // Increased size
    borderRadius: 30, 
    justifyContent: "center", 
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1,
  },
  addButtonText: { 
    color: "white", 
    fontSize: 32,  // Increased size
    fontWeight: "bold",
    marginTop: -2, // Optical alignment
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 15,
    width: "85%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2E7D32",
    textAlign: "center",
  },
  inputContainer: {
    gap: 15,
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#F5F5F5",
    color: "#333",
  },
  modalAddButton: {
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  modalAddButtonDisabled: {
    backgroundColor: "#A5D6A7",  // lighter green
    opacity: 0.7,
  },
  modalAddButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GroceryList;
