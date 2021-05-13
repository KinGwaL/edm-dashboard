import {
  XYPlot,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries,
  FlexibleXYPlot
} from 'react-vis';

import React from 'react';
import { CLICK_KAFKA_TOPIC, PAGE_LOAD_KAFKA_TOPIC } from './kafka-topics.js';

function getSeconds() {
  return Math.floor(new Date().getTime() / 1000);
}

export default class AreaSeriesChart extends React.Component {
  constructor(props) {
    super(props);
    this.clickCounter = 0;
    this.loadCounter = 0;
    this.state = {
      data:[],
      loadData: [],
      lastClickCount : 0,
      lastLoadCount : 0,
      maxDomain : 15
    };
  }

  addOneClick() {
    this.clickCounter += 1
  }

  addOneLoad() {
    this.loadCounter += 1
  }

  componentDidMount() {
    this._timerId = setInterval(() => {
      this.setState({
        data:this.state.data.concat({x:getSeconds(), y: this.clickCounter}),
        loadData:this.state.loadData.concat({x:getSeconds(), y: this.loadCounter}),
        lastClickCount: this.clickCounter,  
        lastLoadCount: this.loadCounter,
        maxDomain: Math.max(this.state.maxDomain,this.state.lastLoadCount,this.state.lastClickCount, 15)  
      });
      
      this.clickCounter=0;
      this.loadCounter=0;
    }, 3000);
  }

  componentWillUnmount(){
    clearInterval(this._timerId);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.latestMessage) {
      const json = JSON.parse(newProps.latestMessage);
      switch (json.topic) {
        case CLICK_KAFKA_TOPIC:
          this.addOneClick();
          break;
        case PAGE_LOAD_KAFKA_TOPIC:
          this.addOneLoad(); 
          break;
        case GENERAL_TOPIC:
          this.addOneClick();
          break;
      default:
        console.log("default switch")
        break;
      }
    }
  }

  render() {
    let quotientClicks = Math.floor(this.state.data.length/10);
    let remainderClicks = this.state.data.length % 10;
    let indexClicks = 10*(quotientClicks - 1) + remainderClicks;
    let finalDataClicks = (this.state.data && this.state.data.length > 10)
                   ? this.state.data.slice(indexClicks) : this.state.data; 
    
    let quotientLoads = Math.floor(this.state.loadData.length/10);
    let remainderLoads = this.state.loadData.length % 10;
    let indexLoads = 10*(quotientLoads - 1) + remainderLoads;
    let finalDataLoads = (this.state.loadData && this.state.loadData.length > 10)
                   ? this.state.loadData.slice(indexLoads) : this.state.loadData; 
    // console.log("finalDataClicks",finalDataClicks);
    // console.log("finalDataLoads",finalDataLoads);
    return (
      <div>
        { this.props.width ?
          <XYPlot width={this.props.width} height={400} yDomain={[0, this.state.maxDomain]} >
            <VerticalGridLines />
            <HorizontalGridLines />
            <YAxis />
          <AreaSeries curve="curveMonotoneX" data={finalDataClicks} animation='gentle' />
          <AreaSeries curve="curveMonotoneX" data={finalDataLoads} animation='gentle'/>
        </XYPlot>
        :
        <FlexibleXYPlot height={400} yDomain={[0, this.state.maxDomain]} >
            <VerticalGridLines />
            <HorizontalGridLines />
            <YAxis />
          <AreaSeries curve="curveMonotoneX" data={finalDataClicks} animation='gentle' />
          <AreaSeries curve="curveMonotoneX" data={finalDataLoads} animation='gentle'/>
        </FlexibleXYPlot>
      }
      </div>
    );
  }
}
