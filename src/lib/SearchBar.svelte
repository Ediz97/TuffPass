<script>
    import { userAccounts } from "./stores";

    let searchPrompt = '';

    function filterCards() {
        for (let i = 0; i < $userAccounts.length; i++) {
            if (!$userAccounts[i].cardName.toLowerCase().includes(searchPrompt.toLowerCase())) {
                $userAccounts[i].visible = false;
            }
            else {
                $userAccounts[i].visible = true;
            }
        }
    }
</script>

<div class="flex justify-center mb-5 px-2">
    <input type="text" placeholder="Type to search" class="input input-ghost border-primary border-2 w-full max-w-lg"
    bind:value={searchPrompt}
    on:input={filterCards} />
</div>