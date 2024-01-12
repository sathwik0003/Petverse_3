import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  msg: "",
  user: "",
  token: "",
  loading: false,
  error: ""
};

export const signUpUser = createAsyncThunk('signupuser', async ({ firstNameValue, usernameValue, phoneValue, emailValue, passwordValue }) => {
  try {
    const res = await fetch("http://localhost:3001/api/register", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        fullname: firstNameValue,
        username: usernameValue,
        phone: phoneValue,
        email: emailValue,
        password: passwordValue,
      }),
    });

    if (res.ok) {
      console.log('Registration successful');
      window.location.href = '/Sell/Login';
    } else {
      console.error('Registration failed');
    }

    return await res.json();
  } catch (error) {
    console.error('An error occurred during registration:', error);
    throw error;
  }
});
export const signInUser = createAsyncThunk('signinuser', async ({  usernameValue, passwordValue }) => {
  
  try {
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameValue,
        password: passwordValue,
      }),
    });
  
    if (response.ok) {
      console.log('Login successful');
     
      window.location.href = `/add/${usernameValue}`;
    } else {
      const errorData = await response.json();
      console.error('Login failed:', errorData.message);
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
});
export const Usersignup = createAsyncThunk('usersignup', async ({ firstNameValue, usernameValue, phoneValue, emailValue, passwordValue }) => {
  try {
    const response = await fetch('http://localhost:3001/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullname: firstNameValue,
        username: usernameValue,
        phone: phoneValue,
        email: emailValue,
        password: passwordValue,
      }),
    });

    if (response.ok) {
      console.log('Registration successful');
     
    } else {
      console.error('Registration failed');
    }
  } catch (error) {
    console.error('Error during registration:', error);
  }
});
export const Userlogin = createAsyncThunk('userlogin', async ({  loginuserValue, loginpasswordValue }) => {
  
  try {
    const response = await fetch('http://localhost:3001/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: loginuserValue,
        password: loginpasswordValue,
      }),
    });
  
    if (response.ok) {
      console.log('Login successful');
      window.location.href = `/user/main/${loginuserValue}`;
    } else {
      const errorData = await response.json();
      console.error('Login failed:', errorData.message);
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
});

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addToken:(state,action)=>{
      state.token=localStorage.getItem("token")
    },
    addUser:(state,action)=>{
      state.user=localStorage.getItem("user")
    },
    logout:(state,action)=>{
      state.token=null;
      localStorage.clear();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInUser.fulfilled, (state, { payload: { error, msg,token,user } }) => {
        state.loading = false;
        if(error){
          state.error=error;
        }else{
          state.msg=msg;
          state.token=token;
          state.user=user;
          localStorage.setItem('msg',msg)
          localStorage.setItem('user',JSON.stringify(user))
          localStorage.setItem('token',token)
        }
        
      })

      
      .addCase(signInUser.rejected, (state) => {
        state.loading = true;
      })
      // signup
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUpUser.fulfilled, (state, { payload: { error, msg } }) => {
        state.loading = false;
        if (error) {
          state.error = error;
        } else {
          state.msg = msg;
        }
      })
    

      .addCase(signUpUser.rejected, (state) => {
        state.loading = true;
      })
      .addCase(Usersignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(Usersignup.fulfilled, (state, { payload: { error, msg } }) => {
        state.loading = false;
        if (error) {
          state.error = error;
        } else {
          state.msg = msg;
        }
      })
      .addCase(Usersignup.rejected, (state) => {
        state.loading = true;
      })
      .addCase(Userlogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(Userlogin.fulfilled, (state, { payload: { error, msg } }) => {
        state.loading = false;
        if (error) {
          state.error = error;
        } else {
          state.msg = msg;
        }
      })
      .addCase(Userlogin.rejected, (state) => {
        state.loading = true;
      });
  }
});

export const {addToken,addUser,logout}=authSlice.actions;
export default authSlice.reducer;
