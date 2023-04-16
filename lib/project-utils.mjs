import fs from "fs";
import path from "path";

const projectsDir = path.join(process.cwd(),'/articles/projects')

export function getAllProjectIds() {
   console.log(projectsDir)
   const fileNames = fs.readdirSync(projectsDir)
   const pathNames = fileNames.map(fileName => fileName.replace(/\.json$/,''))
   return pathNames.map( pathName => {
      return {
         params: {
            projectID: pathName
         }
      }
   })
}


export function getProjectData(projectID) {
   const fullPath = path.join(projectsDir,`${projectID}.json`)
   const fileContents = JSON.parse(fs.readFileSync(fullPath))
   return {
      projectID,
      ...fileContents
   }
}

// console.log(getProjectData('cosmouse'))
