<script>
  import * as Icon from "lucide-svelte";
  import Input from "$lib/components/ui/input.svelte";
  import Label from "$lib/components/ui/label.svelte";
  import Slider from "$lib/components/ui/slider.svelte";

  let { label = "", value = $bindable(0), iconName = "PaintBucket" } = $props();

  let LeftIcon = $derived(Icon[iconName]);
</script>

<div class="space-y-2 w-full">
  {#if label}
    <Label>{label}</Label>
  {/if}

  <div
    class="flex items-center border gap-2 rounded-lg overflow-hidden p-2 px-3 h-9">
    <LeftIcon
      class="stroke-[1.8] text-muted-foreground"
      size={20}
      aria-hidden="true" />
    <div
      class="w-full overflow-hidden rounded-md h-4 border flex items-center justify-center">
      <Input
        bind:value
        type="color"
        class="border-none p-0 h-6 m-0 min-w-[110%]"
        aria-label={label} />
    </div>
  </div>
</div>
