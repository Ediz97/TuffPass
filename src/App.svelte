<script>
  import { onMount } from "svelte";
  import AccountCards from "./lib/AccountCards.svelte";
  import NavigationBar from "./lib/NavigationBar.svelte";
  import { userAccounts } from "./lib/stores";

  onMount(async () => {
    userAccounts.set(await window.electronAPI.getAccounts());
  });
</script>

<main style="font-family: 'Caviar Dreams', sans-serif;">
  {#if $userAccounts.length === 0}
    <div
      class="flex justify-center items-center absolute w-full text-center"
      style="height: calc(100vh - 20px)"
    >
      <p class="select-none opacity-50">Click the + button to add accounts!</p>
    </div>
  {/if}
  <NavigationBar />
  <AccountCards />
</main>
