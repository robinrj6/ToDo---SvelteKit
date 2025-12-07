<script lang="ts">
  import { Progressradial } from "flowbite-svelte";
  import { Input, Label, Button } from "flowbite-svelte";
  import { PlaySolid, PauseSolid, StopOutline } from "flowbite-svelte-icons";

  let hours = $state(0);
  let minutes = $state(1);
  let totalSeconds = $state(60);
  let remainingSeconds = $state(60);
  let isRunning = $state(false);
  let isPaused = $state(false);
  let timerInterval: number | null = null;

  // Calculate total seconds when input changes
  $effect(() => {
    if (!isRunning) {
      totalSeconds = hours * 3600 + minutes * 60;
      remainingSeconds = totalSeconds;
    }
  });

  // Timer tick
  $effect(() => {
    if (isRunning && !isPaused) {
      timerInterval = setInterval(() => {
        remainingSeconds--;
        if (remainingSeconds <= 0) {
          isRunning = false;
          remainingSeconds = 0;
          if (timerInterval) clearInterval(timerInterval);
        }
      }, 1000);

      return () => {
        if (timerInterval) clearInterval(timerInterval);
      };
    } else {
      if (timerInterval) clearInterval(timerInterval);
    }
  });

  function startTimer() {
    if (!isRunning) {
      isRunning = true;
      isPaused = false;
    }
  }

  function pauseTimer() {
    isPaused = !isPaused;
  }

  function stopTimer() {
    isRunning = false;
    isPaused = false;
    remainingSeconds = totalSeconds;
    if (timerInterval) clearInterval(timerInterval);
  }

  function formatTime(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  function getProgress() {
    return Math.round(((totalSeconds - remainingSeconds) / totalSeconds) * 100);
  }

  function setTimer(mins: number) {
    if (mins === 1) {
      // Reset
      totalSeconds = 0;
      remainingSeconds = 0;
      hours = 0;
      minutes = 1;
      isRunning = false;
      isPaused = false;
      if (timerInterval) clearInterval(timerInterval);
      return;
    }
    const secondsToAdd = mins * 60;
    totalSeconds += secondsToAdd;
    remainingSeconds += secondsToAdd;
    hours = Math.floor(totalSeconds / 3600);
    minutes = Math.floor((totalSeconds % 3600) / 60);
  }
</script>

<div class="flex flex-col h-full justify-center items-center gap-6">
  <!-- Progress Circle with Time Display -->
  <div class="relative flex flex-col justify-center items-center">
    <div class="text-5xl font-bold text-red-600 dark:text-red-600">
      {formatTime(remainingSeconds)}
    </div>
    <Progressradial
      color="red"
      progress={getProgress()}
      labelInside
      size="w-50 h-50"
      classes={{ outside: "dark:text-white" }}
    ></Progressradial>
  </div>
  <!-- Input Section -->
  <div class="flex gap-4">
    <Button color="alternative" onclick={() => setTimer(5)}
      ><span class="text-red-600">+5:00</span></Button
    >
    <Button color="alternative" onclick={() => setTimer(10)}
      ><span class="text-red-600">+10:00</span></Button
    >
    <Button color="alternative" onclick={() => setTimer(30)}
      ><span class="text-red-600">+30:00</span></Button
    >
  </div>
  <Button color="alternative" onclick={() => setTimer(1)}
    ><span class="text-red-600">Reset</span>
  </Button>
  <form class="mx-auto max-w-xs">
    <div class="mb-4 flex flex-row items-center gap-2">
      <Label class="mb-1 text-sm text-gray-900 dark:text-white">Hours:</Label>
      <Input
        type="number"
        bind:value={hours}
        min="0"
        disabled={isRunning}
        class="w-16"
      />
      <Label class="mb-1 text-sm text-gray-900 dark:text-white">Minutes:</Label>
      <Input
        type="number"
        bind:value={minutes}
        min="0"
        max="59"
        disabled={isRunning}
        class="w-16"
      />
    </div>
  </form>

  <!-- Control Buttons -->
  <div class="flex gap-4">
    {#if !isRunning}
      <Button color="green" onclick={startTimer}>
        <PlaySolid class="shrink-0 h-6 w-6" />
      </Button>
    {:else}
      <Button color="blue" onclick={pauseTimer}>
        <PauseSolid class="shrink-0 h-6 w-6" />
      </Button>
      <Button color="red" onclick={stopTimer}>
        <StopOutline class="shrink-0 h-6 w-6" />
      </Button>
    {/if}
  </div>

  {#if isPaused && isRunning}
    <div class="text-sm text-gray-600 dark:text-gray-400">Timer paused</div>
  {/if}
</div>
