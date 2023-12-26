const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json());

app.post('/process-image', async (req, res) => {
  if(req.body.token !== procecss.env.TOKEN){
    return res.send({error:"auth failed, token not varified"})
  }
 axios({
  method:"POST",
  url: "https://detect.roboflow.com/garbage-detector-ccn0g/1",
  params: {
    api_key: process.env.API_KEY,
    image: req.body.imageUrl
}}).then(function(response) {
  const data = response.data 
  if(data.predictions.length>0){
   return res.send({cleaned:false})
  }else{
   return res.send({cleaned:true})
  }
})
.catch(function(error) {
  console.log(error.message);
});
}
);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
