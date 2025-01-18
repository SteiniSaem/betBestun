<script lang="ts">
	import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';
	import { graphMargin, epicbetLineColor, coolbetLineColor } from './store';

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

	$: updateGraph(studull1, studull2, wager, $graphMargin, $epicbetLineColor, $coolbetLineColor)
	

	function updateGraph(...args){
		if(chart){
			chart.data = generateData()
			chart.update();
		}
	}

	function colorObjToString(o) {
		return `rgba(${o.r}, ${o.g}, ${o.b}, ${o.a})`
	}

	function generateData(){
		data1 = []
		data2 = []
		labels = []
		let loss1, loss2, win1, wagerSum
		let win2 = wager*studull2
		let c = $graphMargin/100
		for(let i = (1-c)*wager; i < (1+c)*wager; i += 0.05){
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
					borderColor: fixedWagerSite == 'Epicbet' ? colorObjToString($coolbetLineColor) : colorObjToString($epicbetLineColor),
					backgroundColor: fixedWagerSite == 'Epicbet' ? colorObjToString($coolbetLineColor) : colorObjToString($epicbetLineColor),
					pointRadius: 1,
					pointStyle: 'circle'
				},
				{
					label: `Tap ef ${fixedWagerSite} vinnur`,
					data: data2,
					fill: false,
					borderColor: fixedWagerSite == 'Epicbet' ? colorObjToString($epicbetLineColor) : colorObjToString($coolbetLineColor),
					backgroundColor: fixedWagerSite == 'Epicbet' ? colorObjToString($epicbetLineColor) : colorObjToString($coolbetLineColor),
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
									color: ({ tick }) => tick.value == 0 ? 'rgb(255, 255, 255)' : 'rgba(148, 163, 184, 0.2)',
								},
								ticks: {
									color: 'rgba(203, 213, 225, 0.8)'
								}
							},
							x: {
								grid: {
									color: 'rgba(148, 163, 184, 0.1)'
								},
								ticks: {
									color: 'rgba(203, 213, 225, 0.8)'
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
		<canvas bind:this={canvas} height="370"></canvas>
	</div>
</div>

<style>
</style>

