const express = require('express')
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const Blog = require('./models/blogs')
const url =  'mongodb://localhost/blogs';
const app = express();

//  connect to mongodb
  //  MONGOOSE PRESETS...
  mongoose.connect(url, {useNewUrlParser:true});
  const con = mongoose.connection;

  con.on('open', function(){
    console.log('connected...');
});

//  register view engine setting
app.set('view engine', 'ejs')

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));


// home routes  
app.get('/',(req,res) => {
  res.redirect('/blogs')
})

// about page
app.get('/about',(req,res) => {
    res.render('about', {title: 'About'})
})

//  blog routes
app.get('/blogs', (req,res) => {
 
    Blog.find().sort({ createdAt: -1})
    .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result})
    })
    .catch((err) => {
        console.log(err);
    })
})

// post method
app.post('/blogs', (req,res) => {
    const blog = new Blog(req.body)
    
    blog.save()
    .then((result) => {
        res.redirect('/blogs')
    })
    .catch((err) => {
        console.log(err);
    })
    
})
 app.get('/detail', (req,res) => {
    res.render('details', { title: 'details',})

    
 })

// app.get('/blogs/:id', (req,res) => {
//     // console.log(id);
//     const id = req.params.id
//     Blog.findById(id)
//        .then((result ) => {
//         render('details', { blog: result, title: 'Blog Detail '})
//        })
//        .catch(err => {
//         console.log(err);
//        })
    
// })

 
app.get('/blogs/create', (req,res) => {
    res.render('create', {title: 'Create a new blog'})
})

app.use((req,res) => {
    res.status(404).render('404', {title: '404'})
})




// listen port
app.listen(9090, () => {
    console.log('port connected 9090');
})
















































































// const express = require('express')
// const morgan = require('morgan');
// const mongoose = require('mongoose');
// const Blog = require('./models/blogs')
// const url =  'mongodb://localhost/Blog';
// mongoose.set('strictQuery', true);


// const app = express();

//   //  MONGOOSE PRESETS...
//   mongoose.connect(url, {useNewUrlParser:true});
//   const con = mongoose.connection;

//   con.on('open', function(){
//     console.log('connected...');
// });

// //  register view engine setting
// app.set('view engine', 'ejs')

// // middleware & static files
// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true}));
// app.use(morgan('dev'));

// // mongoose and mongo sandbox files
// app.get('/add-blog',(req,res) => {
//     const blog = new Blog({
//         title: 'new blog',
//         snippet: 'more about my blog',
//         body: 'about my new blog'
//     })
//     Blog.save()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })


// // routes
// app.get('/',(req,res) => {
//   res.redirect('/blogs')
// })


// app.get('/about',(req,res) => {
//     res.render('about', {title: 'About'})
// })

// //  blog routes
// app.get('/blogs', (req,res) => {
//     Blog.find().sort({ createdAt: -1})
//     .then((result) => {
//         res.render('index', { title: 'All Blogs', blogs: result})
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })

// // app.post('/blogs', (req,res) => {
// //     const blog = new Blog(req.body)
    
// //     blog.save()
// //     .then((result) => {
// //         res.redirect('/blogs')
// //     })
// //     .catch((err) => {
// //         console.log(err);
// //     })

// // })


// app.get('/blogs/create', (req,res) => {
//     res.render('create', {title: 'Create a new blog'})
// })

// app.use((req,res) => {
//     res.status(404).render('404', {title: '404'})
// })




// // listen port
// app.listen(9090, () => {
//     console.log('port connected 9090');
// })