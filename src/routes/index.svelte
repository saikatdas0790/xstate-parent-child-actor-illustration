<script lang="ts">
  import { useMachine } from "@xstate/svelte";
  import { parentMachine } from ".";

  const { state, send } = useMachine(parentMachine);
</script>

<h1>Hello world</h1>
<button
  on:click={() => {
    send("SPAWN_CHILD");
  }}>
  New child
</button>
