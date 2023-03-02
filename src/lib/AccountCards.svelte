<script>
  import { accounts } from "./stores";

  const dropdownIcon = "&#8942;";
  const favoriteIcon = "&#9733;";

  let accountIndex;

  function removeAccount() {
    $accounts.splice(accountIndex, 1);
    $accounts = $accounts;
    window.electronAPI.updateAccounts($accounts);
  }
</script>

<div
  class="container mx-auto gap-5 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8 5xl:grid-cols-8 6xl:grid-cols-9 7xl:grid-cols-10"
  style="column-width: 400px;"
>
  {#each $accounts as account, index}
    {#if account.visible}
      <div
        class="card card-side pl-5 bg-base-300 shadow-xl border-solid border-primary border-2 border-spacing-3 overflow-hidden"
      >
        <div
          class="h-full flex justify-center items-center"
          style="min-width: 100px; max-width: 100px;"
        >
          <img src={account.iconPath} alt={account.iconPath} />
        </div>
        <div class="card-body break-words">
          <button
            class="btn btn-circle btn-sm btn-ghost absolute right-8 text-lg"
            style="top: 4px;">{@html favoriteIcon}</button
          >
          <div class="dropdown dropdown-end absolute right-1 top-1">
            <label
              tabindex="0"
              class="btn btn-circle btn-sm btn-ghost text-xl outline-none"
              >{@html dropdownIcon}</label
            >
            <ul
              tabindex="0"
              class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 outline-none"
            >
              <li>
                <label for="editAccount"
                  ><svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  Edit</label
                >
              </li>
              <li>
                <label class="text-error" on:click={() => accountIndex = index} for="removeConfirm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  Remove</label
                >
              </li>
            </ul>
          </div>
          <h2 class="card-title">{account.cardName}</h2>
          <p>{account.accountID}</p>
          <div class="card-actions justify-end">
            <button
              class="btn btn-circle btn-primary"
              on:click={() => navigator.clipboard.writeText(account.password)}
              >{@html "&#128203;"}</button
            >
          </div>
        </div>
      </div>
    {/if}
  {/each}
</div>

<input type="checkbox" id="removeConfirm" class="modal-toggle" />
<div class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Confirmation</h3>
    <p class="py-4">Are you sure you want to remove this account?</p>
    <div class="modal-action">
      <label for="removeConfirm" class="btn btn-outline">Cancel</label>
      <label for="removeConfirm" class="btn btn-error" on:click={removeAccount}>Remove</label>
    </div>
  </div>
</div>
