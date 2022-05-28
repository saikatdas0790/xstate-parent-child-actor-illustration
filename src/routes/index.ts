import { assign, createMachine, spawn, type ActorRefFrom } from "xstate";

const childMachine = createMachine({
  initial: "start",
  context: {
    name: "",
    age: 0,
  },
  states: {
    start: {},
    waiting: {},
    ready: {},
  },
});

const parentMachine = createMachine(
  {
    initial: "waiting",
    tsTypes: {} as import("./index.typegen").Typegen0,
    schema: {} as {
      context: {
        childMachineReferences: ActorRefFrom<typeof childMachine>[];
      };
    },
    context: {
      childMachineReferences: [],
    },
    states: {
      waiting: {
        on: {
          SPAWN_CHILD: {
            actions: ["spawnChild"],
            target: "waiting",
          },
        },
      },
    },
  },
  {
    actions: {
      spawnChild: assign({
        childMachineReferences: (context, event) => {
          return [
            ...context.childMachineReferences,
            spawn(childMachine, `${context.childMachineReferences.length}`),
          ];
        },
      }),
    },
  }
);
