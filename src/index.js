import "babel-polyfill";
import Chart from "chart.js";

const meteoURL = "/xml.meteoservice.ru/export/gismeteo/point/140.xml";
 
 //Temperatura
 async function loadWeather() {
  const responseWe = await fetch(meteoURL);//отправили запрос
  const xmlWe = await responseWe.text();//promise
  const parserWe = new DOMParser();//object domparser
  const WeatherData = parserWe.parseFromString(xmlWe, "text/xml");//return xml-doc
   // <TEMPERATURE max="6" min="2"/>
    
	const tempr = WeatherData.querySelectorAll("TEMPERATURE[max][min]");
	const resultTempr = Object.create(null);
	
  for (let i = 0; i < tempr.length; i++) {
	const temprTag = tempr[i];
	
	let max = temprTag.getAttribute("max"); let min = temprTag.getAttribute("min");
	const averTemp=(Number(max)+Number(min))/2;
	
	resultTempr[i] = averTemp;
	console.log(resultTempr[i]);
	}
  return  resultTempr;
}
 
 //Heat
 async function loadWeather1() {
  const responseWe = await fetch(meteoURL);//отправили запрос
  const xmlWe = await responseWe.text();//promise
  const parserWe = new DOMParser();//object domparser
  const WeatherData = parserWe.parseFromString(xmlWe, "text/xml");//return xml-doc
   // <TEMPERATURE max="6" min="2"/>
    
	const heat=WeatherData.querySelectorAll("HEAT[max][min]");
    const resultHeat = Object.create(null);
		
  for (let i = 0; i < heat.length; i++) {
	const heatTag = heat[i];
	let max = heatTag.getAttribute("max");  let min = heatTag.getAttribute("min");
	const averHeat=(Number(max)+Number(min))/2;
	 
	resultHeat[i] = averHeat;
	
	}
  return  resultHeat;
}
   
const buttonBuild = document.getElementById("btn");
const canvasCtx = document.getElementById("out").getContext("2d");


buttonBuild.addEventListener("click", async function() {
   
   const WeatherData = await loadWeather();
   const WeatherData1 = await loadWeather1();

 const keys = Object.keys(WeatherData);
 const plotData = keys.map(key => WeatherData[key]);
  
  
  const keys1 = Object.keys(WeatherData1);
  const plotData1 = keys.map(key => WeatherData1[key]);
  
  
  const chartConfig = {
    type: "line",

    data: {
      labels: ["21","03","09","15"],
      datasets: [
        {
          label: "Температура",
          backgroundColor: "rgb(255, 00, 20)",
          borderColor: "rgb(0, 0, 0)",
          data: plotData,
		   
        },
		{
          label: "Температура по ощущениям",
          backgroundColor: "rgb(055, 200, 20)",
          borderColor: "rgb(0, 0, 0)",
          data: plotData1,
		}
			
      ]
	  
    }
	
  };

  
  if (window.chart) {
    chart.data.labels = chartConfig.data.labels;
    chart.data.datasets[0].data = chartConfig.data.datasets[0].data;
    chart.update({
      duration: 800,
      easing: "easeOutBounce"
    });
  } else {
    window.chart = new Chart(canvasCtx, chartConfig);
  }
});

