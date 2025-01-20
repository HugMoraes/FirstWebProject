

Chart.defaults.font.size = 14;
Chart.defaults.color = '#a6a6a6';




var ctx = document.getElementById('myChart');
var myChart_1 = new Chart(ctx, {
    type: 'bar',
    
    
    
    data: {
        labels: ['PIS', 'COFINS', 'ICMS', 'CIP', 'BT'],
        datasets: [{
            // label: 'Encargos e Tributos',
            data: [1.26, 5.82, 33.95, 26.99, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            datalabels: {
                color: 'white',
                anchor: 'end',
                align: 'top'
            }

        }]
    },

    plugins: [ChartDataLabels],

    options: {

        responsive: true,
        

        plugins: {



            title: {
                display: true,
                text: 'Encargos e Tributos (R$)',
                color: 'rgb(255, 255, 255)'
            },

            legend: {
                
                display: false,
                    
            }
        },
            
        scales: {

            y: {
                max: Math.round(33.95*1.1),
                min: 0
            },

            
        }
    },

    

});



