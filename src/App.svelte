<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import AccountCards from "./lib/AccountCards.svelte";
  import NavigationBar from "./lib/NavigationBar.svelte";
  import { userAccounts, passwordCorrect } from "./lib/stores";
  import LoginScreen from "./lib/LoginScreen.svelte";

  onMount(async () => {
    document.documentElement.dataset.theme = localStorage.getItem("theme");
  });
</script>

<main style="font-family: 'Caviar Dreams', sans-serif;">
  {#if !$passwordCorrect}
    <LoginScreen />
  {:else}
    {#if $userAccounts.length === 0}
      <div
        transition:fade
        class="flex justify-center items-center absolute w-full text-center"
        style="height: calc(100vh - 20px)"
      >
        <p class="select-none opacity-50">
          Click the + button to add accounts!
        </p>
      </div>
    {/if}
    <div transition:fade>
      <NavigationBar />
      <AccountCards />
    </div>
  {/if}
</main>
