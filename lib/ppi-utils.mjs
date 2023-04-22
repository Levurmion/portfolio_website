
export function calcStringScores(interaction, scoresheet) {

   console.log(interaction)

   const PRIOR = 0.041

   if (scoresheet.includes('score')) {
      interaction.combinedScore = parseFloat((interaction.score/1000).toFixed(3))
      return interaction
   }

   else {
      const scoresToCombine = scoresheet.map(scoreChannel => interaction[scoreChannel]/1000)
      const scoresNoPrior = scoresToCombine.map(score => (score-PRIOR)/(1-PRIOR))

      let invScoreProduct = 1

      scoresNoPrior.forEach(score => {
         invScoreProduct *= (1 - score)
      })

      const totalScore = parseFloat((((1 - invScoreProduct) * (1 - PRIOR)) + PRIOR).toFixed(3))
      interaction.combinedScore = totalScore

      return interaction
   }

}