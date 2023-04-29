<script>
  import { userAccounts } from "./stores";
  import ThemePicker from "./ThemePicker.svelte";

  let searchPrompt = "";

  function filterCards() {
    for (let userAccount of $userAccounts) {
      if (
        !userAccount.cardName.toLowerCase().includes(searchPrompt.toLowerCase())
      ) {
        userAccount.visible = false;
      } else {
        userAccount.visible = true;
      }
    }
    $userAccounts = $userAccounts;
  }

</script>

<div class="mx-3 py-5">
  <div class="navbar bg-primary shadow-xl px-5">
    <h1
      class="normal-case text-xl select-none pr-5 font-black text-primary-content tracking-wide"
    >
      TuffPass
    </h1>
    <div class="ml-auto max-w-sm w-full">
      <div class="input-group pr-5">
        <input
          type="text"
          placeholder="Search…"
          class="input input-ghost input-bordered border-2 w-full"
          bind:value={searchPrompt}
          on:input={filterCards}
        />
        <button
          class="btn btn-error bg-transparent border-2 border-opacity-30"
          on:click={() => {
            searchPrompt = "";
            filterCards();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            /></svg
          >
        </button>
      </div>
      <ThemePicker />
    </div>
  </div>
</div>
