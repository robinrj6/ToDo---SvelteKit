<script lang="ts">
  import { Select } from "flowbite-svelte";
  import Todo from "$lib/components/todo/+page.svelte";
  import Timer from "$lib/components/timer/+page.svelte";
  let { data } = $props();
  let activeTab = $state("todo");

  const tabs = [
    { id: "todo", label: "ToDo" },
    { id: "timer", label: "Timer" },
    { id: "completed", label: "Completed Tasks" },
    { id: "stats", label: "Statistics" },
  ];
</script>

<div class="flex flex-col h-full items-center" style="height: 80vh;">
  <h1 class="text-3xl">
    Hi <span class="font-bold text-red-600 capitalize">{data.user.username}!</span> <br />
  </h1>

  <!-- Tab selector -->
  <div class="mt-6 w-auto">
    <Select bind:value={activeTab} class="w-full">
      {#each tabs as tab}
        <option value={tab.id}>{tab.label}</option>
      {/each}
    </Select>
  </div>

  <!-- Dynamic Content Section -->
  <div class="mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
    <h2 class="text-xl font-semibold mb-4">
      {tabs.find((t) => t.id === activeTab)?.label}
    </h2>
    <div class="text-gray-700 dark:text-gray-300">
      {#if activeTab === "todo"}
        <Todo />
      {:else if activeTab === "timer"}
        <Timer />
      {:else if activeTab === "completed"}
        Completed Tasks content goes here.
      {:else if activeTab === "stats"}
        Statistics content goes here.
      {/if}
    </div>
  </div>
</div>
