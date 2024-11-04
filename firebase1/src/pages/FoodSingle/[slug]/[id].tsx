import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../../styles/firebase"; // Import Firebase configuration
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"; // Import Firestore functions
 
interface FoodItem {
  name: string;
  Price: string;
  Quantity: string;
}
 
const EditFoodItem = () => {
  const router = useRouter();
  const { id } = router.query; // Get dynamic `id` from the URL
  const [foodItem, setFoodItem] = useState<FoodItem>({
    name: "",
    Price: "",
    Quantity: "",
  });
  const [error, setError] = useState<string | null>(null);
 
  // Fetch food item data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const foodDocRef = doc(db, "FoodOrder", id as string);
          const foodDoc = await getDoc(foodDocRef);
 
          if (foodDoc.exists()) {
            setFoodItem(foodDoc.data() as FoodItem); // Set the fetched data to state
          } else {
            console.log("No document found!");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      }
    };
 
    fetchData();
  }, [id]);
 
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFoodItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 
  // Update food item in Firebase when "Update" button is clicked
  const handleUpdate = async () => {
    try {
      if (id) {
        const foodDocRef = doc(db, "FoodOrder", id as string); // Reference to the specific document
        // Only include the fields you want to update in Firestore
        const { name, Price, Quantity } = foodItem;
        await updateDoc(foodDocRef, { name, Price, Quantity });
        alert("Food item updated successfully");
        router.push("/GetFoodItems"); // Redirect to the food items list page after update
      }
    } catch (error) {
      console.error("Error updating food item:", error);
      setError("Error updating food item");
    }
  };
 
  // Delete food item from Firebase when "Delete" button is clicked
  const handleDelete = async () => {
    try {
      if (id) {
        const foodDocRef = doc(db, "FoodOrder", id as string); // Reference to the specific document
        await deleteDoc(foodDocRef); // Delete the document from Firebase
        alert("Food item deleted successfully");
        router.push("/GetFoodItems"); // Redirect to the food items list page after deletion
      }
    } catch (error) {
      console.error("Error deleting food item:", error);
      setError("Error deleting food item");
    }
  };
 
  return (
    <div className="flex justify-center items-center h-screen bg-teal-500">
      <div className="bg-blend-multiply shadow-2xl-gray p-6 rounded-lg border border-t-4 border-b-4 border-r-4 border-l-4 border-gray-950">
        <h2 className="text-2xl font-bold mb-4">Edit Food Item</h2>
 
        {error && <p className="text-red-500 mb-4">{error}</p>}
 
        <div className="mb-4">
          <label className="block text-gray-800 font-bold mb-2">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={foodItem.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
 
        <div className="mb-4">
          <label className="block text-gray-800 font-bold mb-2">Price</label>
          <input
            id="Price"
            name="Price"
            type="text"
            value={foodItem.Price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
 
        <div className="mb-4">
          <label className="block text-gray-800 font-bold mb-2">Quantity</label>
          <input
            id="Quantity"
            name="Quantity"
            type="text"
            value={foodItem.Quantity}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
 
        <div className="flex gap-4">
          <button
            onClick={handleUpdate}
            className="bg-black hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Update Food Item
          </button>
 
          <button
            onClick={handleDelete}
            className="bg-black hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Delete Food Item
          </button>
        </div>
      </div>
    </div>
  );
};
 
export default EditFoodItem;
 
