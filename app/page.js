"use client";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

// function start
export default function Home() {
  // items data
  const [items, setItems] = useState([
    { id: 1, name: "Food", amount: 200 },
    { id: 2, name: "Grocery", amount: 300 },
    { id: 3, name: "Fuel", amount: 400 },
  ]);
  // new item data
  const [newItem, setNewItem] = useState({ name: "", amount: "" });
  // total data
  const [total, setTotal] = useState(5);

  // Add Items to database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== "" && newItem.amount !== "") {
      // setItems([...items, newItem]);
      await addDoc(collection(db, "items"),{
        name: newItem.name.trim(),
        amount: newItem.amount,
      });
      setNewItem({ name: "", amount: "" });

    }
  };
  // Read data from database
  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setItems(items);
    });
  }, []);
  // Delete data from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };
  // Calculate total
  useEffect(() => {
    let total = 0;
    items.forEach((item) => {
      total += parseInt(item.amount);
    });
    setTotal(total);
  }, [items]);
  // return
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm ">
        <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
        <div className="bg-slate-400 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            {/* Form  */}
            <input
              className="col-span-3 p-3 border"
              type="text"
              placeholder="Enter Expense"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input
              className="col-span-2 p-3 border"
              type="number"
              placeholder="Enter $"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, amount: e.target.value })
              }
            />
            <button
              className="text white bg-slate-700 hover:bg-slate-900 p3 text-xl rounded-full hover:text-white font-extrabold"
              type="submit"
              onClick={addItem}
            >
              +
            </button>
          </form>
          {/* List */}
          <ul>
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between my-4 w-full bg-slate-500"
              >
                <div className="p-4 w-full flex justify-between">
                  <span className="capatalize ">{item.name}</span>
                  <span>{item.amount}</span>
                </div>
                <button
                  className=" ml-8 p-4 text white bg-slate-500 hover:bg-slate-600 p3 text-xl rounded-full hover:text-white font-extrabold"
                  type="submit"
                  onClick={() => deleteItem(item.id)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          {/* Total */}
          {items.length < 1 ? (
            " "
          ) : (
            <div className="flex justify-between p-3">
              <span>Total</span>
              <span>{total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
