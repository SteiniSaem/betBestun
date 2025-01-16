<script lang="ts">
	import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';

	export let title:string;
	export let studull1:number;
	export let studull2:number;
	export let wager:number;
	export let fixedWagerSite:string
	export let variableWagerSite:string;

	let labels:number[] = []
	let data1:number[] = [];
	let data2:number[] = [];

	let canvas:HTMLCanvasElement;
	let chart:Chart;

	$: onChange(studull1, studull2, wager)

	function onChange(...args){
		if(chart){
			chart.data = generateData()
			chart.update();
		}
	}

	function generateData(){
		data1 = []
		data2 = []
		labels = []
		let loss1, loss2, win1, wagerSum
		let win2 = wager*studull2
		for(let i = 0.5*wager; i < 1.5*wager; i += 0.05){
			labels.push(Math.round(i*100)/100)
			win1 = i*studull1;
			wagerSum = wager + i
			loss1 = Math.round((wagerSum - win1)*100)/100
			loss2 = Math.round((wagerSum - win2)*100)/100
			//data1.push(Math.max(loss1, loss2))
			//data2.push(Math.min(loss1,loss2))
			data1.push(loss1)
			data2.push(loss2)
		}

		return {
			labels: labels,
			datasets: [
				{
					label: `Tap ef ${variableWagerSite} vinnur`,
					data: data1,
					fill: false,
					borderColor: 'rgb(75, 192, 192)',
					backgroundColor: 'rgb(75, 192, 192)',
					pointRadius: 1,
					pointStyle: 'circle'
				},
				{
					label: `Tap ef ${fixedWagerSite} vinnur`,
					data: data2,
					fill: false,
					borderColor: 'rgb(192, 20, 20)',
					backgroundColor: 'rgb(192, 20, 20)',
					pointRadius: 1,
					pointStyle: 'circle'
				},
			]
		}
	}

	onMount(() => {
		var ctx = canvas.getContext('2d');
		if(ctx) {
			chart = new Chart(ctx, 
				{
					type: 'line',
					options: {
						responsive: true,
						maintainAspectRatio: false,
						animation: false,
						scales: {
							y: {
								grid: {
									lineWidth: ({ tick }) => tick.value == 0 ? 2 : 1,
									color: ({ tick }) => tick.value == 0 ? 'rgb(255, 255, 255)' : 'rgba(20,20,20, 0.3)',
								}
							}
						},
						plugins: {
							legend: {
								labels: {
									color: 'white',
									usePointStyle: true,
									pointStyle: 'line',
									pointStyleWidth: 50
								}
							},
							tooltip: {
								intersect: false,
								mode: 'index',
								usePointStyle: true,
							}
						},
						elements: {
							point: {
								pointStyle: false
							}
						}
					},
					data: generateData()
				}
			);
		}
	})


	
</script>

<div class='w-full'>
	<h2>{title}</h2>
	<div>
		<canvas bind:this={canvas} height="500"></canvas>
	</div>
</div>
