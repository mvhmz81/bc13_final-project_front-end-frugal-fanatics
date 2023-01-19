import "../styles/globals.css";
import { useState } from "react";
import baby from '../public/baby.png'
import xmas from "../public/xmas.png"
import palmtree from "../public/palmtree.png"
import presents from "../public/present.png"

export default function App({ Component, pageProps }) {
  const [data, setData] = useState({
    totalIncome: 3200,
    expenses: [
      { label: "Rent or Mortgage", amount: 1200 },
      { label: "Food and Groceries", amount: 350 },
      { label: "Home Energy Bills", amount: 170 },
      { label: "Council Tax", amount: 240 },
      { label: "Credit Payments", amount: 500 },
      { label: "Leftover Income", amount: 740 },
    ],
    savings: { total: 12900, goal: 20000 },
    pots: [
      { label: "Christmas", total: 300, goal: 750, img: xmas, width: 98, height: 82, alt: "A cartoon santa hat"},
      { label: "Holiday", total: 340, goal: 1000, img: palmtree, width: 98, height: 82, alt: "Cartoon palm trees" },
      { label: "Nursery", total: 1200, goal: 5000, img: baby, width: 98, height: 82, alt: "A cartoon baby bottle and baby grow"},
      { label: "Birthday", total: 300, goal: 500, img:presents, width: 98, height: 82, alt: "A cartoon present with blue ribbons"},
    ],
	
  });

  return <Component {...pageProps} data={data} setData={setData} />;
}
