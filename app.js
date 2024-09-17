const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Entry = require('./models/entry')
const date = require('date-fns')



const db ='mongodb+srv://nodeninja:testing321@nodeninjs.air6zgp.mongodb.net/dataEntry?retryWrites=true&w=majority&appName=nodeninjs'
mongoose.connect(db)
    .then((result)=>app.listen(5000))
    .catch((err)=>console.log(err))


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true})) //note when using this we have to use the req.body to send whatever we want to use.


app.get('/', (req,res)=>{
    res.redirect('/data')

})


app.get('/data', (req,res)=>{
    //setting up my date for my datecreated in my website
    Entry.find().sort()
        .then((result)=>{
            res.render('home', {title: 'Data', data: result, formattedDate: 'formattedDate'})
        })
        .catch((err)=>{
            console.log(err)
        })
})

app.post('/data', (req, res)=>{
    const entry = new Entry(req.body)
    entry.save()
        .then((result)=>{
            res.redirect('/')
        })
        .catch((err)=>{
            console.log(err)
        })
})


app.get('/entry', (req, res)=>{
    res.render('entries',{title: 'Data Entry'})
})


app.get('/about', (req, res)=>{
    res.render('about', {title : 'Data Ad'})
})


//routes for details page
app.get('/entry/:id', (req, res)=>{
    const id = req.params.id
    Entry.findById(id)  
        .then((result)=>{
            res.render('details',{ item: result, title: 'Details'})
        })
        .catch((err)=>{
            console.log(err)
        })
})

//routes for the delete page 
app.delete('/entry/:id', (req, res)=>{
    const id = req.params.id
    Entry.findOneAndDelete({_id : id})
        .then((result)=>{
            res.json({redirect: '/'})
        })
        .catch((err)=>{
            console.log(err)
        })
})



//this is for the 404 page
app.use((req,res)=>{
    res.status(404).render('404')
})
