import React, { Component } from "react";
import { ResponsiveBar } from "@nivo/bar";
import Dropdown from "../Dropdown/Dropdown.jsx";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import styles from './sidePanelCoexpressionPanel.module.scss';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Tooltip } from "react-tippy";
import Tippy from "@tippy.js/react";

class SidePanelCoexpressionPanel extends Component {
  state = {
    geneA: null,
    geneB: null,
    genesDisplayed: []
  };

  // https://www.ebi.ac.uk/gxa/search?geneQuery=[{“value”:”ASPM”}]#differential

  coexpContStyle = {
    display: "grid",
    gridArea: "1/1/11/7",
    backgroundColor: "#FFFFFF",
    height: "calc(100% - 24px)",
    width: "calc(100% - 24px)",
    margin: "12px",
    borderRadius: "5px",
    gridTemplateColumns: "repeat(8,1fr)",
    gridTemplateRows: "repeat(16, 1fr)",
  };

  sidePanelStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    gridArea: '1/1/9/5',
    backgroundColor: "rgb(255,255,255,0)",
    zIndex: 1,
  };

  chartWrapperAStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gridArea: "8/1/17/5",
    marginLeft: "0.8vw",
    marginRight: "0.2vw",
    marginBottom: "0.8vw",
    paddingTop: "15px",
    paddingBottom: "10px",
    backgroundColor: '#e6fcf5',
    borderRadius: '5px',
    border: "#76e2be solid 1px",
    transition: '0.2s'
  };

  chartWrapperBStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gridArea: "8/5/17/9",
    marginLeft: "0.2vw",
    marginRight: "0.8vw",
    marginBottom: "0.8vw",
    paddingTop: "15px",
    paddingBottom: "10px",
    backgroundColor: '#e6fcf5',
    borderRadius: '5px',
    border: "#76e2be solid 1px",
    transition: '0.2s'
  };

  annotationTextboxAStyle = {
    gridArea: '4/1/8/5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '0.8vw',
    marginRight: '0.2vw',
    marginBottom: '0.4vw',
    padding: '0.2vw',
    backgroundColor: '#e6fcf5',
    borderRadius: '5px',
    border: 'rgb(118, 226, 190) 1px solid',
    transition: '0.2s'
  }

  annotationTextboxBStyle = {
    gridArea: '4/5/8/9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '0.2vw',
    marginRight: '0.8vw',
    marginBottom: '0.4vw',
    padding: '0.2vw',
    backgroundColor: '#e6fcf5',
    borderRadius: '5px',
    border: 'rgb(118, 226, 190) 1px solid',
    transition: '0.2s'
  }

  annotationStyle ={
    fontSize: '0.8vw',
    padding: '0.2vw'
  }

  nivoTheme = {
    axis: {
      legend: {
        text: {
          fontSize: "clamp(10px, 0.75vw, 30px)",
        },
      },
      ticks: {
        text: {
          fontSize: "clamp(8px, 0.6vw, 26px)",
        },
      },
      domain: {
        line: {
          stroke: "#777777",
          strokeWidth: 1.5,
        },
      },
    },
  };

  tooltipContents = {
    annotExpressionLabel: "Select a pair of genes to compare. Click on either links for more information. Only maximum expression levels are displayed for each stage."
  }

  handleGeneSelectA = (gene) => {
    this.setState({
      geneA: gene == "select a gene" ? null : gene,
    });
  };

  handleGeneSelectB = (gene) => {
    this.setState({
      geneB: gene == "select a gene" ? null : gene,
    });
  };

  renderAnnotationText = (whichGene) => {

    if (this.props.annotation == undefined) {
      return (
        <div className={styles.scrollbarWrapper} id={'scrollbarWrapper' + whichGene} style={this[`annotationTextbox${whichGene}Style`]}>
          <div style={{textAlign: "center"}}>NO PROTEIN ON DISPLAY</div>
        </div>
      )
    } else if (this.state['gene' + whichGene] == null && this.props.genesDisplayed.length == 0) {
      return (
        <div className={styles.scrollbarWrapper} id={'scrollbarWrapper' + whichGene} style={this[`annotationTextbox${whichGene}Style`]}>
          <div style={{textAlign: "center"}}>LOADING ANNOTATION...</div>
        </div>
      )
    } else if (this.state['gene' + whichGene] == null && this.props.genesDisplayed.length > 0) {
      return (
        <div className={styles.scrollbarWrapper} id={'scrollbarWrapper' + whichGene} style={this[`annotationTextbox${whichGene}Style`]}>
          <div style={{textAlign: "center"}}>SELECT A PROTEIN TO VIEW ANNOTATION</div>
        </div>
      )
    } else {
      return (
        <div className={styles.scrollbarWrapper} id={'scrollbarWrapper' + whichGene} style={this[`annotationTextbox${whichGene}Style`]}>
          <PerfectScrollbar id={'annotationText' + whichGene}>
            <div style={this.annotationStyle}>{this.props.annotation[this.state['gene' + whichGene]]['annotation_text']}</div>
          </PerfectScrollbar>
        </div>
      )
    }

  }

  generateUniprotLink = (panel) => {

    if (this.state[panel] == null) {
      return
    } else if (this.props.annotation[this.state[panel]]['uniprot'] == false) {
      this.setState({
        geneA: 'noUniprot'
      })
      return
    } else {
      let uniprotID = this.props.annotation[this.state[panel]]['uniprot']
      return `https://www.uniprot.org/uniprotkb/${uniprotID}/entry`
    }

  }

  generateExpAtlasLink = (panel) => {

    if (this.state[panel] == null) {
      return
    } else {
      return `https://www.ebi.ac.uk/gxa/search?geneQuery=${this.state[panel]}#differential`
    }

  }

  handleVWDynamicMargins = (percentVW) => {
    return $(window).width() * (percentVW/100)
  }

  handleVHDynamicMargins = (percentVH) => {
    return $(window).height() * (percentVH/100)
  }

  static getDerivedStateFromProps(props, state) {

    let sortedGenesDisplayed = props.genesDisplayed.sort()

    if (props.genesDisplayed.length == 0) {
      return { geneA: null, geneB: null, genesDisplayed: []};
    } else if (sortedGenesDisplayed.toString() !== state.genesDisplayed.toString()) {
      return { genesDisplayed: sortedGenesDisplayed};
    } else {
      return null
    }

  }

  componentDidUpdate() {
    console.log('expression data',this.props.chartData[this.state.geneA])
  }

  render() {
    return (
      <div className={styles.sidePanel} id='side-panel' style={this.sidePanelStyle}>
        <div className={styles.coexpressionContainer} style={this.coexpContStyle}>

          <div 
            id='CoexpressionPanel-title'
            style={{
              gridArea: '1/1/2/9',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '0.8vh',
              fontSize: '1.4vw'
            }}
          >
            <strong>COEXPRESSION INVESTIGATOR</strong>

          </div>

          <div className={styles.dropdownsAndLinks} style={{gridArea: "2/1/3/5"}}>

            <div
              id='geneADropdownWrapper'
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
                height: '50%',
                marginLeft: "0.8vw",
                marginRight: "0.2vw"
              }}>
              <Dropdown
                key="dropdownA"
                id='geneACoexpDropdown'
                dropdownOptions={this.state.genesDisplayed}
                default={"select a gene"}
                onSelect={this.handleGeneSelectA}
                enabled={"true"}
              />
            </div>

            <div className={styles.linksRow} style={{marginLeft: '0.8vw', marginRight: '0.2vw'}}>

              <a className={this.state.geneA == null || this.state.geneA == styles.noUniprot ? styles.coexpUniprotLink + styles.disabled : styles.coexpUniprotLink} id='uniprot-link-geneA' target='_blank' href={this.generateUniprotLink('geneA')}> 
                <img src={"/static/graphics/uniprot_logo.svg"} className={styles.uniprotLogo}></img>
              </a>

              <a className={this.state.geneA == null ? styles.coexpExpAtlasLink + styles.disabled : styles.coexpExpAtlasLink} id='expAtlas-link-geneA' target='_blank' href={this.generateExpAtlasLink('geneA')}>
                <img src={"/static/graphics/expression-atlas.png"} className={styles.expAtlasLogo}></img>
                <div className={styles.expAtlasTitle}>
                  <div className={styles.ExpressionText}>Expression</div>
                  <div className={styles.AtlasText}>Atlas</div>
                </div>
              </a>
              
            </div>

          </div>
          
          <div className={styles.dropdownsAndLinks} style={{gridArea: "2/5/3/9",}}>

            <div
              id='geneBDropdownWrapper'
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
                height: '50%',
                marginRight: "0.8vw",
                marginLeft: '0.2vw',
              }}>
              <Dropdown
                key="dropdownB"
                id='geneBCoexpDropdown'
                dropdownOptions={this.state.genesDisplayed}
                default={"select a gene"}
                onSelect={this.handleGeneSelectB}
                enabled={"true"}
              />
            </div>

            <div className={styles.linksRow} style={{marginLeft: '0.2vw', marginRight: '0.8vw'}}>
              <a className={this.state.geneB == null || this.state.geneB == styles.noUniprot ? styles.coexpUniprotLink + styles.disabled : styles.coexpUniprotLink} id='uniprot-link-geneB' target='_blank' href={this.generateUniprotLink('geneB')}>
                <img src={"/static/graphics/uniprot_logo.svg"} className={styles.uniprotLogo}></img>
              </a>
              <a className={this.state.geneB == null ? styles.coexpExpAtlasLink + styles.disabled : styles.coexpExpAtlasLink}  id='expAtlas-link-geneB' target='_blank' href={this.generateExpAtlasLink('geneB')}>
                <img src={"/static/graphics/expression-atlas.png"} className={styles.expAtlasLogo}></img>
                <div className={styles.expAtlasTitle}>
                  <div className={styles.ExpressionText}>Expression</div>
                  <div className={styles.AtlasText}>Atlas</div>
                </div>
              </a>
            </div>

          </div>  

          <div 
          id='annotExpression-label' 
          style={{
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems:'center', 
            fontSize: '1.2vw', 
            gridArea:'3/1/4/9',
            paddingInline:'0.8vw',
          }}>
            <Tippy
              content={this.tooltipContents.annotExpressionLabel}
              placement='right'
              animation='shift-away'
              delay={[500, 0]}
              allowHTML={true}
              distance={15}
              theme='scoreInfo'           
            >
              <div id='annotExpression-label-wrapper' style={{display:'flex', width: 'auto', height: '100%', alignItems: 'center'}}>
                <InfoRoundedIcon style={{fontSize: '1.2vw', color: '#007a70', marginInlineEnd: '0.2vw'}}/>
                <strong>PROTEIN ANNOTATION AND EXPRESSION</strong>
              </div>
            </Tippy>
          </div>
          
          {this.renderAnnotationText('A')}

          {this.renderAnnotationText('B')}

          <div className={styles.barchartA} style={this.chartWrapperAStyle}>
            {this.state.geneA == null ? (
              <div
                className={styles.chartPlaceholder}
                style={{ textAlign: "center", fontSize: "1.8vw", paddingInline: '1vw'}}>
                SELECT A GENE TO COMPARE EXPRESSION LEVELS
              </div>
            ) : (this.props.chartData[this.state.geneA] === false ? (
              <div
                className={styles.chartPlaceholder}
                style={{ textAlign: "center", fontSize: "1.8vw", paddingInline: '1vw'}}>
                NO EXPRESSION DATA AVAILABLE
              </div>
            ) :
              <ResponsiveBar
                data={this.props.chartData[this.state.geneA]}
                indexBy='stage'
                keys={["high", "medium", "low", "expressed"]}
                colors={["#178967", "#52ba69", "#a2d88f", "#368de3"]}
                layout='horizontal'
                valueScale={{ type: "linear"}}
                indexScale={{ type: "band", round: true }}
                groupMode='stacked'
                margin={{bottom: this.handleVHDynamicMargins(4), right: this.handleVWDynamicMargins(0.8), left: this.handleVWDynamicMargins(2.8)}}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  legend: "max recorded TPM",
                  legendPosition: "middle",
                  legendOffset: this.handleVHDynamicMargins(3.4),
                  tickValues: 4,
                  min: 0
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  legend: "Thelier stages",
                  legendPosition: "middle",
                  legendOffset: this.handleVWDynamicMargins(-1.9),
                }}
                enableGridX={true}
                enableGridY={false}
                enableLabel={false}
                theme={this.nivoTheme}
              />
            )}
          </div>

          <div className={styles.barchartB} style={this.chartWrapperBStyle}>
            {this.state.geneB == null ? (
              <div
                className={styles.chartPlaceholder}
                style={{ textAlign: "center", fontSize: "1.8vw", paddingInline: '1vw'}}>
                SELECT A GENE TO COMPARE EXPRESSION LEVELS
              </div>
            ) : (this.props.chartData[this.state.geneB] === false ? (
              <div
                className={styles.chartPlaceholder}
                style={{ textAlign: "center", fontSize: "1.8vw", paddingInline: '1vw'}}>
                NO EXPRESSION DATA AVAILABLE
              </div>
            ) : 
              <ResponsiveBar
                data={this.props.chartData[this.state.geneB]}
                indexBy='stage'
                keys={["high", "medium", "low", "expressed"]}
                colors={["#178967", "#52ba69", "#a2d88f", "#368de3"]}
                layout='horizontal'
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                margin={{bottom: this.handleVHDynamicMargins(4), right: this.handleVWDynamicMargins(0.8), left: this.handleVWDynamicMargins(2.8)}}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  legend: "max recorded TPM",
                  legendOffset: this.handleVHDynamicMargins(3.4),
                  legendPosition: "middle",
                  tickValues: 4,
                  min: 0
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  legend: "Thelier stages",
                  legendPosition: "middle",
                  legendOffset: this.handleVWDynamicMargins(-1.9),
                }}
                enableGridX={true}
                enableGridY={false}
                enableLabel={false}
                theme={this.nivoTheme}
              />
            )}
          </div>

        </div>
      </div>
    );
  }
}

export default React.memo(SidePanelCoexpressionPanel);
