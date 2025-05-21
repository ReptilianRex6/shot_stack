<script>
  import Button from "$lib/components/ui/button.svelte";

  import * as Icon from "lucide-svelte";

  let align = $state("left");

  const toggleAlign = (value) => () => {
    align = value;
  };
</script>

<div class="flex w-full">
  <Button
    onclick={toggleAlign("left")}
    class="rounded-none shadow-none  text-muted-foreground w-full first:rounded-s-md last:rounded-e-md focus-visible:z-10 {align ===
    'left'
      ? '!bg-foreground/10'
      : ''}"
    variant="outline"
    size="icon"
    aria-label="Align Left">
    <Icon.AlignLeft size={16} aria-hidden="true" />
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
    <Icon.AlignCenter size={16} aria-hidden="true" />
  </Button>
  <Button
    onclick={toggleAlign("right")}
    class="rounded-none w-full shadow-none text-muted-foreground first:rounded-s-md last:rounded-e-md focus-visible:z-10 {align ===
    'right'
      ? 'bg-foreground/10'
      : ''}"
    variant="outline"
    size="icon"
    aria-label="Align Right">
    <Icon.AlignRight size={16} aria-hidden="true" />
  </Button>
</div>
