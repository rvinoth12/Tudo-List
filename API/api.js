const express = require('express');
const app = express();
const port = 8181;

const cors = require('cors');


let allData = []


app.use((req,res,next)=>{
    res.append('Acess-Control-Allow-Origin',['*']),
    res.append('Acess-Control-Allow-Methods','GET,PUT,POST,DELETE'),
    res.append('Acess-Control-Allow-Headers','Content_Type'),
    next()
})


const option = {
    origin :'*',
    credentials:true,
    optionSuccessStatus: 200
}

app.use(express.json());
app.use(cors(option));



app.post('/expense',(req,res)=>{
    // res.json(JSON.stringify(allData))

    if(req.body.name==="Total Amount"){
        allData.push(req.body)
        res.send(JSON.stringify(allData))
        console.log("total",allData)

    }
    else if(req.body.name === 'category') {

        console.log('category',req.body)
        
        allData[req.body.id]?.categories.push(req.body)
        allData[req.body.id].amount += parseInt(req.body.amount)
        // parseFloat(allData[req.body.id].amount).toFixed(2)
        
        res.send(JSON.stringify(allData))
        
        // console.log('allData',JSON.stringify(allData))
        // console.log('req.body',req.body)
        // console.log('allData',allData)
        // console.log('allData[req.body.totalID]?.categories',allData[req.body.id]?.categories)
    }
    else if(req.body.name === 'delete'){
        allData[req.body.totalIndex].amount = allData[req.body.totalIndex].amount - allData[req.body.totalIndex].categories[req.body.DeleteIndex].amount
        allData[req.body.totalIndex].categories.splice(req.body.DeleteIndex,1);

        res.send(JSON.stringify(allData))
        console.log('allData',allData)

        console.log(req.body)
    }
    else if(req.body.name === 'edit'){

        allData[req.body.editCate.cateIndex].categories[req.body.editCate.ind].amount > req.body.editCate.categoryAmount?
         allData[req.body.editCate.cateIndex].amount -= ( allData[req.body.editCate.cateIndex].categories[req.body.editCate.ind].amount - req.body.editCate.categoryAmount ):
         allData[req.body.editCate.cateIndex].amount += (req.body.editCate.categoryAmount - allData[req.body.editCate.cateIndex].categories[req.body.editCate.ind].amount )


        allData[req.body.editCate.cateIndex].categories[req.body.editCate.ind].category = req.body.editCate.categoryName;
        allData[req.body.editCate.cateIndex].categories[req.body.editCate.ind].amount = req.body.editCate.categoryAmount;

        console.log('aldata',allData[req.body.editCate.cateIndex].categories)
        res.send(JSON.stringify(allData))
    
    }
    else if(req.body.name === 'deltotal'){
        allData.splice(req.body.DeleteIndex,1)

        res.end(JSON.stringify(allData))
    }
     
})



app.listen(port,()=>console.log('your port',port))