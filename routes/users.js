var express = require('express');
var router = express.Router();
const {UserModel} = require('../Shema/user')

//const {dbUrl} = require('../omman/url')
const{hash,comparepassword,createtoken, validates}=require('../comon/bcrypt');
//const { compare } = require('bcryptjs');


/* GET users listing. */
router.get('/get',validates, async function(req, res) {
  try {
    let users = await UserModel.find(); 
    if(users.length>0){
    res.status(200).send({
      users,
      message:"Users Data Fetch Successfull!"
    })}else{ 
      throw ({error:"data empty"})
    }
  } catch (error) {
    if(error){  
      res.status(400).send({error:error.error})

    }else{ 
      res.status(500).send({error:'internal server error'})
    }
  }
});  


router.get('/get/:id', async function(req, res) {
  try {
    let users = await UserModel.findOne({_id:req.params.id}); 
    if(users){
    res.status(200).send({
      users,
      message:"Users Data Fetch Successfull!"
    })}else{ 
      throw ({error:'data empty'})
    }
  } catch (error) { 
    if(error){ 
      res.status(400).send({error:error.error})
    }else{
    res.status(500).send({error:"Internal Server Error"}) 
    }
  }
}); 
router.post('/login', async function(req, res) { 

  try { 
    console.log(req.body)
    let users = await UserModel.findOne({email:req.body.email});   
    console.log(users)
     if(users){ 
      
      const hashpassword=users.password
           
        if(await comparepassword(req.body.password,hashpassword)){   
       const token=   await createtoken({email:users.email})  
      
          res.status(200).send({message:"loginsucess",users,token})

        }else{ throw ({error:"please enter currect password"})}
     }else{ 
     throw ({error:"please enter currect email"})
     }    
    
  } catch (error) { 
    if(error){ 
      console.log(error)
    res.status(400).send({error:error.error}) 
    }else{ 
      res.status(500).send({error:"internal server error"}) 
    }
  }
});

router.post('/mlogin', async function(req, res) { 

  try { 
    console.log(req.body)
    let users = await UserModel.findOne({email:req.body.email});   
    console.log(users)
     if(users){ 
      
      const hashpassword=users.password
           
        if(await comparepassword(req.body.password,hashpassword)){   
       const token=   await createtoken({email:users.email,role:users.role})  
      
          res.status(200).send({message:"loginsucess",users,token})

        }else{ throw ({error:"please enter currect password"})}
     }else{ 
     throw ({error:"please enter currect email"})
     }    
    
  } catch (error) { 
    if(error){ 
      console.log(error)
    res.status(400).send({error:error.error}) 
    }else{ 
      res.status(500).send({error:"internal server error"}) 
    }
  }
});


router.post('/postsignup',async(req,res)=>{
  try {
    let user = await UserModel.findOne({email:req.body.email})
    console.log(user)
    if(!user){
      const hashingpassword=await hash(req.body.password);
      //const hasingemail=await hash(req.body.email)
      const{name,email}=req.body;
      let user = await UserModel.create({name,email,password:hashingpassword});
      res.status(201).send({user,message:"data post sucess"})
    }
    else
    {
    throw  ({error:"User Alread Exists!"})
    }

  } catch (error) { 
    if(error) { 
   res.status(401).send({error:error.error})
    }else{
    res.status(500).send({message:"Internal Server Error"})
  }}
})


{/*router.get('/get/:id', async(req, res)=> {
  try { 
    let user = await UserModel.findOne({_id:req.params.id}); 
    if(user){
    res.status(200).send({user,message:"Users Data Fetch Successfull!"}) 
    }else{throw({error:'user data not available'})}
  } catch (error) { 
    if(error){
    res.status(400).send({error:error.error}) 
    }else{ 
      res.status(500).send({error:"internal server error"}) 
    }
  }
});*/}

router.patch('/put/:id',async(req,res)=>{
  try {
    let user = await UserModel.findOne({_id:req.params.id})
    if(user)
    {
      user.name = req.body.name
      user.email = req.body.email
      user.password = req.body.password

      await user.save()

      res.status(200).send({
        user,message:"userupdated sucess"
      })
    }
    else
    {
      throw({error:"User Does Not Exists!"})
    }

  } catch (error) { 
    if(error){
     res.status(400).send({ error:error.error}) 
    }else{ 
      res.status(500).send({ error:'server error'}) 
    }
  }
})

router.delete('/delete/:id',async(req,res)=>{
  try {
    let user = await UserModel.findOne({_id:req.params.id})
    if(user)
    
    {
      let user = await UserModel.deleteOne({_id:req.params.id})
      res.status(200).send({
        message:"User Deleted Successfull!"
      })
    }
    else
    {
      throw({error:"User Does Not Exists!"})
    }

  } catch (error) { 
    if(error){res.status(400).send( {error:error.error})
    }else{
    res.status(500).send({message:"Internal Server Error" })
    } 
  }
 

})
module.exports = router;