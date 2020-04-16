import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Button, Table, Row, Col } from 'reactstrap';
import './App.css';

function App() {

  const [table, setTable] = useState([]);
  const [chartOptions, setChartOptions] = useState([]);

  useEffect(() => {
    fetch('./retrieve').then(res => res.json()).then(data => {
        console.log(data)
        setTable(data);
        let chart = {
          title: {
            text: 'Keg Usage'
          },
          yAxis: {
            title: {
              text: 'Beers'
            }
          },
          xAxis: {
            accessibility: {
              rangeDescription: 'Range'
            }
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
          },
          series: [
            {
              data: data
            }
          ],
        }

        setChartOptions(chart)
    
    });
  }, []);

  const refreash = () => {
    fetch('./retrieve').then(res => res.json()).then(data => {
      console.log(data)
      setTable(data);
      let chart = {
        title: {
          text: 'Keg Usage'
        },
        yAxis: {
          title: {
            text: 'Beers'
          }
        },
        xAxis: {
          accessibility: {
            rangeDescription: 'Range'
          }
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
        },
        series: [
          {
            data: data
          }
        ],
      }

      setChartOptions(chart)
  
  });
  }

  return (
    <div className="App">
      <Row className="headerRow">
        <Col lg={4} />
        <Col lg={4}>
          <h3>Kegsite</h3>
        </Col>
        <Col lg={4} />
      </Row>
      <Row className="">
        <Col lg={3} />
        <Col sm={6}>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
          />
        </Col>
        <Col lg={3} />
      </Row>
      <Row>
        <Col lg={3} />
        <Col lg={6} className="table">
          <Table>
            <thead>
              <tr className="stick-column">
                <th>Beers</th>
                <th>Weight</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {table.map((item, key) => {
                return <tr key={key}>
                  <th scope="row">{item.beers}</th>
                  <th>{item.weight}</th>
                  <th>{item.date}</th>
                </tr>
              })}
            </tbody>
          </Table>
        </Col>
        <Col lg={3} />
      </Row>
    </div>
  );
}

export default App;
