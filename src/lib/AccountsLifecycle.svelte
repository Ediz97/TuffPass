<script>
  import { userAccounts, createNewAccount } from "./stores";
  import { passwordCheck, generatePassword } from "./PasswordCheck.svelte"
  import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";

  const passwordStrength = tweened(0, {
    duration: 400,
    easing: cubicOut
  });

  export let accountIndex;

  export let accountInfo = {
    cardName: "",
    accountID: "",
    password: "",
    iconPath: "",
    favorite: false
  };

  function saveAccount() {
    if ($createNewAccount) {
      userAccounts.update((otherUserAccounts) => [
        ...otherUserAccounts,
        {
          cardName: accountInfo.cardName,
          accountID: accountInfo.accountID,
          password: accountInfo.password,
          iconPath: accountInfo.iconPath,
          favorite: accountInfo.favorite,
          visible: true,
        },
      ]);
    } else {
      $userAccounts.splice(accountIndex, 1, {
        cardName: accountInfo.cardName,
        accountID: accountInfo.accountID,
        password: accountInfo.password,
        iconPath: accountInfo.iconPath,
        favorite: accountInfo.favorite,
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
      iconPath: "Icon",
      favorite: false
    };
  }
</script>

<!-- The New Account Button -->
<div
  class="tooltip tooltip-left tooltip-primary sm:tooltip-top fixed right-[5vh] bottom-[5vh]"
  data-tip="New Account"
>
  <label
    for="create-account"
    on:click={resetModal}
    class="btn btn-circle btn-primary shadow-xl"
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
        <span class="label-text">Title</span>
      </label>
      <label class="input-group flex">
        <input
          type="text"
          placeholder="Enter card name"
          bind:value={accountInfo.cardName}
          class="input input-bordered w-full"
        />
        <button
          class="btn btn-primary items-center justify-center w-24"
          on:click={async () =>
            (accountInfo.iconPath = await window.electronAPI.selectIcon())}
          ><img
            src={accountInfo.iconPath}
            alt={accountInfo.iconPath}
            style="max-height: 44px;"
          /></button
        >
      </label>

      <label class="label mt-5" for="account-ID">
        <span class="label-text">Account ID</span>
      </label>
      <input
        type="text"
        placeholder="Enter account ID"
        bind:value={accountInfo.accountID}
        class="input input-bordered"
      />

      <label class="label mt-5" for="password">
        <span class="label-text">Password</span>
      </label>
      <label class="input-group">
        <input
          type="text"
          placeholder="Enter password"
          bind:value={accountInfo.password}
          on:input={() => passwordStrength.set(passwordCheck(accountInfo.password)[0])}
          class="input input-bordered w-full"
        />
        <button
          class="btn btn-primary w-24"
          on:click={() => {
            accountInfo.password = generatePassword();
            passwordStrength.set(passwordCheck(accountInfo.password)[0]);
          }}
          >Generate</button
        >
      </label>

      <!-- Password Strength Meter -->
      <progress class="progress progress-primary w-full mt-3 px-1" value={$passwordStrength} />
        <p class="text-xs ml-0.5 px-1 pt-1">{@html passwordCheck(accountInfo.password)[1]}</p>
      
    </div>
    <div class="modal-action">
      <label for="create-account" class="btn btn-error">Cancel</label>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <label for="create-account" on:click={saveAccount} class="btn btn-success"
        >Confirm
      </label>
    </div>
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
