<script lang="ts">
	import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';

	export let title:string;
	export let studull1:number;
	export let studull2:number;
	export let wager:number;

	let labels:number[] = []
	let data1:number[] = [];
	let data2:number[] = [];

	let chart;

	function generateData(){
		data1 = []
		data2 = []
		labels = []
		let x, loss1, loss2, win2
		let win1 = wager*studull1
		for(let i = 0; i < 2*wager; i += 0.5){
			labels.push(i)
			win2 = i*studull2;
			loss1 = (wager + i) - win1
			loss2 = (wager + i) - win2
			data1.push(loss1)
			data2.push(loss2)
		}
		return {
			labels: labels,
			datasets: [{
				label: 'Tap',
				data: data1,
				fill: false,
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.1
			},
			{
				label: 'Tap',
				data: data2,
				fill: false,
				borderColor: 'rgb(192, 20, 20)',
				tension: 0.1
			}]
		}
	}

	onMount(() => {
		var ctx = document.getElementById('canvas').getContext('2d');

		chart = new Chart(ctx, 
			{
				type: 'line',
				options: {
					animation: false,
					plugins: {
						legend: {
							display: false
						},
						tooltip: {
							enabled: true
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
	})


	
</script>

<div>
	<h2>{title}</h2>
	<div>
		<canvas id='canvas' height="200" width="300"></canvas>
	</div>
</div>
