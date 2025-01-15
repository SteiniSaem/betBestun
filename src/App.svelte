<script lang="ts">
	import Chart from "./lib/Chart.svelte";
	let studull1 = 1.95
	let studull2 = 1.92
	let wager1 = 25
	let wager2 = 25
	let winnings1, winnings2
	let loss1, loss2
   
	$:winnings1 = Math.round((wager1 * studull1)*100)/100;
	$:winnings2 = Math.round((wager2 * studull2)*100)/100;
	$:loss1 = Math.round(((wager1 + wager2) - winnings1)*100)/100
	$:loss2 = Math.round(((wager1 + wager2) - winnings2)*100)/100

</script>

<main class='w-full'>
	<h1 class="">Bet Bestun</h1>
	<div class='flex justify-center mt-12'>
	<table>
		<tbody>
			<tr>
				<td></td>
				<td>Epic Stuðull</td>
				<td>Cool Stuðull</td>
			</tr>
			<tr>
				<td></td>
				<td>      
					<input type="number" class='w-32 text-center' step="0.01" bind:value={studull1}>
				</td>
				<td>
					<input type="number" class='w-32 text-center' step="0.01" bind:value={studull2}>
				</td>
				<td>
					Samtals Upphæð
				</td>
			</tr>
			<tr class='border-b border-white'>
				<td>Upphæð</td>
				<td>
					<input type="number" class='w-32 text-center' step="1" bind:value={wager1}>
				</td>
				<td>
					<input type="number" class='w-32 text-center' step="1" bind:value={wager2}>
				</td>
				<td>{wager1 + wager2}</td>
			</tr>
			<tr>
				<td>Vinningur</td>
				<td>{winnings1}</td>
				<td>{winnings2}</td>
			</tr>
			<tr>
				<td>Tap</td>
				<td>{loss1}</td>
				<td>{loss2}</td>
			</tr>
		</tbody>
	</table>
	</div>
	<Chart title={`Epicbet wager með Coobet wager = ${wager2}`} bind:studull1 bind:studull2 bind:wager={wager1}/>
</main>

<style>
	td{
		padding: 0.5rem 1rem;
	}

</style>
