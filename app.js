const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const app = express();

const dbURL = 'mongodb+srv://mp1:mp1234@node-test.ahwbvfa.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURL,{useNewUrlParser:true, useUnifiedTopology:true})
.then((result)=>app.listen(3000))
.catch((err)=> console.log(err))




app.set('view engine','ejs');





app.use(express.static('public'))
app.use(morgan('dev'));


app.get('/add-blog',(req,res)=>{
const blog = new Blog({
    title: 'new blog 2',
    snippet : 'about my new blog',
    body : 'more about my new blog'
});
blog.save()
.then((result)=>{
    res.send(result);
})
.catch((err)=>{
    console.log(err);
})
})



app.get('/all-blogs',(req,res)=>{
Blog.find()
.then((result)=>{
res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get('/single-blog',(req,res)=>{
    Blog.findById('65caab3e7884736977802c33')
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get('/',(req,res)=>{
    res.redirect('/blogs');
})


app.get('/about',(req,res)=>{
    
 res.render('about',{title: 'About'});
})




app.get('/blogs',(req,res)=>{
    Blog.find().sort({ createdAt : -1})
    .then((result)=>{
        res.render('index',{title:'All Blogs', blogs: result})
    })
    .catch((err)=>{
        console.log(err)
    })
})


app.get('/blogs/create',(req,res)=>{
    res.render('create',{title: 'Create a new blog'});
})

app.use((req,res)=>{
    res.status(404).render('404',{title: '404'});
})

