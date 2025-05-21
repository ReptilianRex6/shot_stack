<script>
  import Button from "$lib/components/ui/button.svelte";

  import * as Icon from "lucide-svelte";

  let align = $state("top");

  const toggleAlign = (value) => () => {
    align = value;
  };
</script>

<div class="flex w-full">
  <Button
    onclick={toggleAlign("top")}
    class="rounded-none shadow-none  text-muted-foreground w-full first:rounded-s-md last:rounded-e-md focus-visible:z-10 {align ===
    'top'
      ? '!bg-foreground/10'
      : ''}"
    variant="outline"
    size="icon"
    aria-label="Align Left">
    <Icon.AlignEndHorizontal size={16} aria-hidden="true" />
  </Button>

  <Button
    onclick={toggleAlign("center")}
    class="rounded-none w-full shadow-none  border-r-0 border-l-0 text-muted-foreground first:rounded-s-md last:rounded-e-md focus-visible:z-10 {align ===
    'center'
      ? '!bg-foreground/10'
      : ''}"
    variant="outline"
    size="icon"
    aria-label="Align Center">
    <Icon.AlignCenterHorizontal size={16} aria-hidden="true" />
  </Button>
  <Button
    onclick={toggleAlign("right")}
    class="rounded-none w-full shadow-none text-muted-foreground first:rounded-s-md last:rounded-e-md focus-visible:z-10 {align ===
    'bottom'
      ? 'bg-foreground/10'
      : ''}"
    variant="outline"
    size="icon"
    aria-label="Align Right">
    <Icon.AlignEndHorizontal size={16} aria-hidden="true" />
  </Button>
</div>
