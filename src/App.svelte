<script lang="ts">
	import Chart from "./lib/Chart.svelte";
	let studull1 = 1.95
	let studull2 = 1.95
	let wager1 = 25
	let wager2 = 25
	let winnings1, winnings2
	let loss1, loss2
   
	$:winnings1 = Math.round((wager1 * studull1)*100)/100;
	$:winnings2 = Math.round((wager2 * studull2)*100)/100;
	$:loss1 = Math.round(((wager1 + wager2) - winnings1)*100)/100
	$:loss2 = Math.round(((wager1 + wager2) - winnings2)*100)/100

</script>

<main class='w-full flex flex-col p-10 h-full'>
	<h1 class="">Bet Bestun</h1>
	<div class='flex justify-center mt-12'>
	<table>
		<tbody>
			<tr>
				<td></td>
				<td class='font-bold'>Epic Stuðull</td>
				<td class='font-bold'>Cool Stuðull</td>
			</tr>
			<tr>
				<td></td>
				<td>      
					<input type="number" class='w-32 text-center' step="0.01" bind:value={studull1}>
				</td>
				<td>
					<input type="number" class='w-32 text-center' step="0.01" bind:value={studull2}>
				</td>
				<td class='font-bold'>Samtals Upphæð</td>
			</tr>
			<tr class='border-b border-white'>
				<td class='font-bold'>Upphæð</td>
				<td>
					<input type="number" class='w-32 text-center' step="1" bind:value={wager1}>
				</td>
				<td>
					<input type="number" class='w-32 text-center' step="1" bind:value={wager2}>
				</td>
				<td>{wager1 + wager2}</td>
			</tr>
			<tr>
				<td class='font-bold'>Vinningur</td>
				<td>{winnings1}</td>
				<td>{winnings2}</td>
			</tr>
			<tr>
				<td class='font-bold'>Tap</td>
				<td>{loss1}</td>
				<td>{loss2}</td>
			</tr>
		</tbody>
	</table>
	</div>
	<div class='flex w-full h-full mt-10'>
		<Chart title={`Epicbet wager = X,  Coolbet wager = ${wager2}`} bind:studull1 bind:studull2 bind:wager={wager2} fixedWagerSite='Coolbet' variableWagerSite='Epicbet'/>
		<Chart title={`Coolbet wager = X,  Epicbet wager = ${wager1}`} bind:studull1={studull2} bind:studull2={studull1} bind:wager={wager1} fixedWagerSite='Epicbet' variableWagerSite='Coolbet'/>
	</div>
</main>

<style>
	td{
		padding: 0.5rem 1rem;
	}

</style>
