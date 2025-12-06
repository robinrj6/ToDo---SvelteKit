<script lang="ts">
  let { data } = $props();
</script>

<div
  class="flex flex-col h-full pl-17"
  style="height: 80vh;"
>
  <h1 class="text-3xl">
    Hi <span class="font-bold">{data.user.username}!</span> <br />
  </h1>
</div>