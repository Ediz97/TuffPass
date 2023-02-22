<script>
    import {accounts} from './stores';
</script>

{#each $accounts as account}
<div class="card w-96 bg-base-100 shadow-xl">
    <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">
        {account.cardName}
        <div class="badge badge-secondary">NEW</div>
      </h2>
      <p>{account.accountID}</p>
      <div class="card-actions justify-end">
        <div class="badge badge-outline">Fashion</div> 
        <div class="badge badge-outline">Products</div>
      </div>
    </div>
  </div>
{/each}