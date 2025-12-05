<script lang="ts">
  import "./+layout.css";
  import favicon from "$lib/assets/favicon.svg";
  let { children } = $props();

  import { page } from "$app/state";
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
    Dropdown,
    DropdownItem,
    DropdownDivider,
  } from "flowbite-svelte";
  import { ChevronDownOutline } from "flowbite-svelte-icons";
  import { DarkMode } from "flowbite-svelte";

  let activeUrl = $derived(page.url.pathname);
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
      >ToDo</span
    >
  </NavBrand>
  <DarkMode class="ml-auto" />
  <NavHamburger />
  <NavUl classes={"text-red-500 dark:text-red-500"} {activeUrl}>
    <NavLi href="/">Home</NavLi>
    <NavLi class="cursor-pointer">
      Tools<ChevronDownOutline class="text-primary-800 inline h-6 w-6 dark:text-white" />
    </NavLi>
    <Dropdown simple class="w-44">
      <DropdownItem href="/">Timer</DropdownItem>
      <DropdownItem href="/docs/components/navbar">Notes</DropdownItem>
      <DropdownItem href="/">Earnings</DropdownItem>
      <!-- <DropdownDivider />
      <DropdownItem href="/">Sign out</DropdownItem> -->
    </Dropdown>
    <NavLi href="/login">Login</NavLi>
  </NavUl>
</Navbar>
{@render children()}
