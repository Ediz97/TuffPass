<script>
    import { userAccounts } from "./stores";

    let searchPrompt = "";

    function filterCards() {
        for (let i = 0; i < $userAccounts.length; i++) {
            if (
                !$userAccounts[i].cardName
                    .toLowerCase()
                    .includes(searchPrompt.toLowerCase())
            ) {
                $userAccounts[i].visible = false;
            } else {
                $userAccounts[i].visible = true;
            }
        }
    }
</script>

<div class="mx-4 mb-5 text-neutral-content">
    <div
        class="navbar bg-primary shadow-xl rounded-xl px-5"
    >
        <h1 class="normal-case text-xl select-none pr-5 font-bold">TuffPass</h1>
        <div class="ml-auto max-w-sm w-full">
            <div class="input-group pr-5">
                <input
                    type="text"
                    placeholder="Search…"
                    class="input input-ghost input-bordered border-2 w-full"
                    bind:value={searchPrompt}
                    on:input={filterCards}
                />
                <button
                    class="btn btn-error bg-transparent border-2 border-opacity-30"
                    on:click={() => {
                        searchPrompt = "";
                        filterCards();
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 opacity-70"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        /></svg
                    >
                </button>
            </div>
            <button class="btn btn-ghost btn-circle btn-sm">
                <img src="https://img.icons8.com/external-justicon-lineal-color-justicon/64/null/external-color-palette-graphic-design-justicon-lineal-color-justicon.png" alt="Themes"/>
            </button>
        </div>
    </div>
</div>
