<script lang="ts">
  import { Progressradial } from "flowbite-svelte";
</script>

<div class="flex h-full justify-center">
  <Progressradial
    color="red"
    progress="65"
    labelInside
    size="w-40 h-40"
    classes={{ outside: "dark:text-white" }}
  />
</div>
