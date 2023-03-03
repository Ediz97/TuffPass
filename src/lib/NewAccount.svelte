<script>
  import { onMount } from "svelte";
  import { userAccounts, createNewAccount } from "./stores";

  onMount(async () => {
    userAccounts.set(await window.electronAPI.getAccounts());
  });

  export let accountIndex;

  export let accountInfo = {
    cardName: "",
    accountID: "",
    password: "",
    iconPath: "",
  };

  function saveAccount() {
    console.log($createNewAccount);
    if ($createNewAccount) {
      userAccounts.update((otherUserAccounts) => [
        ...otherUserAccounts,
        {
          cardName: accountInfo.cardName,
          accountID: accountInfo.accountID,
          password: accountInfo.password,
          iconPath: accountInfo.iconPath,
          visible: true,
        },
      ]);
    } else {
      console.log("splice");
      $userAccounts.splice(accountIndex, 1, {
        cardName: accountInfo.cardName,
        accountID: accountInfo.accountID,
        password: accountInfo.password,
        iconPath: accountInfo.iconPath,
        visible: true,
      });
    }
    window.electronAPI.updateAccounts($userAccounts);
    $userAccounts = $userAccounts;
  }

  function removeAccount() {
    $userAccounts.splice(accountIndex, 1);
    $userAccounts = $userAccounts;
    window.electronAPI.updateAccounts($userAccounts);
  }

  function resetModal() {
    createNewAccount.set(true);
    accountInfo = {
      cardName: "",
      accountID: "",
      password: "",
      iconPath: "",
    };
  }
</script>

<!-- The New Account Button -->
<div
  class="tooltip tooltip-left sm:tooltip-top fixed right-[5vw] bottom-[5vh]"
  data-tip="New Account"
>
  <label
    for="create-account"
    on:click={resetModal}
    class="btn btn-circle btn-info shadow-xl"
  >
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

<!-- Modal for creating new account -->
<input type="checkbox" id="create-account" class="modal-toggle" />
<div class="modal">
  <div class="modal-box">
    <div class="form-control w-full">
      <label class="label" for="card-name">
        <span class="label-text font-bold">Card name:</span>
      </label>
      <input
        type="text"
        placeholder="Enter name"
        bind:value={accountInfo.cardName}
        class="input input-bordered w-full"
      />

      <label class="label mt-10" for="account-ID">
        <span class="label-text">Account ID:</span>
      </label>
      <input
        type="text"
        placeholder="Enter account ID"
        bind:value={accountInfo.accountID}
        class="input input-bordered w-full"
      />

      <label class="label" for="password">
        <span class="label-text">Password:</span>
      </label>
      <input
        type="text"
        placeholder="Enter password"
        bind:value={accountInfo.password}
        class="input input-bordered w-full"
      />
      <!-- accountInfo.password Strength Meters -->
      {#if accountInfo.password.length === 0}
        <progress class="progress w-full mt-3" value="0" max="100" />
        <p class="text-xs ml-0.5"><br /></p>
      {:else if accountInfo.password.length <= 3}
        <progress
          class="progress progress-error w-full mt-3"
          value="25"
          max="100"
        />
        <p class="text-xs text-error ml-0.5">Weak</p>
      {:else if accountInfo.password.length > 3 && accountInfo.password.length <= 6}
        <progress
          class="progress progress-warning w-full mt-3"
          value="50"
          max="100"
        />
        <p class="text-xs text-warning ml-0.5">Medium</p>
      {:else if accountInfo.password.length > 6 && accountInfo.password.length <= 9}
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

      <button
        class="btn btn-primary w-min mt-3"
        on:click={() => (accountInfo.password = "generated password")}
      >
        Generate Password
      </button>
    </div>
    <div class="modal-action">
      <label for="create-account" class="btn btn-error">Cancel</label>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <label for="create-account" on:click={saveAccount} class="btn btn-success"
        >Confirm
      </label>
    </div>
    <button
      class="btn btn-primary"
      on:click={async () =>
        (accountInfo.iconPath = await window.electronAPI.selectIcon())}
      >Icon</button
    >
  </div>
</div>

<!-- Modal for removing account -->
<input type="checkbox" id="remove-confirm" class="modal-toggle" />
<div class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Confirmation</h3>
    <p class="py-4">Are you sure you want to remove this account?</p>
    <div class="modal-action">
      <label for="remove-confirm" class="btn btn-outline">Cancel</label>
      <label for="remove-confirm" class="btn btn-error" on:click={removeAccount}
        >Remove</label
      >
    </div>
  </div>
</div>
