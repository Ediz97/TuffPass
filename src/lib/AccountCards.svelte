<script>
  import { userAccounts, createNewAccount } from "./stores";
  import AccountsLifecycle from "./AccountsLifecycle.svelte";
  import { fade, fly } from 'svelte/transition';

  let accountIndex;
  let accountInfo;
  let animationID;
  let buttonFeedback = '';
  let userFeedback = false;

  function adoptAccountDetails() {
    createNewAccount.set(false);
    accountInfo = {
      cardName: $userAccounts.at(accountIndex).cardName,
      accountID: $userAccounts.at(accountIndex).accountID,
      password: $userAccounts.at(accountIndex).password,
      iconPath: $userAccounts.at(accountIndex).iconPath,
      favorite: $userAccounts.at(accountIndex).favorite,
    };
  }

  function toggleFavorite(index) {
    const accountToBeMoved = $userAccounts[index];
    $userAccounts[index].favorite = !$userAccounts[index].favorite;

    if ($userAccounts[index].favorite) {
      userAccounts.update((otherUserAccounts) => [
        accountToBeMoved,
        ...otherUserAccounts,
      ]);
      $userAccounts.splice(index + 1, 1);
    } else {
      for (let i = $userAccounts.length - 1; i >= 0; i--) {
        if ($userAccounts[i].favorite) {
          $userAccounts.splice(i + 1, 0, accountToBeMoved);
          $userAccounts.splice(index, 1);
          break;
        }
      }
    }
    window.electronAPI.updateAccounts($userAccounts);
  }

  function giveUserFeedback(string) {
    clearTimeout(animationID);
    buttonFeedback = string;
    userFeedback = true;
    animationID = setTimeout(() => userFeedback = false, 1200);
  }
</script>

{#if userFeedback}
<div in:fly="{{y: 20, duration: 500}}" out:fade class="alert alert-success shadow-lg absolute w-auto z-10 select-none right-3">
	<div>
	  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
	  <span>{buttonFeedback} copied!</span>
	</div>
</div>
{/if}
<div
  class="container mx-auto mb-5 gap-5 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8 5xl:grid-cols-8 6xl:grid-cols-9 7xl:grid-cols-10"
  style="column-width: 400px;"
>
  {#each $userAccounts as account, index}
    {#if account.visible}
      <div
        class="card card-side pl-5 shadow-xl border-primary border-2 overflow-hidden select-none"
        style="min-height: 180px; border-style: groove;"
      >
        <div
          class="h-full flex justify-center items-center"
          style="min-width: 100px; max-width: 100px;"
        >
          <img
            src={account.iconPath}
            alt={account.iconPath}
            draggable="false"
          />
        </div>
        <div class="card-body break-words">
          <div
            class="rating rating-sm absolute right-11 top-3"
            on:click={() => toggleFavorite(index)}
          >
            {#if account.favorite}
              <input type="radio" class="mask mask-star-2 bg-orange-400" />
            {:else}
              <input type="radio" class="mask mask-star-2 opacity-50" />
            {/if}
          </div>
          <div class="dropdown dropdown-end absolute right-1 top-1.5">
            <label
              tabindex="0"
              class="btn btn-circle btn-sm btn-ghost text-xl outline-none"
            >
              <svg
                class="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 512 512"
                ><path
                  d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"
                /></svg
              >
            </label>
            <ul
              tabindex="0"
              class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 outline-none border"
            >
              <li>
                <label
                  for="create-account"
                  on:click={() => {
                    accountIndex = index;
                    adoptAccountDetails();
                  }}
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
                <label
                  class="text-error"
                  on:click={() => (accountIndex = index)}
                  for="remove-confirm"
                >
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
          <h2 class="card-title font-extrabold">{account.cardName}</h2>
          <p class="break-all">{account.accountID}</p>
          <div class="card-actions justify-end">
            <button
              class="btn btn-circle btn-ghost absolute bottom-3 right-16"
              on:click={() => {navigator.clipboard.writeText(account.accountID);
                              giveUserFeedback("Account ID");}}
              ><img style="max-width: 40px;" src="https://img.icons8.com/external-those-icons-lineal-those-icons/100/000000/external-User-ID-emails-those-icons-lineal-those-icons-2.png" alt="ID"/></button
            >
            <button
                class="btn btn-circle btn-ghost absolute bottom-3 right-3"
                on:click={() => {
                  navigator.clipboard.writeText(account.password);
                  giveUserFeedback("Password");
                }}
                ><img style="max-width: 40px;" src="https://img.icons8.com/external-others-zufarizal-robiyanto/100/null/external-lock-mutuline-ui-essential-others-zufarizal-robiyanto.png" alt="Password"/></button
            >
          </div>
        </div>
      </div>
    {/if}
  {/each}
</div>

<AccountsLifecycle {accountIndex} {accountInfo} />
