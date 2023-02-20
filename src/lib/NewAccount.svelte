<script>
    let password = "";
</script>

<!-- The New Account Button -->
<div class="tooltip tooltip-left sm:tooltip-top fixed right-[5vw] bottom-[5vh]" data-tip="New Account">
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

<!-- The modal that opens when pressing the New Account button -->
<input type="checkbox" id="new-account" class="modal-toggle" />
<label for="new-account" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <div class="form-control w-full max-w-xs">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label">
        <span class="label-text">User ID:</span>
      </label>
      <input type="text" placeholder="Type here" class="input input-bordered w-full" />
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label class="label">
        <span class="label-text">Password:</span>
      </label>
      <input type="text" placeholder="Type here" class="input input-bordered w-full" bind:value={password} />
      <button class="btn btn-primary w-min mt-3">Generate Password</button>
      {#if password.length === 0}
        <progress class="progress w-full mt-3" value="0" max="100"></progress>
        <p class="text-xs ml-0.5"><br></p>
      {:else if password.length <= 3}
        <progress class="progress progress-error w-full mt-3" value="25" max="100"></progress>
        <p class="text-xs text-error ml-0.5">Weak</p>
      {:else if password.length > 3 && password.length <= 6}
        <progress class="progress progress-warning w-full mt-3" value="50" max="100"></progress>
        <p class="text-xs text-warning ml-0.5">Medium</p>
      {:else if password.length > 6 && password.length <= 9}
        <progress class="progress progress-info w-full mt-3" value="75" max="100"></progress>
        <p class="text-xs text-info ml-0.5">Strong</p>
      {:else}
        <progress class="progress progress-success w-full mt-3" value="100" max="100"></progress>
        <p class="text-xs text-success ml-0.5">Very Strong</p>
      {/if}
    </div>
  </label>
</label>