const Registration = require("../schemas/registration");

module.exports.login = async (req, res)=>{
  const { email, password, type } =req.body;

  res.setHeader('Access-Control-Allow-Origin', '*');
  try{

    const data = await Registration.findOne({email:email,password:password, user_type:type});
    if(data){
      res.status(200).json({msg:"Logged In!"});
    }else{
      res.status(404).json({err:"Email or password is invalid! Please try Again"});
    }
  }catch(err){
    res.status(500).json({err:"Internal Server Error"});
    console.log(err.message);
  }
}