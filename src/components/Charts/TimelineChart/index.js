import React from 'react';
import { Chart, Tooltip, Geom, Legend, Axis } from 'bizcharts';
import DataSet from '@antv/data-set';
// import Slider from 'bizcharts-plugin-slider';
import autoHeight from '../autoHeight';
import styles from './index.less';

@autoHeight()
class TimelineChart extends React.Component {
  render() {
    const {
      title,
      height = 800,
      padding = [60, 25, 40, 40],
      titleMap = {
        y1: 'y1',
        y2: 'y2',
      },
      borderWidth = 2,
      data: sourceData,
    } = this.props;

    const data = Array.isArray(sourceData) ? sourceData : [{ x: 0, y1: 0, y2: 0 }];

    data.sort((a, b) => a.x - b.x);

    let max;
    let min;
    if (data[0] && data[0].y1 && data[0].y2) {
      max = Math.max(
        [...data].sort((a, b) => b.y1 - a.y1)[0].y1,
        [...data].sort((a, b) => b.y2 - a.y2)[0].y2
      );
      min = Math.min(
        [...data].sort((a, b) => a.y1 - b.y1)[0].y1,
        [...data].sort((a, b) => a.y2 - b.y2)[0].y2
      );
    }

    const ds = new DataSet({
      state: {
        start: data[0].x,
        end: data[data.length - 1].x,
      },
    });

    const dv = ds.createView();
    dv.source(data)
      .transform({
        type: 'filter',
        callback: obj => {
          const date = obj.x;
          return date <= ds.state.end && date >= ds.state.start;
        },
      })
      .transform({
        type: 'map',
        callback(row) {
          const newRow = { ...row };
          newRow[titleMap.y1] = row.y1;
          newRow[titleMap.y2] = row.y2;
          return newRow;
        },
      })
      .transform({
        type: 'fold',
        fields: [titleMap.y1, titleMap.y2], // 展开字段集
        key: 'key', // key字段
        value: 'value', // value字段
      });

    const timeScale = {
      type: 'time',
      // tickInterval: 60 * 60 * 1000,
      mask: 'HH:mm:ss',
      range: [0, 1],
    };


    const cols = {
      x: timeScale,
      value: {
        max,
        min
      },
    };

    return (
      <div className={styles.timelineChart} style={{ height }}>
        <div>
          {title && <h4>{title}</h4>}
          <Chart height={height} padding={padding} data={dv} scale={cols} forceFit>
            <Legend />
            <Axis name="x" />
            <Tooltip />
            <Legend name="key" position="top" />
            <Geom type="line" position="x*value" size={borderWidth} color="key" />
            <Geom 
              type='point' 
              position="x*value" 
              shape="circle"
              color="key"
              style={{
                stroke: "#fff",
                lineWidth: 1
              }}
            />
          </Chart>
          {/* <div style={{ marginRight: -20 }}>
            <SliderGen />
          </div> */}
        </div>
      </div>
    );
  }
}

export default TimelineChart;
