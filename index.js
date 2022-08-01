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
    
        project.icon = checkBox[
          project.angular,
          project.react,
          project.node,
          project.vue
        ];
    
       
        console.log(project.angular);
        console.log(project.react);
        console.log(project.node);
        console.log(project.vue);
    
        // project.time1 = project.postAt; 
        
        return project;
    })
    console.log(newProject);
    res.render('index', {myProjects:newProject}) 

})

app.get('/contact-me',(req,res) => {
    res.render('Contact-me')
})

app.get('/my-project',(req,res) => {
    res.render('My-Project')
})


app.post('/my-project', (req,res) => {
    const data = req.body
    data.startDate
    // myProjects.push(data)
    console.log(myProjects);
   
    res.render("index");
       
      });
      


app.get('/detail-project',(req,res) => {  //:title
    // const title = req.params.title
    // console.log(title);
    res.render('detail-project')
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
            return 'durasi ' + month + ' bulan'
        }else{
            month = endMonth - startMonth
            return 'durasi ' + month + ' bulan'
        }
    } 
  
    
    if(endYear > startYear){
        if(endYear - startYear == 1){
            if(startMonth == endMonth){
                return 'durasi 1 tahun'
            }else if(startMonth > endMonth){
                month = (startMonth - endMonth - 12) * -1
                return 'durasi ' + month + ' bulan'
            }else if(startMonth < endMonth){
                month = endMonth - startMonth
                return 'durasi 1 tahun ' + month + ' bulan'
            }
        }else{
            year = endYear - startYear
            if(startMonth == endMonth){
                return 'durasi ' + year + ' tahun '
            }else if(startMonth > endMonth){
                year -= 1
                month = (startMonth - endMonth - 12) * -1
                return 'durasi ' + year + ' tahun ' + month + ' bulan'
            }else if(startMonth < endMonth){
                month = endMonth - startMonth
                return 'durasi ' + year + ' tahun ' + month + ' bulan'
            }
        }
    }

}
  
  function checkBox(angular, react, node, vue) {
    if (angular == true) {
      console.log(angular);
      return '<img id="angular" src="/public/assets/angular.png" alt="" />';
    } else if (react == true) {
      console.log(react);
      return '<img id="react" src="/public/assets/react.png" alt="" />';
    } else if (node == true) {
      console.log(node);
      return '<img id="node" src="/public/assets/node.png" alt="" />';
    } else if (vue == true) {
      console.log(vue);
      return '<img id="vue" src="/public/assets/vue2.png" alt="" />';
    }
    return false;
  }



