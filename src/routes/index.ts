import { assign, createMachine, spawn, State, type ActorRefFrom } from "xstate";

const childMachine = createMachine(
  {
    initial: "ready",
    context: {
      name: "",
      age: 0,
    },
    states: {
      ready: {
        entry: "setName",
        after: {
          5000: {
            actions: "increaseAge",
          },
          2000: {
            actions: "decreaseAge",
          },
        },
      },
    },
  },
  {
    actions: {
      decreaseAge: assign({
        age: (context, event) => context.age - 2,
      }),
      increaseAge: assign({
        age: (context, event) => context.age + 5,
      }),
      setName: assign({
        name: (context, event) => Date.now().toLocaleString(),
      }),
    },
  }
);

export const parentMachine = createMachine(
  {
    initial: "waiting",
    tsTypes: {} as import("./index.typegen").Typegen0,
    schema: {
      context: {} as {
        childMachineReferences: ActorRefFrom<typeof childMachine>[];
      },
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
            actions: ["logCurrentStateToConsole"],
            target: "waiting",
          },
        },
      },
    },
  },
  {
    actions: {
      logCurrentStateToConsole: (context, event) => {
        context.childMachineReferences.forEach((child) => {
          console.log(child.getSnapshot()?.context);
        });
      },
      spawnChild: assign({
        childMachineReferences: (context, event) => {
          console.log(context);
          return [
            ...context.childMachineReferences,
            spawn(childMachine, {
              name: `${Date.now()}`,
              sync: true,
            }),
          ];
        },
      }),
    },
  }
);
