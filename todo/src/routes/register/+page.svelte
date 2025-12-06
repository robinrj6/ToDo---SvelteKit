<script lang="ts">
  import {
    Label,
    Input,
    InputAddon,
    ButtonGroup,
    Button,
    Alert
  } from "flowbite-svelte";
  import { UserCircleSolid } from "flowbite-svelte-icons";
  export let form: { success?: boolean; message?: string } | null;
</script>

<div class="flex flex-col justify-center items-center h-full" style="height: 80vh;">
  <form action="?/register" method="POST" class="w-full max-w-md">
    {#if form?.message}
      <Alert color={form.success ? 'green' : 'red'} class="mb-4">
        {form.message}
      </Alert>
    {/if}
    <div class="mb-6 w-80">
      <Label for="username" class="mb-2 block">Username</Label>
      <ButtonGroup class="w-full">
        <InputAddon>
          <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </InputAddon>
        <Input id="username" name="username" placeholder="johndoe" />
      </ButtonGroup>
      <Label for="password" class="mb-2 mt-4 ">Password</Label>
      <Input
        type="password"
        id="password"
        name="password"
        placeholder="•••••••••"
        required
      />

      <Button
        class="mt-4 w-full bg-red-500 text-white dark:bg-red-600 dark:text-white"
        type="submit">Submit New User</Button
      >
    </div>
  </form>
</div>
