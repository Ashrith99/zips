// import React, { useState, useEffect } from "react";
// import Mainmenu from "../../components/Mainmenu/Mainmenu";
// import { menuItems } from "../../assets/pictures/pictures";
// import Header from "../../components/Header/Header";
// import Footer from "../../components/Footer/Footer";
// import { useTableNum } from "../../components/context/TableNumContext";

// function LandingPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const { setTableNum } = useTableNum();

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const tableNumValue = params.get('table_num');
//     setTableNum(tableNumValue);

//     // Log the table_num value to the console
//     if (tableNumValue) {
//       console.log(`Table Number: ${tableNumValue}`);
//     } else {
//       console.log('Table Number not found in URL');
//     }
//   }, [setTableNum]);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredItems = menuItems.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <>
//       <Header onSearchChange={handleSearchChange} />
//       <Mainmenu items={filteredItems} searchTerm={searchTerm} />
//       <Footer />
//     </>
//   );
// }

// export default LandingPage;

import React, { useEffect,useState } from "react";
import Mainmenu from "../../components/Mainmenu/Mainmenu";
import { menuItems } from "../../assets/pictures/pictures";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useTableNum } from "../../components/context/TableNumContext"; // Import the context hook

function Landingpage() {
  const { tableNum, setTableNum } = useTableNum();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (!tableNum) { // Only set tableNum if it hasn't been set yet
      const params = new URLSearchParams(window.location.search);
      const tableNumValue = params.get('table_num');
      if (tableNumValue) {
        setTableNum(parseInt(tableNumValue, 10));
        console.log(`Table Number: ${tableNumValue}`);
      }
    }
  }, [tableNum, setTableNum]);

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header onSearchChange={handleSearchChange} />
      <Mainmenu items={filteredItems} searchTerm={searchTerm} />
      <Footer />
    </>
  );
}

export default Landingpage;

