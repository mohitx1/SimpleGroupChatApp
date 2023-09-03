const express=require("express");
const bodyParser=require('body-parser');
const app=express();
const fs=require('fs');
const port=4000;

app.use(bodyParser.urlencoded({extended:false}))


app.get('/',(req,res)=>{
    fs.readFile('username.txt',(err,data)=>{
        if(err){
            console.log(`Error occured: ${err}`)
            data='No chat Exits'
        }
        res.send(
            `${data}<form action='/' method=POST onSubmit="document.getElementById('username')">
            <input type='text' name='message' id='message'>
            <input type='hidden' name='username' id='username'>
            <br>
            <button type="submit">send</button>
            </form>`
        )
    });

    app.post('/',(req,res)=>{
        console.log(req.body.username)
        console.log(req.body.message)
        fs.writeFile('username.txt',`${req.body.usename}: ${req.body.message}\n`,{flag:'a'},(err)=>{
            // err? console.log(`Error occured: ${err}`): res.redirect('/')
            if (err){
                console.error(`Error Occured: ${err}`)
            }else{
                res.redirect('/')
            }
        })
    })


})







app.listen(`${port}`,()=>{
    console.log(`Listening to port: ${port}`)
})
