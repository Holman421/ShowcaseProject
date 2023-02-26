import { Box, Typography, Button } from "@mui/material";
import { defineElement } from "lord-icon-element";
import Lottie from "lottie-web";
import { useState } from "react";
import fadeInAnimation from "../../Components/fadeInAnimation";

defineElement(Lottie.loadAnimation);

const NotFoundPage = () => {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <Box
      sx={{
        backgroundColor: "#F1EDEB",
        borderRadius: ".5rem",
        width: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "3rem",
        animation: `${fadeInAnimation} 400ms ease`,
      }}>
      <button
        onClick={() => {
          setIsRunning(!isRunning);
        }}>
        Play
      </button>
      <lord-icon
        src="https://cdn.lordicon.com/wcjauznf.json"
        trigger={isRunning ? "loop" : "hover"}
        colors="primary:#121331,secondary:#08a88a"
        style={{ width: "50px", height: "150px" }}></lord-icon>
    </Box>
  );
};

export default NotFoundPage;

// import { Box, Typography, Button } from "@mui/material";
// import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import fadeInAnimation from "../../Components/fadeInAnimation";
// import { TodoContext } from "../../Context/TodoContext";

// const NotFoundPage = () => {
//   let navigate = useNavigate();

//   const context = useContext(TodoContext);

//   const redirectHome = () => {
//     context.setSelectedLink("");
//     navigate("");
//   };

//   return (
//     <Box
//       sx={{
//         backgroundColor: "#F1EDEB",
//         borderRadius: ".5rem",
//         width: "auto",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         paddingBottom: "3rem",
//         animation: `${fadeInAnimation} 400ms ease`,
//       }}>
//       <Typography
//         variant="h4"
//         sx={{
//           padding: "4rem 0 2rem 0",
//           fontWeight: "bold",
//           color: "#414141",
//           textAlign: "center",
//         }}>
//         Not found page
//       </Typography>

//       <Button onClick={redirectHome} variant="contained">
//         Got to home
//       </Button>
//     </Box>
//   );
// };

// export default NotFoundPage;
