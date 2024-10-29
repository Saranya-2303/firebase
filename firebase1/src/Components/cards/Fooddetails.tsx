import React, { useState } from 'react';
// import FoodModel from './FoodModel';

const FoodDetails = () => { // Changed the component name to start with an uppercase letter
    const [searchQuery, setSearchQuery] =useState("");
    const orderDetails = [ // Changed the variable name to follow camelCase convention
        {
            "id": 1,
            "name": "Apple",
            "category": "Fruits",
            "price": 0.5,
            "calories": 95,
            "ingredients": ["Apple"]
        },
        {
            "id": 2,
            "name": "Banana",
            "category": "Fruits",
            "price": 0.3,
            "calories": 105,
            "ingredients": ["Banana"]
        },
        {
            "id": 3,
            "name": "Chicken Breast",
            "category": "Meat",
            "price": 5.0,
            "calories": 165,
            "ingredients": ["Chicken"]
        },
        {
            "id": 4,
            "name": "Broccoli",
            "category": "Vegetables",
            "price": 1.2,
            "calories": 55,
            "ingredients": ["Broccoli"]
        },
        {
            "id": 5,
            "name": "Rice",
            "category": "Grains",
            "price": 0.7,
            "calories": 206,
            "ingredients": ["Rice"]
        },
        {
            "id": 6,
            "name": "Salmon",
            "category": "Fish",
            "price": 12.0,
            "calories": 206,
            "ingredients": ["Salmon"]
        },
        {
            "id": 7,
            "name": "Egg",
            "category": "Dairy",
            "price": 0.2,
            "calories": 68,
            "ingredients": ["Egg"]
        },
        {
            "id": 8,
            "name": "Bread",
            "category": "Grains",
            "price": 1.0,
            "calories": 79,
            "ingredients": ["Wheat Flour", "Water", "Yeast", "Salt"]
        },
        {
            "id": 9,
            "name": "Cheese",
            "category": "Dairy",
            "price": 2.0,
            "calories": 402,
            "ingredients": ["Milk", "Salt", "Enzymes"]
        },
        {
            "id": 10,
            "name": "Almonds",
            "category": "Nuts",
            "price": 4.0,
            "calories": 579,
            "ingredients": ["Almonds"]
        }
    ];

    console.log("Query:",searchQuery)

    return (
        <div className=' h-full flex justify-center items-center p-1 w-full'>
            <div className=' h-full bg-slate-500 py-7 w-[20%] flex'>
                <div className=' flex px-1 w-[100px]  h-[20px]'><p className=' w-full text-black flex'> Search:<input className=' w-[160px]' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} type="text" /></p></div></div>

            <div className=' h-full pl-10 grid grid-cols-3 gap-2 py-2 overflow-y-auto w-full'>
                {orderDetails.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())).map((details, index) => (
                    <div key={index} className=' bg-yellow-500 p-5 h-[200px] w-[200px]'>
                        <h1>{details.id}</h1>
                        <p>{details.name}</p>
                        <p>{details.category}</p>
                        <p>Price: ${details.price}</p>
                        <p>Calories: {details.calories}</p>
                        <p>Ingredients: {details.ingredients.join(', ')}</p>
                    </div>
                ))}
            </div>
            {/* <FoodModel/> */}
        </div>
    );
};

export default FoodDetails; // Changed the export statement to match the component name
