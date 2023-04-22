import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import MainPanel from '../MainPanel/MainPanel.jsx';
import SidePanelCoexpressionPanel from '../SidePanelCoexpressionPanel/SidePanelCoexpressionPanel.jsx';
import ViewCoexpressionButton from '../ViewCoexpressionButton/ViewCoexpressionButton.jsx';

import styles from './firstLineContainer.module.scss';

export default class FirstLineContainer extends Component {
  state = { 
    coexpDisplay: false,
    coexpData: null,
    geneAnnotation: null,
   } 

  handleViewCoexpButtonClick = () => {
    this.setState({
      coexpDisplay: !this.state.coexpDisplay
    })
  }

  // This gets the annotation data from django
  getAnnotation = () => {
    let annotationInfo = fetch('/results/annotation')

    annotationInfo
    .then(response => {
      if (response.status == 204) {
        this.setState({
          geneAnnotation: false
        })
      } else {
        return response.json()
      }
    })
    .then(data => {
      this.setState({
        geneAnnotation: data
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  // This generates a STRING link to the currently displayed network STRING REST API
  getLinkToSTRINGNetwork = (proteins) => {

    // if no proteins are returned, dont do anything
    if (proteins.length === 0) {
      return

    // if there is something, fetch stable links from the STRING API
    } else {

      let proteinQueryStr = proteins.join('%0d')
      let speciesCode = 9606

      let STRINGLinks = fetch(`https://string-db.org/api/json/get_link?identifiers=${proteinQueryStr}&species=${speciesCode}`, {method: 'GET', mode: 'cors'})

      STRINGLinks
      .then(response => response.json())
      .then(link => {
        localStorage.setItem('displayedNetwork',link[0])
      })

    }

  }

  getCoexpData = (data) => {

    // reset states
    this.setState({
      coexpData: null,
      geneAnnotation: null,
      STRINGNetworkLink: null,
      STRINGProteinLinks: null
    })

    this.getAnnotation()
    this.getLinkToSTRINGNetwork(Object.keys(data))
    // this.getProteinSTRINGLinks(Object.keys(data))

    this.setState({
      coexpData: data
    })
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  render() { 
    return (
      <div className={styles.firstLineContainer} style={{fontSize: '1vw'}}> 
        <SidePanelCoexpressionPanel 
        chartData={this.state.coexpData} 
        genesDisplayed={this.state.coexpData == null ? [] : Object.keys(this.state.coexpData)}
        annotation={this.state.geneAnnotation}
        />
        <MainPanel liftCoexpData={this.getCoexpData}/>
      </div>
    );
  }
}