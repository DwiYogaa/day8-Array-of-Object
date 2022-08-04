const express = require ('express')

const app = express()
const port = 5300
const isLogin = true
let myProjects = [] //global variable

app.set('view engine', 'hbs')

app.use('/public', express.static(__dirname + '/public'))

app.use(express.urlencoded({extended: false}))

// console.log(__dirname);

app.get('/',(req,res) => {
    
    const newProject = myProjects.map((project) => {

        project.startDate = new Date(project.startDate);
        project.endDate = new Date(project.endDate);
        project.time = getFullTime(project.endDate, project.startDate);
    
        return project;
    })
    // console.log(newProject);
    res.render('index', {isLogin:isLogin, myProjects:newProject}) 

})

app.get('/contact-me',(req,res) => {
    res.render('Contact-me')
})

app.get('/my-project',(req,res) => {
    res.render('My-Project')
})


app.post('/my-project', (req,res) => {
    const data = req.body
    myProjects.push(data)
    // console.log(myProjects);
    res.redirect("/");
    // res.render("index");
       
      });
   
app.get('/detail-project/:index',(req,res) => {  //:title
    const index = req.params.index

    const detail = myProjects [index]

    console.log(detail);
    res.render('detail-project',{ detail })
})

app.get('/delete/:index',(req,res) => {
    const index = req.params.index
    myProjects.splice(index, 1);

    // console.log(index);
    res.redirect("/");
    

})

app.get('/edit-project',(req,res) => {
    const { id } = req.params;
    const data = myProjects[id];
    console.log(data);
    res.render("edit-project", { data: { ...data, id }
    });
    res.render('edit-project')
    
})
app.post('/edit-project',(req,res) => {
    const { id } = req.params;
    const { title, startDate, endDate, description } = req.body;
  
    myProjects[id] = {
      ...myProjects[id],
      title,
      startDate,
      endDate,
      description,
      // Image: req.body.Image,
    };
  
    res.redirect("/");
    res.render('edit-project')
  
    })

app.listen(port, () => {
    console.log(`Personal Web App listening on port ${port}`)
})

function getFullTime(endDate, startDate){
    // let month
    // let year
    
    let endMonth = endDate.getMonth()
    let startMonth = startDate.getMonth()
    let endYear = endDate.getFullYear()
    let startYear = startDate.getFullYear()

    if(startYear == endYear){
        if(startMonth == endMonth){
            month = 1
            return  month + ' Month'
        }else{
            month = endMonth - startMonth
            return  month + ' Month'
        }
    } 
  
    
    if(endYear > startYear){
        if(endYear - startYear == 1){
            if(startMonth == endMonth){
                return ' 1 tahun'
            }else if(startMonth > endMonth){
                month = (startMonth - endMonth - 12) * -1
                return  month + ' Month'
            }else if(startMonth < endMonth){
                month = endMonth - startMonth
                return  month + ' Month'
            }
        }else{
            year = endYear - startYear
            if(startMonth == endMonth){
                return  year + ' Year '
            }else if(startMonth > endMonth){
                year -= 1
                month = (startMonth - endMonth - 12) * -1
                return  year + ' Year ' + month + ' Month'
            }else if(startMonth < endMonth){
                month = endMonth - startMonth
                return  year + ' Year ' + month + ' Month'
            }
        }
    }

}
  


