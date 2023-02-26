<script>
  import {accounts} from './stores';

  let newAccountInfo = {
    cardName: "",
    accountID: "",
    password: "",
    iconPath: ""
  }

  function saveAccount() {
    accounts.update((otherAccounts) => [...otherAccounts, {cardName: newAccountInfo.cardName, accountID: newAccountInfo.accountID, password: newAccountInfo.password, visible: true, iconPath: newAccountInfo.iconPath}]);
  }
  
  function resetModal() {
    newAccountInfo = {
      cardName: "",
      accountID: "",
      password: "",
      iconPath: ""
    }
  }
</script>

<!-- The New Account Button -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={resetModal}
  class="tooltip tooltip-left sm:tooltip-top fixed right-[5vw] bottom-[5vh]"
  data-tip="New Account"
>
  <label for="new-account" class="btn btn-circle btn-success">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2.5"
      stroke="currentColor"
      class="w-7 h-7"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  </label>
</div>

<input type="checkbox" id="new-account" class="modal-toggle" />
<div class="modal">
  <div class="modal-box">
    <div class="form-control w-full">
      
      <!-- svelte-ignore a11y-label-has-associated-control --> <!-- Name field -->
      <label class="label">
        <span class="label-text font-bold">Card name:</span>
      </label>
      <input
        type="text"
        placeholder="Enter name"
        bind:value={newAccountInfo.cardName}
        class="input input-bordered w-full"
      />

      <!-- svelte-ignore a11y-label-has-associated-control --> <!-- Account ID field -->
      <label class="label mt-10">
        <span class="label-text">Account ID:</span>
      </label>
      <input
        type="text"
        placeholder="Enter account ID"
        bind:value={newAccountInfo.accountID}
        class="input input-bordered w-full"
      />

      <!-- svelte-ignore a11y-label-has-associated-control --> <!-- newAccountInfo.password field -->
      <label class="label">
        <span class="label-text">Password:</span>
      </label>
      <input
        type="text"
        placeholder="Enter password"
        bind:value={newAccountInfo.password}
        class="input input-bordered w-full"
      />

      {#if newAccountInfo.password.length === 0} <!-- newAccountInfo.password Strength Meters -->
        <progress class="progress w-full mt-3" value="0" max="100" />
        <p class="text-xs ml-0.5"><br /></p>
      {:else if newAccountInfo.password.length <= 3}
        <progress
          class="progress progress-error w-full mt-3"
          value="25"
          max="100"
        />
        <p class="text-xs text-error ml-0.5">Weak</p>
      {:else if newAccountInfo.password.length > 3 && newAccountInfo.password.length <= 6}
        <progress
          class="progress progress-warning w-full mt-3"
          value="50"
          max="100"
        />
        <p class="text-xs text-warning ml-0.5">Medium</p>
      {:else if newAccountInfo.password.length > 6 && newAccountInfo.password.length <= 9}
        <progress
          class="progress progress-info w-full mt-3"
          value="75"
          max="100"
        />
        <p class="text-xs text-info ml-0.5">Strong</p>
      {:else}
        <progress
          class="progress progress-success w-full mt-3"
          value="100"
          max="100"
        />
        <p class="text-xs text-success ml-0.5">Very Strong</p>
      {/if}

      <button class="btn btn-primary w-min mt-3" on:click={() => newAccountInfo.password = 'generated password'}> Generate Password </button>
    </div>
      <div class="modal-action">
        <label for="new-account" class="btn btn-error">Cancel</label>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <label for="new-account" on:click={saveAccount} class="btn btn-success">Confirm</label>
      </div>
      <button class="btn btn-primary" on:click={async () => newAccountInfo.iconPath = await window.electronAPI.selectIcon()}>ICON</button>
  </div>
</div>