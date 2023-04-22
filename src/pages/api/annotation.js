import excuteQuery from "../../../lib/db.js";

export default async function(req,res) {

   if (req.method === 'GET') {

      const geneList = req.query.geneList.split(',')

      if (geneList.length === 0) {
         return res.status(204)
      }

      const annotationSqlQuery = "('9606." + geneList.join("',9606.'") + "')"

      const annotationData = await excuteQuery({
         query: `SELECT preferred_name, annotation FROM string_protein_info WHERE string_id IN ${annotationSqlQuery}`
      })

      let annotations = {}

      annotationData.forEach(annotation => {
         annotations[annotation.preferred_name] = annotation.annotation
      })

      return res.status(200).json(annotations)

   }

}