import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import $ from 'jquery';
import { Navigate, useNavigate } from 'react-router-dom';



export default function Login({getUserData,currentuser}) {

   
   let user={
    
    email:"",
    password:"",
    
   }

   const navigate=useNavigate(); 

   async function LoginUser(obj){
    try{
      let {data}=await axios.post(' https://ecommerce.routemisr.com/api/v1/auth/signin', obj);
      
      

       //console.log(data.token);
      if(data.message==="success"){

        localStorage.setItem('token',data.token);
        getUserData();

        

        $('.SuccessMsg').fadeIn(1000,function(){
          
        navigate('/home');

          
        });
      
      
      }
      

    }
    catch(error){


      $('.ErrorMsg').fadeIn(1000 ,function(){
        setTimeout(()=>{
          $('.ErrorMsg').fadeOut(500)

        },3000)
      });
      //console.log(error.response.data.errors.msg);
    }
    
   }
  
  let formik=useFormik({

    initialValues:user,


    onSubmit:function(values){


     LoginUser(values);


    },

    validate:function (values) {
      let errors={};
      
      if(!values.email.includes('@') || values.email!==formik.values.email){
        errors.email="Wrong email";

      }
      
     if(values.password!==formik.values.password){
      errors.password="Wrong password";

     }

      return errors;
      
    }
  }
  
  );
  
  return <>

  <div className="container py-4">

  
  <div style={{'display':'none'}} className="ErrorMsg alert alert-danger text-body-emphasis text-center">

    <h6>wrong email or password</h6>



  </div>


  {currentuser? <div style={{'display':'none'}} className="SuccessMsg text-body-emphasis text-center text-black-50">
    

    <h2> Welcome Back {currentuser.name} </h2>
    
    
      </div>:''}




  <form onSubmit={formik.handleSubmit} className='py-5 px-5'>
    
   
  

     

    <label className='mt-3'htmlFor="email">Email</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id='email' placeholder='Email' type="email" className=' form-control '/>

    
    {formik.errors.email && formik.touched.email? <div className=" mt-3 alert mt-3 alert-danger text-center">{formik.errors.email}</div>:"" }
  


    <label className='mt-3'htmlFor="password">password</label>
    <input onChange={formik.handleChange} value={formik.values.password} id='password' placeholder='password' type="password" className=' form-control '/>

    {formik.errors.password && formik.touched.password? <div className=" mt-3 alert alert-danger text-center">{formik.errors.password}</div>:"" }
    
  

  <button type='submit' className='btn btn-primary mt-4 d-flex'>Login</button>

  </form>
  </div>
  </>
    
}

