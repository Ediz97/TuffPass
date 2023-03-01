<script>
    import { accounts } from "./stores";

    let searchPrompt = '';

    function filterCards() {
        for (let i = 0; i < $accounts.length; i++) {
            if (!$accounts[i].cardName.toLowerCase().includes(searchPrompt.toLowerCase())) {
                $accounts[i].visible = false;
            }
            else {
                $accounts[i].visible = true;
            }
        }
    }
</script>

<div class="flex justify-center mb-5 px-2">
    <input type="text" placeholder="Type to search" class="input input-ghost border-primary border-2 w-full max-w-lg"
    bind:value={searchPrompt}
    on:input={filterCards} />
</div>