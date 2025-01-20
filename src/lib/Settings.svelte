<script>
    import RangeSlider from 'svelte-range-slider-pips';
    import {graphMargin, epicbetLineColor, coolbetLineColor} from './store'
    import ColorPicker from 'svelte-awesome-color-picker';


</script>

<div class='flex flex-col items-start p-5 border border-slate-300 border-opacity-50 rounded-3xl'>
    <p class='text-xl font-bold mb-4'>Stillingar</p>
    <div class='flex items-center mb-2 dark'>
        <p class='mr-3'>Litur Epicbet línu:</p>
        <ColorPicker bind:rgb={$epicbetLineColor} label='' position='responsive'/>
    </div>
    <div class='flex items-center mb-2 dark'>
        <p class='mr-3'>Litur Coolbet línu:</p>
        <ColorPicker bind:rgb={$coolbetLineColor} label='' position='responsive'/>
    </div>
    <p>Mörk x-ása grafa (% frá fasta veðmáli)</p>
    <div class='flex w-full items-center justify-between'>
        <div class='w-full'>
            <RangeSlider bind:value={$graphMargin} min={5} max={400}/>
        </div>
        <p class='text-xl'>{$graphMargin}%</p>
    </div>
</div>

<style>
    :root {
        --range-slider: #e2e8f0;
        --range-handle:          #0284c7; /* non-focussed handle color */
        --range-handle-inactive: var(--range-handle);;
        --range-handle-focus:    var(--range-handle); /* focussed handle color */
        --range-handle-border:   var(--range-handle); /* handle border color */
        --range-range-inactive:  var(--range-handle-inactive); /* inactive range bar background color */
        --range-range:           var(--range-handle-focus); /* active range background color */
        --range-float-inactive:  var(--range-handle-inactive); /* inactive floating label background color */
        --range-float:           var(--range-handle-focus); /* floating label background color */
        --range-float-text:      white; /* text color on floating label */
    }
    
    .dark {
		--cp-bg-color: #334155;
		--cp-border-color: white;
		--cp-text-color: white;
		--cp-input-color: #555;
		--cp-button-hover-color: #777;
    }
</style>