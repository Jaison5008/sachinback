const bcrypt=require('bcryptjs')
const tokenscreate=require('jsonwebtoken') 
const secrete='john' 
const ss='admin'
const hash=async(pay)=>{
    const salt=await bcrypt.genSalt(5);
    const pw= await bcrypt.hash(pay,salt)
    return pw
} 
const comparepassword=async(password,hashpassword)=>{ 
 const result  = await bcrypt.compare(password,hashpassword) 
 return result
} 
const createtoken=async(payload)=>{ 
         const tokens= await tokenscreate.sign(payload,secrete,{expiresIn:'2m'}) 
         return tokens
} 
const validate=async(req,res,next)=>{    
    try{
     if(req.headers.authorization){
        const data=req.headers.authorization.split(" ")[1] 
        const decodedata=  await tokenscreate.decode(data) 
     if((((+new Date())/1000)<decodedata.exp)){
        next();
    }else{res.status(401).send({error:"time expired"})} 
}else{ 
    res.status(401).send({error:"time expired"})
}
    }catch(error){ 
        (res.status(500).send({error:'server error'}))
    }
}
    const validates=async(req,res,next)=>{    
        try{
         if(req.headers.authorization){
            const data=req.headers.authorization.split(" ")[1] 
            const decodedata=  await tokenscreate.decode(data) 
         if((((+new Date())/1000)<decodedata.exp)){ 
            if(decodedata.role===ss){
            next(); 
            } 
            else{ 
                res.status(400).send({error:"admin only"})
            }
        }else{res.status(401).send({error:"time expired"})} 
    }else{ 
        res.status(401).send({error:"unauthorized"})
    }
        }catch(error){  
            
            (res.status(500).send({error:'server error'})) 
            
        }
        
    
}
module.exports={hash,comparepassword,createtoken,validate,validates}