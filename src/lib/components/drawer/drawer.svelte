<script>
  import * as Icon from "lucide-svelte";
  import { onMount } from "svelte";

  const links = [
    {
      icon: "RemoveFormatting",
      label: "Text",
      id: "text",
      description: "Edit the text of the current element",
    },

    {
      icon: "Shapes",
      label: "Shapes",
      id: "shapes",
      description: "Edit the shapes of the current element",
    },

    {
      icon: "Clapperboard",
      label: "Media",
      id: "media",
      description: "Edit the media of the current element",
    },

    {
      icon: "Layers",
      label: "Overlays",
      id: "overlays",
      description: "Edit the overlays of the current element",
    },

    {
      icon: "Eclipse",
      label: "Mask",
      id: "mask",
      description: "Edit the mask of the current element",
    },

    {
      icon: "Sparkles",
      label: "AI",
      id: "ai",
      description: "Generate AI content",
    },
  ];

  let { current = $bindable(), class: className } = $props();

  const changeActive = (link) => () => {
    current = link;
  };

  onMount(() => {
    current = links[0];
  });
</script>

<nav class="bg-violet-700 text-white {className}">
  <ul class="flex flex-col gap-0">
    {#each links as link}
      {@const NavIcon = Icon[link.icon]}
      <li>
        <button
          onclick={changeActive(link)}
          class="flex items-center gap-2 border-b border-violet-400/20 w-full flex-col py-3 cursor-pointer
          {current.id == link.id ? 'bg-violet-500' : ''}">
          <NavIcon
            class="stroke-[1.5] {current.id == link.id
              ? 'fill-violet-300'
              : 'fill-none'}"
            size={18}
            aria-hidden="true" />
          <span class="text-xs font-thin">{link.label} </span>
        </button>
      </li>
    {/each}
  </ul>
</nav>
