import React, { Fragment, useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import validator from 'validator'

//import { Redirect } from 'react-router-dom'





// import base_url from '../api/api'


//import { ToastContainer, toast } from 'react-toastify';


const theme = createTheme();

const styles = {
  paperContainer: {
    backgroundImage: `url(${"https://media.istockphoto.com/photos/mature-doctor-and-nurse-discussing-patient-case-picture-id1307543555?b=1&k=20&m=1307543555&s=170667a&w=0&h=KKk1RkwzUkT_a6Kqf0jh7aBEVpIMG048FALjEAPyDp0="})`,
    position: 'absolute',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    width: '100%',
    height: '100%',
    opacity: 1,
    content: '""',
    display: 'block',
    Width: 1000,
    height: 1000,
    marginTop: 0

  }
};
export default function Register() {
  // const [data, setdata] = useState([]);
  // useEffect(() => {
  //   document.title = "Registration|HMS"
  //   // const data=getdata();
  //   // console.log(data);
  //   // setdata(data);
  // }, []);
  // const getdata = () => {
  //   axios.get(`${base_url}\api\Registers`).then(
  //     (response) => {
  //       //success
  //       console.log(response);
  //       console.log("data")
  //     }, (error) => {
  //       //error
  //       console.log(error);
  //     }
  //   )
  // }

  const postdata = (data) => {
    axios.post("http://localhost:9000/user/register", data).then(   
      (response) => {
        //success
        console.log(response);
       // toast.success("Registration done Successfully");
        window.alert(`Registration done Successfully,Please check your mail
         ${response.data.url}`)

        window.location = "/";

        console.log("successs");
      }, (error) => {
        //error
        console.log(error);
        console.log("failed +++++++++++++++++++")
        window.alert("Registration failed with",error)
      }
    );
  };
  const [emailerror, setemailerror] = useState('');
  const [phoneerror, setphoneerror] = useState('');
  const [passworderror, setpassworderror] = useState('');
  const validateEmail = (e) => {
    var email = e.target.value

    if (validator.isEmail(email)) {
      setemailerror('')
    } else {
      setemailerror('Enter valid Email!')
    }
  }
  const validatePhoneNumber = (e) => {
    var phone = e.target.value
    if (validator.isMobilePhone(phone) && phone.length == 10) {
      setphoneerror('')
    } else {
      setphoneerror('Enter valid Phone Number ')
    }


  }
  const validatePassword = (e) => {
    var password = e.target.value
    if (password.length <= 8) {
      setpassworderror('')
    } else {
      setpassworderror('Password should not grater the 8')
    }


  }
  const [register, setregister] = useState({});
  console.log(register, "register data");
  const handleSubmit = (e) => {
    // if (validate()){
    console.log(register, "+++++++++++++++++++");
    // if(register.PhoneNumber.length!=10){
    //   alert("please enter valid phone number")
    // }

   // if (register.PhoneNumber.length == 10) {
      postdata(register);
    //} else {
      //window.alert("Please Enter 10 digit Phone Number ")
   // }
    e.preventDefault();

    //const data = new FormData(e.currentTarget);
    // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    //}
  };

  return (
    <Paper style={styles.paperContainer}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Box
            sx={{
              marginTop: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',

            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField

                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Full Name"
                    autoFocus
                    onChange={(e) => {
                      setregister({ ...register, name: e.target.value })
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="Email"

                    onChange={(e) => {
                      // let reg=new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/).test(e.target.value) 
                      // if(!reg){
                      //   setemailerror("Please Enter Valid Email")
                      // }
                      validateEmail(e)
                      setregister({ ...register, email: e.target.value })

                    }}
                    error={Boolean(emailerror)}
                    helperText={emailerror}
                    required
                  
                  />

                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth

                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => {
                      validatePassword(e)
                      setregister({ ...register, password: e.target.value })
                    }}
                    error={Boolean(passworderror)}
                    helperText={passworderror}
                  />
                  <span style={{
                     fontWeight: 'bold',
                    color: 'black',
                  }}>* Special Characters are not allowed...</span>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="contact"
                    label="Phone No."
                    type="number"
                    name="contact"

                    inputProps={{ maxLength: 10 }}
                    onChange={(e) => {
                      validatePhoneNumber(e)
                      setregister({ ...register, contact: e.target.value })
                      // let reg=new RegExp(/^\d*$/).test(e.target.value) 
                      // if(e.target.value.length!=10){
                      //   setphoneerror("Please Enter 10 digit PhoneNo.")
                      // }
                    }}
                    error={Boolean(phoneerror)}
                    helperText={phoneerror}
                  />

                </Grid>
                {/*<Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary"  />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>*/}
              </Grid>
              <Button
                type="submit"
                //fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 2 }}
              >
                Sign Up
              </Button><Button
                type="reset"
                //fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 2 }}
                onClick={(e) => {
                  setregister({})
                }}
              >
                Reset
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/*  <Copyright sx={{ mt: 5 }} />*/}
        </Container>
      </ThemeProvider>
    </Paper>
  );
}