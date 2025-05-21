<script>
  import Input from "$lib/components/ui/input.svelte";
  import Label from "$lib/components/ui/label.svelte";

  import * as Icon from "lucide-svelte";

  const uid = $props.id();
  const { unit = "", iconName = "AlarmSmoke" } = $props();

  let LeftIcon = $derived(Icon[iconName]);
</script>

<div class="space-y-2 w-full">
  <Label for={uid}>Input with end icon</Label>
  <div class="relative">
    <div
      class="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground peer-disabled:opacity-50">
      <LeftIcon size={16} class="stroke-[1.8]" />
    </div>
    <Input
      id={uid}
      class="peer ps-9 {unit ? 'pe-9' : 'pe-3'}"
      placeholder="Email"
      type="number" />

    {#if unit}
      <div
        class="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
        <small
          class="p-1 bg-foreground/10 rounded flex items-center justify-center leading-none pb-1.5"
          >{unit}</small>
      </div>
    {/if}
  </div>
</div>
