import React, { useState } from 'react';


import SellerSignup from './SellerSignup';

const NewSeller=(props)=>{
    const saveUserDataHandler = (enteredUserData) => {
        const userData = {
          ...enteredUserData,
          id: Math.random().toString(),
        };
        props.onAddUser(userData);
       
      };

      return(
        <SellerSignup
        onSaveUserData={saveUserDataHandler}
       
      />
      )

}

export default NewSeller