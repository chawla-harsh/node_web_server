const express =require('express')
const hbs=require('hbs');
const fs=require('fs');

var app=express();

app.set('view engine','hbs')

hbs.registerHelper('getyear',()=>new Date().getFullYear())
hbs.registerHelper('CAPS',(text)=>text.toUpperCase())

// app.use((req,res,next)=>{
// 	res.render('maintenance.hbs')
// })


app.use(express.static(__dirname+'/public'))

app.use((req,res,next)=>{
	var time=new Date().toString();
	var log=`${time} ${req.method} ${req.url}`;
	fs.appendFile('server.log',log +'\n',(err)=>{if(err)console.log('Unable to append to server.log')});
	console.log(log)
	next();
})

app.get('/',(req,res)=>{
	//res.send("<h1>Hello Express!<h1>")
	res.render('home.hbs',{
		title:'Welcome Page',
		message:'Hello'
	});
});

app.get('/ab',(req,res)=>{
	//res.send("<h1>Hello Express!<h1>")
	res.render('ab.hbs',{
		title:'About Page',
		message:'Some text here',
	});
});

app.listen(1546,()=>console.log('Server is on'));