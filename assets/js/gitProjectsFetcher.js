class Project {
    constructor(name, description, link) {
        this.name = name;
        this.description = description;
        this.link = link;
    }
    static fetch() {
        // Get public repos from Github API
        return new Promise((resolve, reject) => {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", 'https://api.github.com/users/AstroLuluGit/repos')
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        const projectArray = [];
                        
                        JSON.parse(xhttp.responseText).forEach(element => {
                            projectArray.push(new Project(element.name, element.description, element.html_url))
                        });
                        
                        resolve(projectArray);
                    }
                    else reject('Error ' + this.status);
                }
            }
            xhttp.send();
        })
    }
}
createProjectEntries();

function createProjectEntries() {
    /**
     * Get Public Git Repos
     * Get Names of Repos
     * Create Divs in myProjects
     * Add Project info to div
     * 
    */ 
   
    Project.fetch()
    .then(projectArray => {
        projectArray.forEach((project) => {           
            const projectDiv = document.getElementById('gitProjects');
            const workItemDiv = document.createElement('div');
            const projectNameParent = document.createElement('h3');
            const projectNameChild = document.createElement('a');
            const projectDescriptionChild = document.createElement('h5');

            if(project.description === null) {
                project.description = 'This project has no description yet.'
            }
            projectNameChild.setAttribute('href', project.link)
            projectNameChild.innerHTML = project.name;
            projectDescriptionChild.innerHTML = project.description


            // Create project Div and fill it with Elements          
            workItemDiv.classList.add('project-item')
            projectDiv.appendChild(workItemDiv);
            
            workItemDiv.appendChild(projectNameParent);
            
            projectNameParent.appendChild(projectNameChild);
            
            workItemDiv.appendChild(projectDescriptionChild);
        });       
    })
    .catch(error => {
        console.error(error)
    })
}

//https://api.github.com/users/AstroLuluGit/repos