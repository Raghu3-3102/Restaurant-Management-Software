import React from 'react'
import Chart from 'react-apexcharts'

function BarChart() {
  return (
    <div>
      <Chart
      type="bar"
      width={800}
      height={350}
      series={[
        {
            name: "users",
            data:[45455,65656,6666,6565,7676.6868,7999,75666]
        }
      ]}

      options={
        {
            

        }
    }
      >

      </Chart>
     
    </div>
  )
}

export default BarChart
