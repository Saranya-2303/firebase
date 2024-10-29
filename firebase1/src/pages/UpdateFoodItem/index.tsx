import { db } from "../../styles/firebase"
import { useEffect, useState } from "react"
import { collection, doc, getDocs, updateDoc } from "firebase/firestore"
import Header from '@/Components/Subcomponents/Demoheader'


interface Product {
  name: string
  Price: string
  Quantity: string
  id: string
}

export default function ProductTable() {
  const [FoodItems, setFoodItems] = useState<Product[]>([]);
  const [Message, setMessage] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Fetch data from Firestore
  const fetchData = async () => {
    try {
      const userDocRef = collection(db, "FoodOrder");
      const foodIdget = await getDocs(userDocRef);
      const fetchedData = foodIdget.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Product)
      );
      setFoodItems(fetchedData);
      console.log("Fetched Data:", fetchedData);
    } catch (e) {
      console.error(e);
    }
  };

  // Handle edit button click
  const handleEditFoodItem = (product: Product) => {
    setEditingProduct(product); // Set the selected product for editing
  };

  // Handle the update of a food item
  const handleUpdateFoodItem = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editingProduct) {
      try {
        const userDocRef = doc(db, "FoodOrder", editingProduct.id);
        await updateDoc(userDocRef, {
          name: editingProduct.name,
          Price: editingProduct.Price,
          Quantity: editingProduct.Quantity,
        });
        setMessage(`Food item updated successfully for id: ${editingProduct.id}`);
        fetchData();
        setEditingProduct(null); // Clear the editing state
    }
    catch (error) {
      if (error instanceof Error) {
        setMessage(`Update failed for id: {FoodId}, Error: ${error.message}`);
      } else {
        setMessage(`Update failed for id: {FoodId}, An unknown error occurred.`);
      }
    }

  };
  }
  // Handle form input change for editing
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (editingProduct) {
      setEditingProduct({ ...editingProduct, [name]: value });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
     <Header/> 
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <caption className="caption-top text-lg font-semibold py-2">A simple table of product inventory</caption>
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 w-[200px] text-left border border-gray-300">Name</th>
            <th className="px-4 py-2 text-right border border-gray-300">Price</th>
            <th className="px-4 py-2 text-right border border-gray-300">Quantity</th>
            <th className="px-4 py-2 text-right border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {FoodItems.map((product) => (
            <tr key={product.id}>
              <td className="px-4 py-2 border border-gray-300 font-medium">{product.name}</td>
              <td className="px-4 py-2 text-right border border-gray-300">${product.Price}</td>
              <td className="px-4 py-2 text-right border border-gray-300">{product.Quantity}</td>
              <td className="px-4 py-2 text-right border border-gray-300">
                <button
                  onClick={() => handleEditFoodItem(product)}
                  className="bg-blue-500 text-white p-2 border rounded-lg"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Editing Form */}
      {editingProduct && (
        <form onSubmit={handleUpdateFoodItem} className="mt-4 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Edit Product</h3>
          <div className="mb-2">
            <label className="block">Name:</label>
            <input
              type="text"
              name="name"
              value={editingProduct.name}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block">Price:</label>
            <input
              type="text"
              name="Price"
              value={editingProduct.Price}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-2">
            <label className="block">Quantity:</label>
            <input
              type="text"
              name="Quantity"
              value={editingProduct.Quantity}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <button type="submit" className="bg-green-500 text-white p-2 rounded">Update</button>
        </form>
      )}

      {/* Message display */}
      <div className="flex justify-center w-[600px] items-center p-3">
        {Message && (
          <div className="p-3 bg-green-500/45">
            <p className="text-white">{Message}</p>
          </div>
        )}
      </div>
    </>
  );
}
