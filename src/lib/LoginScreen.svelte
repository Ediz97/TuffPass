<script>
  import { passwordCheck } from "./PasswordCheck.svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import { passwordCorrect, userAccounts, AESKey } from "./stores";

  // svelte animation
  const passwordStrength = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });

  let firstRun = true;
  let applicationStarted = false;
  let newPassword = "";
  let newPasswordConfirmation = "";
  let masterPassword = "";
  let notification = " ";
  let passwordLock = false;
  let amountPasswordWasIncorrect = 0;
  let passwordUnlockCounter = 10;
  let passwordLockInterval;

  $: if (amountPasswordWasIncorrect === 3) {
    lockInput();
  }

  $: if (passwordUnlockCounter === 0) {
    unlockInput();
  }

  function lockInput() {
    passwordLock = true;
    notification = `Password incorrect too many times. Please wait ${passwordUnlockCounter} seconds before trying again.`;
    passwordLockInterval = setInterval(() => {
      passwordUnlockCounter--;
      notification = `Password incorrect too many times. Please wait ${passwordUnlockCounter} seconds before trying again.`;
    }, 1000);
  }

  function unlockInput() {
    clearInterval(passwordLockInterval);
    notification = "";
    passwordLock = false;
    amountPasswordWasIncorrect = 0;
    passwordUnlockCounter = 10;
  }

  function submit(event) {
    event.key === "Enter" ? masterPasswordCheck() : null;
  }

  async function masterPasswordCheck() {
    if (!passwordLock) {
      userAccounts.set(await window.electronAPI.getAccounts(masterPassword));
      for (let accountsStore of $userAccounts) {
        if (
          accountsStore.masterPassword ===
          (await window.electronAPI.hash(masterPassword))
        ) {
          AESKey.set(masterPassword);
          passwordCorrect.set(true);
          break;
        } else {
          notification = "The password is incorrect.";
          amountPasswordWasIncorrect++;
        }
      }
    }
  }

  async function createMasterPassword() {
    if (newPassword === newPasswordConfirmation) {
      await window.electronAPI.createFile(newPassword);
      AESKey.set(newPassword); // necessary to encrypt and decrypt account passwords
      userAccounts.set(await window.electronAPI.getAccounts(newPassword));
      passwordCorrect.set(true);
    } else {
      notification = "The passwords do not match.";
    }
  }

  onMount(async () => {
    applicationStarted = true; // set to true on startup, in order for the flying animation to work
    firstRun = (await window.electronAPI.firstRun()) === null ? true : false;
    masterPassword.focus();
  });
</script>

<!-- Loading the component immediately on startup, in order for the animation to work -->
{#if applicationStarted}
  <div class="hero min-h-screen absolute">
    <div class="hero-content text-center">
      <div
        class="max-w-md"
        in:fly={{ y: 50, duration: 700 }}
        out:fade={{ duration: 300 }}
      >
        {#if firstRun}
          <h1 class="text-5xl font-bold">Welcome!</h1>
          <p class="py-6">
            Please choose your master password. Make sure it's secure and
            remember it well, since there's no way of resetting it. If you wish
            to use this application without a master password, you can do so by
            leaving the password fields empty.
          </p>

          <!-- Password Fields -->
          <label class="label mt-2" for="password">
            <span class="label-text ml-1">Password</span>
          </label>
          <input
            type="text"
            autofocus
            placeholder="Enter password"
            bind:value={newPassword}
            on:input={() => passwordStrength.set(passwordCheck(newPassword)[0])}
            class="input input-bordered w-full"
          />

          <label class="label mt-2" for="passwordConfirmation">
            <span class="label-text ml-1">Confirm password</span>
          </label>
          <input
            type="text"
            placeholder="Confirm password"
            bind:value={newPasswordConfirmation}
            class="input input-bordered w-full"
          />

          <!-- Password Strength Meter -->
          <progress
            class="progress progress-primary w-full mt-3 px-1"
            value={$passwordStrength}
          />
          <p class="text-xs">{@html passwordCheck(newPassword)[1]}</p>

          <button class="btn btn-success mt-10" on:click={createMasterPassword}
            >Confirm</button
          >
        {:else}
          <div>
            <h1 class="text-5xl font-bold">Welcome back!</h1>
            <p class="py-6">Please enter your master password.</p>

            <!-- Password Fields -->
            <label class="label mt-2" for="password">
              <span class="label-text ml-1">Password</span>
            </label>
            <input
              type="text"
              autofocus
              placeholder="Enter password"
              bind:value={masterPassword}
              class="input input-bordered w-full"
              on:keydown={submit}
            />

            <button class="btn btn-success mt-10" on:click={masterPasswordCheck}
              >Confirm</button
            >

            <p class="absolute pt-5 left-0 right-0 mx-auto text-error">
              {notification}
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
