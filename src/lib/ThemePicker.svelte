<script>
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }
</script>

<div class="dropdown dropdown-bottom dropdown-end flex">
  <button class="btn btn-circle btn-sm btn-ghost outline-none items-center">
    <img
      src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/null/external-color-palette-graphic-design-justicon-lineal-color-justicon.png"
      alt="Themes"
    />
  </button>
  <ul
    tabindex="0"
    class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36 outline-none max-h-96 overflow-y-auto flex-nowrap border"
  >
    {#each themes as theme}
      <li>
        <a on:click={() => setTheme(theme)}
          >{theme.charAt(0).toUpperCase() + theme.slice(1)}</a
        >
      </li>
    {/each}
  </ul>
</div>
