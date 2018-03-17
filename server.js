const express =require('express')
const hbs=require('hbs');
const fs=require('fs');

const port=process.env.PORT || 3000;
var app=express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs')


app.use((req,res,next)=>{
	var time=new Date().toString();
	var log=`${time} ${req.method} ${req.url}`;
	fs.appendFile('server.log',log +'\n',(err)=>{if(err)console.log('Unable to append to server.log')});
	console.log(log)
	next();
})

app.use(express.static(__dirname+'/public'))

hbs.registerHelper('getyear',()=>new Date().getFullYear()) 
hbs.registerHelper('CAPS',(text)=>text.toUpperCase())


app.get('/',(req,res)=>{
	//res.send("<h1>Hello Express!<h1>")
	res.render('home.hbs',{
		title:'Welcome Page',
		message:'Hello'
	});
});

app.get('/projects',(req,res)=>{
	//res.send("<h1>Hello Express!<h1>")
	res.render('project.hbs',{
		title:'Projects'
	});
});

app.get('/ab',(req,res)=>{
	//res.send("<h1>Hello Express!<h1>")
	res.render('ab.hbs',{
		title:'About Page',
		message:'Some text here',
	});
});

app.listen(port,()=>console.log('Server is on'));