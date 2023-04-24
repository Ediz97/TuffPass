<script>
  import { passwordCheck } from "./PasswordCheck.svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import { passwordCorrect } from "./stores";

  // svelte animation
  const passwordStrength = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });

  let applicationStarted = false;
  let masterPassword = "";
  let newPassword = "";
  let newPasswordConfirmation = "";
  let firstRun = true;

  function createMasterPassword() {
    if (newPassword === newPasswordConfirmation) {
      masterPassword = newPassword;
      passwordCorrect.set(true);
    }
  }

  function masterPasswordCheck() {
    // if (hashed master password is true) { TODO: implement hashed master password check
    passwordCorrect.set(true);
    // }
  }

  onMount(async () => {
    applicationStarted = true; // set to true on startup, in order for the flying animation to work
    firstRun = (await window.electronAPI.getAccounts()) === null ? true : false;
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
          <h1 class="text-5xl font-bold">Welcome back!</h1>
          <p class="py-6">Please enter your master password.</p>

          <!-- Password Fields -->
          <label class="label mt-2" for="password">
            <span class="label-text ml-1">Password</span>
          </label>
          <input
            type="text"
            placeholder="Enter password"
            bind:value={masterPassword}
            class="input input-bordered w-full"
          />

          <button class="btn btn-success mt-10" on:click={masterPasswordCheck}
            >Confirm</button
          >
        {/if}
      </div>
    </div>
  </div>
{/if}
