import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from '../../../styles/firebase';
import { doc, getDoc } from "firebase/firestore";

interface Product {
  name: string;
  Price: string;
  Quantity: string;
  id: string;
}

const SingleFoodItem = () => {
  const router = useRouter();
  const { query } = router;

  const [foodItem, setFoodItem] = useState<Product>({
    name: "",
    Price: "",
    Quantity: "",
    id: "",
  });

  const fetchData = async () => {
    try {
      const foodDocRef = doc(db, "FoodOrder", router.query.id as string);
      const foodDoc = await getDoc(foodDocRef);

      if (foodDoc.exists()) {
        const fetchedData = { id: foodDoc.id, ...foodDoc.data() } as Product;
        setFoodItem(fetchedData);
        console.log("Fetched Data:", fetchedData);
      } else {
        console.log("No document found!");
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      fetchData();
    }
  }, [router.query.id]);

  console.log("Get Food Id", query.id,query.slug, "Get data:", foodItem);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 via-gray-700 to-black">
      <div className="flex flex-col gap-4 bg-white shadow-lg rounded-lg h-[400px] w-[350px] p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-800 border-b pb-2">Food Item Details</h1>
        <div className="text-left">
          <h2 className="text-xl font-semibold text-gray-700">Name: <span className="text-gray-900">{foodItem.name}</span></h2>
          <p className="text-lg text-gray-600 mt-2">Price: <span className="text-gray-900">${foodItem.Price}</span></p>
          <p className="text-lg text-gray-600 mt-2">Quantity: <span className="text-gray-900">{foodItem.Quantity}</span></p>
        </div>
      </div>
    </div>
  );
};

export default SingleFoodItem;
