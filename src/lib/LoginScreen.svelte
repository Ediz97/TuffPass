<script>
  import { passwordCheck } from "./PasswordCheck.svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { onMount } from "svelte";
  import { fly, fade } from "svelte/transition";
  import { passwordCorrect } from "./stores";

  const passwordStrength = tweened(0, {
    duration: 400,
    easing: cubicOut,
  });

  let applicationStarted = false;
  let masterPassword = "";
  let masterPasswordConfirmation = "";

  function submitMasterPassword() {
    if (masterPassword === masterPasswordConfirmation) {
        passwordCorrect.set(true);
    }
  }

  onMount(() => {
    applicationStarted = true;
  });
</script>

{#if applicationStarted}
<div class="hero min-h-screen absolute overflow-hidden">
  <div class="hero-content text-center">
    <div class="max-w-md" in:fly="{{ y: 50, duration: 700}}" out:fade="{{ duration: 300 }}">
      <h1 class="text-5xl font-bold">Welcome!</h1>
      <p class="py-6">
        Please choose your master password. Make sure it's secure and remember it
        well, since there's no way of resetting it. If you wish to use this
        application without a master password, you can do so by leaving the
        password fields empty.
      </p>

      <!-- Password Fields -->
      <label class="label mt-2" for="password">
        <span class="label-text ml-1">Password</span>
      </label>
      <input
        type="text"
        placeholder="Enter password"
        bind:value={masterPassword}
        on:input={() => passwordStrength.set(passwordCheck(masterPassword)[0])}
        class="input input-bordered w-full"
      />

      <label class="label mt-2" for="passwordConfirmation">
        <span class="label-text ml-1">Confirm password</span>
      </label>
      <input
        type="text"
        placeholder="Confirm password"
        bind:value={masterPasswordConfirmation}
        on:input={() => passwordStrength.set(passwordCheck(masterPassword)[0])}
        class="input input-bordered w-full"
      />

      <!-- Password Strength Meter -->
      <progress
        class="progress progress-primary w-full mt-3 px-1"
        value={$passwordStrength}
      />
      <p class="text-xs">{@html passwordCheck(masterPassword)[1]}</p>

      <button class="btn btn-success mt-10" on:click={submitMasterPassword}>Confirm</button>
    </div>
  </div>
</div>
{/if}