import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';



export default function Register() {

   
   let user={
    name:"",
    email:"",
    phone:"",
    password:"",
    rePassword:"",
   }

   const navigate=useNavigate();

   async function RegisterNewUser(obj){
    try{
      let {data}=await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup', obj);
   
   
      // console.log(data);
      if(data.message=== "success"){
        $('.SuccessMsg').fadeIn(1000,function(){

          navigate('/login');
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


      RegisterNewUser(values);


    },

    validate:function (values) {
      let errors={};
      if(values.name.length <= 3){
        errors.name="invalid! , name must be more than 3 characters";

      }
      if(!values.email.includes('@')){
        errors.email="invalid! , please enter a valid email";

      }
      if(!values.phone.match(/^(02)?01[0125][0-9]{8}$/)){
        errors.phone="inavlid phone number";

      }
      if(values.rePassword!==values.password){
        errors.rePassword="re password must match password";

      }
      

      return errors;
      
    }
  }
  
  );
  
  return <>

  <div className="container py-4">

  
  <div style={{'display':'none'}} className="ErrorMsg alert alert-danger text-body-emphasis text-center">

    <h6>This email is already registered</h6>



  </div>


  <div style={{'display':'none'}} className="SuccessMsg bg-success-subtle text-body-emphasis text-center">

    <h6>You are now registered</h6>



  </div>




  <h3 className='mt-4 px-4 text-primary'>Register Now </h3>


  <form onSubmit={formik.handleSubmit} className='py-5 px-5'>
    <label className='mt-3'htmlFor="name">name</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} id='name' placeholder='name' type="text" className=' form-control '/>
   
   
    {formik.errors.name && formik.touched.name? <div className=" mt-3 alert alert-danger text-center">{formik.errors.name}</div>:"" }

     

    <label className='mt-3'htmlFor="email">Email</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} id='email' placeholder='Email' type="email" className=' form-control '/>

    
    {formik.errors.email && formik.touched.email? <div className=" mt-3 alert mt-3 alert-danger text-center">{formik.errors.email}</div>:"" }
  
    <label className='mt-3'htmlFor="phone">phone</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} id='phone' placeholder='phone' type="text" className=' form-control '/>

    {formik.errors.phone && formik.touched.phone? <div className=" mt-3 alert alert-danger text-center">{formik.errors.phone}</div>:"" }


    <label className='mt-3'htmlFor="password">password</label>
    <input onChange={formik.handleChange} value={formik.values.password} id='password' placeholder='password' type="password" className=' form-control '/>

     

    <label className='mt-3'htmlFor="rePassword">rePassword</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} id='rePassword' placeholder='rePassword' type="password" className=' form-control '/>
  

    {formik.errors.rePassword && formik.touched.rePassword? <div className=" mt-3 alert alert-danger text-center">{formik.errors.rePassword}</div>:"" }

    <button type='submit' className='btn btn-primary mt-4'>Register</button>

  </form>
  </div>

  </>
  
    
  
}
