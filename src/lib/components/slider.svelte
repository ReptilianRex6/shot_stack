<script>
  import Label from "$lib/components/ui/label.svelte";
  import Slider from "$lib/components/ui/slider.svelte";

  import * as Icon from "lucide-svelte";

  let {
    label = "",
    min = 0,
    max = 100,
    step = 1,
    isFill = true,
    value = $bindable(0),
    showValue = true,
    iconName = "Blend",
  } = $props();

  let LeftIcon = $derived(Icon[iconName]);
</script>

<div class="space-y-2 w-full">
  {#if label}
    <Label>{label}</Label>
  {/if}

  <div class="flex items-center gap-2 border rounded-lg p-2 px-3 h-9">
    <LeftIcon
      class="stroke-[1.8] {isFill
        ? 'fill-muted-foreground/20 '
        : ''} text-muted-foreground"
      size={20}
      aria-hidden="true" />
    <Slider bind:value type="single" {min} {max} {step} aria-label={label} />
  </div>

  {#if showValue}
    <p class="text-sm text-muted-foreground">{value}</p>
  {/if}
</div>
