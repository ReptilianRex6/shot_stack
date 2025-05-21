<script lang="ts">
  import { fonts } from "$lib/data";
  import Label from "$lib/components/ui/label.svelte";
  import * as Select from "$lib/components/ui/select";

  import * as Icon from "lucide-svelte";

  let value = $state("Roboto");
  const uid = $props.id();
</script>

<div class="space-y-2 w-full">
  <Label for={uid}>Select a font</Label>

  <Select.Root type="single" bind:value>
    <Select.Trigger id={uid}>
      <div class="flex items-center gap-2">
        <Icon.TypeOutline
          class="text-muted-foreground stroke-[1.8]"
          size={16}
          aria-hidden="true" />
        {value ?? "Select a font"}
      </div>
    </Select.Trigger>
    <Select.Content>
      {#each fonts as font (font)}
        <Select.Item value={font}>
          {font}
        </Select.Item>
      {/each}
    </Select.Content>
  </Select.Root>
</div>
