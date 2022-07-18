import React ,{Fragment, useEffect, useState} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import validator from 'validator'

//import { ToastContainer, toast } from 'react-toastify';


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
      Width:1000,
      height:1000,
      marginTop:0

  }
};
const theme = createTheme();

export default function Login(props) {
  

  const postdata=(data)=>{
    axios.post("http://localhost:9000/user/login",data).then(   //${base_url}\api\Registers
      (response)=>{
        //success
        console.log(response.data,"============");
        
        console.log(response.data.authtoken,"++++++")
        localStorage.setItem('authtoken',response.data.authtoken)
        console.log(localStorage.getItem('authtoken'))
        console.log("Login done Successfully")
        window.alert("Login done Successfully")
        window.location='/'

      },(error)=>{
        //error
        window.alert(error,'Login Failed')
        console.log(error);
        console.log("failed +++++++++++++++++++")
      }
    );
  };
  const[emailerror,setemailerror]=useState('')
  const [passworderror,setpassworderror]=useState('');
  const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setemailerror('')
    } else {
      setemailerror('Enter valid Email!')
    }
  }
  const validatePassword = (e) => {
    var password=e.target.value
    if (password.length <=8) {
      setpassworderror('')
    } else {
      setpassworderror('Password should not grater the 8')
    }
  
   
   }
    const [login,setlogin]=useState({});
    const handleSubmit = (e) => {
      console.log(login,"+++++++++++++++++++");
    //   if(login.Email=="vaibhavsengarnetid@gmail.com" && login.Password=="12345"){
    //     console.log(login.Email)
    //     console.log(login.Password)
    //     window.alert("Login done as admin")
    //    localStorage.setItem('role','admin')
    //    window.alert("Login done as ",localStorage.getItem('role'))

    //   window.location = "/adminhome"
    //   e.preventDefault();
    //   //props.history.push("/adminhome");
    //   }else{
       postdata(login);
       e.preventDefault();
      //}
     
    };

  return (
    <div>
    <Paper style={styles.paperContainer}>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              inputProps={{maxLength:100}}
              autoFocus
              onChange={(e)=>{
                validateEmail(e)
                 setlogin({...login,email:e.target.value})
                
              }}
              required
              error={Boolean(emailerror)}
              helperText={emailerror}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>{
                validatePassword(e)
                setlogin({...login,password:e.target.value})
              }}
              error={Boolean(passworderror)}
              helperText={passworderror}
            />
            <span style={{
              fontWeight: 'bold',
              color: 'black',
            }}>* Special Characters are not allowed...</span>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              //fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,ml:2}}
            >
              Sign In
            </Button><Button
            type="reset"
            //fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 ,ml:2}}
            onClick={(e)=>{
              setlogin({})
            }}
          >
            Reset
          </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" action  tag="a" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
    </Paper>
    </div>
  );
}