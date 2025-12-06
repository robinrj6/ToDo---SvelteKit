<script lang="ts">
  import "./+layout.css";
  import favicon from "$lib/assets/favicon.svg";
  let { children, data } = $props();

  import { page } from "$app/state";
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Dropdown,
    DropdownItem,
  } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import { DarkMode } from "flowbite-svelte";

  let activeUrl = $derived(page.url.pathname);
  let user = $derived(data.user);
  
  // Shared state for selected tool
  let selectedTab = $state(page.url.searchParams.get('tab') || 'todo');
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Navbar class="text-5xl">
  <NavBrand href="/">
    <img
      src="https://flowbite-svelte.com/images/flowbite-svelte-icon-logo.svg"
      class="me-3 h-6 sm:h-9"
      alt="Flowbite Logo"
    />
    <span
      class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
      >Utilities</span
    >
  </NavBrand>
  <DarkMode class="ml-auto" />
  <NavHamburger />
  <NavUl activeClass="text-red-500 !text-red-500" {activeUrl}>  
    <NavLi href="/dashboard">Dashboard</NavLi>
    <!-- <NavLi class="cursor-pointer">
      Tools<ChevronDownOutline class="text-primary-800 inline h-6 w-6 dark:text-white" />
    </NavLi> -->
    <!-- <Dropdown simple class="w-44">
      <DropdownItem onclick={() => (selectedTab = "todo")} href="/dashboard">ToDo</DropdownItem>
      <DropdownItem onclick={() => (selectedTab = "timer")} href="/dashboard">Timer</DropdownItem>
      <DropdownItem onclick={() => (selectedTab = "notes")}>Notes</DropdownItem>
      <DropdownItem onclick={() => (selectedTab = "earnings")}>Earnings</DropdownItem>
    </Dropdown> -->
    {#if user}
      <NavLi>
        <form action="/logout?/logout" method="POST" class="inline">
          <button type="submit" class="text-heading hover:text-fg-brand">Logout</button>
        </form>
      </NavLi>
    {:else}
      <NavLi href="/login">Login</NavLi>
    {/if}
  </NavUl>
</Navbar>
{@render children()}
