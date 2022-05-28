import { assign, createMachine, spawn, State, type ActorRefFrom } from "xstate";

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

export const parentMachine = createMachine(
  {
    initial: "waiting",
    tsTypes: {} as import("./index.typegen").Typegen0,
    schema: {} as {
      context: {
        childMachineReferences: ActorRefFrom<typeof childMachine>[];
      };
    },
    context: {
      childMachineReferences: [] as ActorRefFrom<typeof childMachine>[],
    },
    states: {
      waiting: {
        on: {
          SPAWN_CHILD: {
            actions: ["spawnChild"],
            target: "waiting",
          },
        },
        after: {
          3000: {
            actions: ["saveStateToLocalStorage"],
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
      saveStateToLocalStorage: (context, event) => {
        if (context.childMachineReferences.length > 0) {
          const allStates = context.childMachineReferences.reduce(
            (acc, childMachineReference) => {
              acc.push(childMachineReference.getSnapshot());
              return acc;
            },
            [] as any[]
          );
          console.log(allStates);
          localStorage.setItem(
            "childMachineReferences",
            JSON.stringify(allStates)
          );
        }
      },
    },
  }
);
