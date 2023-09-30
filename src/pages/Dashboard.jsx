import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { toyService } from '../services/toy.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';


ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export function Dashboard() {
    const [stockCounts, setStockCounts] = useState({ inStockCount: 0, outOfStockCount: 0 });

    useEffect(() => {
        stockCounter()
            .then(counts => setStockCounts(counts))
            .catch(err => console.error(err));
    }, []);

    async function stockCounter() {
        try {
            const toys = await toyService.query()
            const countObj = toys.reduce((countObj, toy) => {
                if (toy.inStock === true) {
                    countObj.inStockCount += 1;
                } else if (toy.inStock === false) {
                    countObj.outOfStockCount += 1;
                }
                return countObj;
            }, { inStockCount: 0, outOfStockCount: 0 });

            const inStockCount = countObj.inStockCount;
            const outOfStockCount = countObj.outOfStockCount;

            console.log('In Stock Count:', inStockCount);
            console.log('Out of Stock Count:', outOfStockCount);

            return { inStockCount, outOfStockCount };

        } catch (err) {
            console.log('toy action -> Cannot load toys', err);
            throw err;
        }
    }

    const { inStockCount, outOfStockCount } = stockCounts;

    const data = {
        labels: ['In stock', 'Out of stock'],
        datasets: [
            {
                label: '# of Votes',
                data: [inStockCount, outOfStockCount],
                backgroundColor: ['#ffcd0088', '#ff000088'],
                borderColor: ['#ffcd00', '#ff0000'],
                borderWidth: 1,
                datalabels: {
                    // fontSize: '25px',
                    color: '#fff',
                    font: {
                        size: '25px',
                        weight: 'bold'
                    },
                    textStrokeColor: '#0060b4',
                    textStrokeWidth: 5
                },
            }],
        plugins: [ChartDataLabels]
    };

    const textCenter = {
        id: 'textCenter',
        beforeDatasetDraw(chart) {
            const { ctx, data } = chart
            ctx.save()
            ctx.font = 'bolder 25px sans-serif'
            ctx.fillStyle = '#0077e0'
            ctx.textAlign = 'center'
            ctx.textBaseLine = 'middle'

            const sum = data.datasets[0].data.reduce((acc, num) => acc + num, 0);
            ctx.fillText(`Total\n${sum}`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y)
        }
    }

    return (
        <div className='dashboard-container'>
            <Doughnut data={data} plugins={[textCenter]} />
        </div>
    )
}