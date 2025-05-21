<script>
  import { fonts } from "$lib/data";
  import Drawer from "$lib/components/drawer";
  import Slider from "$lib/components/slider.svelte";
  import Field from "$lib/components/input-field.svelte";
  import ColorPicker from "$lib/components/color-picker.svelte";
  import FontSelector from "$lib/components/font-selector.svelte";
  import VerticalAlign from "$lib/components/vertical-align.svelte";
  import TextAlignToggle from "$lib/components/text-align-toggle.svelte";
  import clickOutside from "$lib/hooks/use-clickoutside";

  let current = $state({});
</script>

<main class="w-full h-screen flex fixed top-0 left-0">
  <Drawer bind:current class="w-[75px]" />
  {#if current.id}
    <article
      use:clickOutside={() => (current = {})}
      class="w-full h-full bg-white max-w-sm p-4 pt-0 pb-16 border shadow-xl border-gray-200 flex flex-col gap-4 overflow-y-auto">
      <div
        class="flex flex-col gap-0 border-b pt-6 border-gray-100 pb-4 sticky top-0 bg-white">
        <h1 class="text-md font-medium">{current.label}</h1>
        <p class="text-sm font-light">{current.description}</p>
      </div>
      <div class="flex-1">
        {#if current.id === "text"}
          {@render textEditor()}
        {:else if current.id === "shapes"}
          {@render shapeEditor()}
        {:else if current.id === "media"}
          {@render mediaEditor()}
        {:else if current.id === "overlays"}
          {@render overlayEditor()}
        {:else if current.id === "mask"}
          {@render maskEditor()}
        {:else if current.id === "ai"}
          {@render aiEditor()}
        {/if}
      </div>
    </article>
  {/if}
</main>

<!-- <FontSelector />
    <Field />

    <div class="flex gap-4">
      <TextAlignToggle />
      <VerticalAlign />
    </div>
    <Slider label="Slider" />
    <ColorPicker label="Color" /> -->

{#snippet textEditor()}
  <div>
    <ul class="flex flex-col gap-2">
      <li>
        <button
          class="font-light p-2 text-2xl rounded-lg bg-muted w-full cursor-pointer hover:bg-muted-foreground/20 transition-all duration-100 active:scale-95">
          Heading
        </button>
      </li>
      <li>
        <button
          class="text-lg font-light p-2 rounded-lg bg-muted w-full cursor-pointer hover:bg-muted-foreground/20 transition-all duration-100 active:scale-95">
          Subtitle
        </button>
      </li>
      <li>
        <button
          class="text-sm font-medium p-2 rounded-lg bg-muted w-full cursor-pointer hover:bg-muted-foreground/20 transition-all duration-100 active:scale-95">
          Paragraph
        </button>
      </li>
    </ul>

    <hr class="my-8 opacity-50" />

    <ul class="grid grid-cols-2 gap-1 items-stretch">
      {#each fonts as font}
        <li>
          <button
            class="font-light p-4 py-8 text-base h-full rounded-lg bg-muted w-full cursor-pointer hover:bg-muted-foreground/20 transition-all duration-100 active:scale-95">
            {font}
          </button>
        </li>
      {/each}
    </ul>
  </div>
{/snippet}

{#snippet shapeEditor()}{/snippet}

{#snippet mediaEditor()}
  <div>
    <h1>Media Editor</h1>
  </div>
{/snippet}

{#snippet overlayEditor()}
  <div>
    <h1>Overlay Editor</h1>
  </div>
{/snippet}

{#snippet maskEditor()}
  <div>
    <h1>Mask Editor</h1>
  </div>
{/snippet}

{#snippet aiEditor()}
  <div>
    <h1>AI Editor</h1>
  </div>
{/snippet}
