const Registration = require("../schemas/registration");

module.exports.register = async(req, res)=>{
  const { fname, lname, email, password, state, city, locality} = req.body;
  const { type } = req.query;

  console.log(fname,lname,email,password, state, city, locality, type);
   res.setHeader('Access-Control-Allow-Origin', '*');

  try{

    const options = {
      firstName:fname,
      secondName:lname,
      user_type:type,
      email,
      password,
      state,
      city,
      locality,
      
    }
  
    const emailExists = await Registration.exists({email:email});
    if(emailExists){

      res.status(403).json({err:"Email already exists"});
    }else{

      const register = await new Registration(options);
      await register.save();
      res.status(200).json({msg:"Registered Successfully!"})
    }
  }catch(err){
    res.status(500).json({err:"Internal Server Error"});
    console.log(err.message);
  }
}