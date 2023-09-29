import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state,action)=>{
  if(action.type==='USER_INPUT')
  {
    return ({value:action.val,isValid:action.val.includes('@')})

  }
  if(action.type==='INPUT_BLUR')
  {
    return ({value:state.value,isValid:state.value.includes('@')})

  }
  
      return ({value:'',siValid:false})
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const[collegeIsValid,setCollegeIsValid] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  // const [collegeName, setCollegeName] = useState('');
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState,dispatchEmail] = useReducer(emailReducer,{
    value:'',
    isValid:null
  

  })


  useEffect(()=>{
    console.log("Effect running")

    return ()=>{
      console.log("Effect Cleanup")
    }
  },[])


  // useEffect(()=>{
  //   const identifier = setTimeout(()=>{
  //     console.log("Checking form validity !")
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && collegeName.trim().length>3
  //     );
      
  //   },500)

  //   return ()=>{
  //     console.log("cleanupd")
  //     clearTimeout(identifier)
  //   }
   
  // },[enteredEmail,enteredPassword,collegeName])

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value); 
    dispatchEmail({type:'USER_INPUT', val:event.target.value})  

    setFormIsValid(
            emailState.value.includes('@') && enteredPassword.trim().length > 6 
          );

  };
  // const collegeHandler = (event)=>{
  //   setCollegeName(event.target.value);
  // }

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setFormIsValid(
      emailState.isValid && event.target.values.trim().length > 6 
    );

   
  };

  const validateEmailHandler = () => {
    // setEmailIsValid( emailState.isValid);
    dispatchEmail({type:'INPUT_BLUR'})
  };
  // const validateCollegeHandler = ()=>{
  //   setCollegeIsValid(collegeName.length>3);
  // }

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>

        {/* <div
          className={`${classes.control} ${
            collegeIsValid===false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            value={collegeName}
            onChange={collegeHandler}
            onBlur={validateCollegeHandler}
          />
        </div> */}

        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
