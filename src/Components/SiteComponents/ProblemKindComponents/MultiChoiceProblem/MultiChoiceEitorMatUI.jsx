import React from "react";
import ChoicesList from "./ChoicesListMatUI";
import { MultiChoiceOptionMatUI } from "./MultiChoiceOptionMatUI";

export  function MultiChoiceEitorMatUI({ 
    choices , 
    selectionId , 
    choicesTypes,
    chooseOptionCallback ,
    isDisable
 }) {
    
    console.log(choicesTypes);
    const contents =  choices.map(choice => (
            <MultiChoiceOptionMatUI
                {...choice} 
                onPickAnswerCallback = {chooseOptionCallback}  
                choiceType = {choicesTypes.get(choice.id)}
                isChoosenCallback = { () => choice.id === selectionId }
                isDisable  =  {isDisable}
            />            
        ))
    return ( 
        <ChoicesList>
            {contents}
        </ChoicesList>
        
    );
}