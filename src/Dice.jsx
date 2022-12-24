import React from "react";

export default function Dice(props){

   const heldStyle = {
      backgroundColor: props.isHeld ? "rgb(231, 12, 132)" : ""
   }

   return(
      <img 
        src={`/images/dice-${props.value}.svg`} 
        onClick={props.handleHold}
        style={heldStyle}
      />
   )
}